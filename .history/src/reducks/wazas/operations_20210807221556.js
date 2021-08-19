import {fetchWazasAction, uploadWazaInfo} from "./actions"
import {initUserAction} from "../users/actions"
import {db, FirebaseTimestamp} from '../../firebase/index'
import {push} from "connected-react-router"
//import axios from 'axios';

//各技更新時
export const updateDetail = (achieve,memo,favorite, wazaId, userId) => {
    return async (dispatch, getState) => {
        console.log("update starting")
        const timestamp = FirebaseTimestamp.now()
        //DBへの登録
        const detailsRef = db.collection('details').doc(userId.toString()).collection('results').doc(wazaId);
        await detailsRef.update({
            achieve:achieve,
            memo:memo,
            favorite:favorite,
            makeDay:timestamp,
        })
        //stateの更新（id指定しての更新)
        const nextDetails = getState().wazas.list;
        nextDetails[wazaId - 1]["achieve"] = achieve;
        nextDetails[wazaId - 1]["memo"] = memo;
        nextDetails[wazaId - 1]["favorite"] = favorite;
        nextDetails[wazaId - 1]["makeDay"] = timestamp;
        console.log(nextDetails[wazaId - 1]);
        dispatch(uploadWazaInfo(nextDetails));
        dispatch(push('/record'))
    }
};

//ログイン時
export const signIn = (name) => {
    return async (dispatch, getState) => {
        let sameIdUserData ;
        let maxId;
        let userId;
     //   let wazas;
        
        //技の登録
        //wazaRegist();
//         await axios.get("http://localhost:3000/wazas")
//         .then(res => {
//             wazas = res.data;
//             console.log(wazas);
//         })
//         console.log("うんち"+wazas[0])
//         console.log("うんち"+wazas[0]["waza"])
//         const result = wazas.find(item => item.id === 2); // idが2の要素を返す
//         console.log(result); // { id: 2, name: 'ジョーダン', sex: '男性' }
//         let batch = db.batch();
//         const wazaRef = db.collection('wazas');
//         // //各技のユーザごとの達成度等詳細データベース設定
//         wazas.forEach(function(waza, index) {
//             let wazaEachRef = wazaRef.doc(String(index + 1));
//             batch.set(wazaEachRef, { id: waza["id"],　waza:waza["waza"], favoiteSum: waza["favoriteSum"], level: waza["level"], makeSum: waza["makeSum"], url:waza["url"]});
//         });
// 　 　    // バッチ処理の完了を宣言
//         await batch.commit();


        //valid
        if(name === "") {
            alert("必須項目が未入力です")
            return false
        }

        //ログインしたユーザ情報の取得
        await db.collection("users").where("name", "==", name).get().then(snapShot => {
            snapShot.forEach(doc => {
                sameIdUserData = doc.data()
            })
        })
        //すでに登録されたユーザ情報があるのならばidの取得
        if (sameIdUserData != null) {
            userId = sameIdUserData["id"];
            console.log("already exist user");
        } else {
            //登録するidの採番
            await db.collection("users").orderBy("id","desc").limit(1).get().then(snapShot => {
                snapShot.forEach(doc => {
                const data = doc.data()
                maxId = data["id"];
                })
            })
            if (Number(maxId) > 0) {
                console.log("add new user")
                userId = Number(maxId) + 1;
            } else {
                console.log("add first user");
                userId = 1;
            }

            //ユーザ情報のDB登録
            const timestamp = FirebaseTimestamp.now()
            let batch = db.batch();
            const userStandardRef = db.collection('users').doc(userId.toString());
            batch.set(userStandardRef, { id: userId, name: name, registerDate: timestamp, role: 'user' });

            // ユーザごとの各技達成度等詳細DB登録（処理速度最速while文使用）
            //ドキュメントにフィールドを追加することによって、ドキュメントが斜体になるのを防ぐ。他にも方法はあると思われる
            const detailsRef = db.collection('details').doc(userId.toString());
            batch.set(detailsRef, {});
            const wazaSum = 200;
            let num = 1;
            while (num <= wazaSum) {
                let detailsRef = db.collection('details').doc(userId).toString().collection('results').doc(num.toString());
                batch.set(detailsRef, { id:num, achieve: "", memo: "", favorite: false, makeDay: timestamp});
                num++;
            }
            // バッチ処理の完了
            await batch.commit();
        }

        // 技のstate更新(技の基本情報と達成度の詳細情報を連結した上で)
        let userWazaList = [];
        let joinedList = [];
        console.log("id:"+userId)
        const wazasRef = db.collection('wazas');
        const wazasDoc = await wazasRef.doc(userId.toString()).get()
        const wazasDocsOrderById = await wazasRef.orderBy("id", "asc").get()
        wazasDocsOrderById.forEach((wazasDocOrderById) => {
            if (wazasDoc.exists) {
                userWazaList.push(wazasDocOrderById.data());
            } else {
                console.log("No such document!");
            }
        });
        const detailsRef = db.collection('details').doc(userId.toString()).collection('results');
        const detailsDocsOrderById = await detailsRef.orderBy("id", "asc").get();
        detailsDocsOrderById.forEach((detailsDocOrderById) => {
            if (detailsDocOrderById.exists) {
                joinedList.push(Object.assign(userWazaList[detailsDocOrderById.data()["id"] - 1], detailsDocOrderById.data()));
            }
        });
        dispatch(fetchWazasAction(userWazaList));

        // ユーザーのstate更新
        let users = {};
        users["uid"] = userId;
        users["username"] = name;
        users["isSignedIn"] = true;
        users["isLoading"] = false;
        dispatch(initUserAction(users));
    }
}