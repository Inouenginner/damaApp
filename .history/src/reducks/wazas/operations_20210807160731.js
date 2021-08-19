import {fetchWazasAction, uploadWazaInfo} from "./actions"
import {initUserAction} from "../users/actions"
import {db, FirebaseTimestamp} from '../../firebase/index'
import {push} from "connected-react-router"
import axios from 'axios';


export const wazaRegist = () => {
    return async (dispatch, getState) => {

    let wazas;
    await axios.get("http://localhost:3000/wazas")
    .then(res => {
        wazas = res.data;
        console.log(wazas);
    })
    console.log("うんち"+wazas[0])
    console.log("うんち"+wazas[0]["waza"])
    const result = wazas.find(item => item.id === 2); // idが2の要素を返す
    console.log(result); // { id: 2, name: 'ジョーダン', sex: '男性' }

    let batch = db.batch();
    const wazaRef = db.collection('wazas');
    // //各技のユーザごとの達成度等詳細データベース設定
    wazas.forEach(function(waza, index) {
        let wazaEachRef = wazaRef.doc(String(index));
        batch.set(wazaEachRef, { id: waza["id"],　waza:waza["waza"], favoiteSum: waza["favoriteSum"], level: waza["level"], makeSum: waza["makeSum"], url:waza["url"]});
    });
　 　// バッチ処理の完了を宣言
    await batch.commit();
}
}


//各技更新時
export const UpdateDetail = (achieve,memo,favorite, wazaId, userId) => {
    return async (dispatch, getState) => {
        console.log("update starting")
        const timestamp = FirebaseTimestamp.now()
        //DBへの登録
        const detailsRef = db.collection('details').doc(String(userId)).collection('results').doc(wazaId);
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
        let id;
        let wazas;
        
        //wazaRegist();
        //技の登録
        await axios.get("http://localhost:3000/wazas")
        .then(res => {
            wazas = res.data;
            console.log(wazas);
        })
        console.log("うんち"+wazas[0])
        console.log("うんち"+wazas[0]["waza"])
      const result = wazas.find(item => item.id === 2); // idが2の要素を返す
        console.log(result); // { id: 2, name: 'ジョーダン', sex: '男性' }
        let batch = db.batch();
        const wazaRef = db.collection('wazas');
        // //各技のユーザごとの達成度等詳細データベース設定
        wazas.forEach(function(waza, index) {
            let wazaEachRef = wazaRef.doc(String(index));
            batch.set(wazaEachRef, { id: waza["id"],　waza:waza["waza"], favoiteSum: waza["favoriteSum"], level: waza["level"], makeSum: waza["makeSum"], url:waza["url"]});
        });
　 　    // バッチ処理の完了を宣言
        await batch.commit();


        //valid
        if(name === "") {
            alert("必須項目が未入力です")
            return false
        }
        await db.collection("users").where("name", "==", name).get().then(snapShot => {
            snapShot.forEach(doc => {
                sameIdUserData = doc.data()
                console.log(sameIdUserData)
            })
        })
        //すでにuserがあるのならば
        if (sameIdUserData != null) {
            id = sameIdUserData["id"];
            console.log("already exist user");
        } else {
            //db1に挿入
            //idは連番にしたい
            await db.collection("users").orderBy("id","desc").limit(1).get().then(snapShot => {
                snapShot.forEach(doc => {
                const data = doc.data()
                maxId = data["id"];
                })
            })
            if (Number(maxId) > 0) {
                console.log("add new user")
                id = Number(maxId) + 1;
            } else {
                console.log("first user");
                id = 1;
            }
            const timestamp = FirebaseTimestamp.now()
            console.log("userDB input start")
            let batch = db.batch();
            const userStandardRef = db.collection('users').doc(String(id));
            batch.set(userStandardRef, { id: id, name: name, registerDate: timestamp, role: 'user' });
            //db3に挿入
            //ドキュメントにフィールドを追加することによって、ドキュメントが斜体になるのを防ぐ。他にも方法はあると思われる
            const detailsRef = db.collection('details').doc(id.toString())
            batch.set(detailsRef, {});
            // //各技のユーザごとの達成度等詳細データベース設定
            for (let num = 1; num <= 200; num++) {
                let detailsRef = db.collection('details').doc(String(id)).collection('results').doc(String(num));
                batch.set(detailsRef, { id:num, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            }
            // バッチ処理の完了を宣言
            await batch.commit();
        }
        let userWazaList = [];
        let joinedList = [];
        console.log("id:"+id)
        const wazasRef = db.collection('wazas');
        const wazasDoc = await wazasRef.doc(String(id)).get()
        const wazasDocsOrderById = await wazasRef.orderBy("id", "asc").get()
        wazasDocsOrderById.forEach((wazasDocOrderById) => {
            if (wazasDoc.exists) {
                userWazaList.push(wazasDocOrderById.data());
            } else {
                console.log("No such document!");
            }
        });
        const detailsRef = db.collection('details').doc(String(id)).collection('results');
        const detailsDocs = await detailsRef.orderBy("id", "asc").get(); // firebase.firestore.DocumentSnapshotのインスタンスを取得
        detailsDocs.forEach((detailsDoc) => {
            if (detailsDoc.exists) {
                let temp = Object.assign(userWazaList[detailsDoc.data()["id"] - 1], detailsDoc.data());
                joinedList.push(temp);
            }
        });
        dispatch(fetchWazasAction(userWazaList));
        let users = {};
        users["uid"] = id;
        users["username"] = name;
        users["isSignedIn"] = true;
        users["isLoading"] = false;
        dispatch(initUserAction(users));
    }
}