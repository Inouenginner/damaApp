import {fetchWazasAction, uploadWazaInfo} from "./actions"
import {initUserAction, loginAdminAction, logOutAdminAction} from "../users/actions"
import {db, FirebaseTimestamp} from '../../firebase/index'
import {push} from "connected-react-router"
import axios from 'axios';

//管理者ログイン
export const adLogin = (adName, adPass) => {
    return async (dispatch) => {
        console.log(adPass)
        let adminUserDate;
        let adminId;
        await db.collection("users").where("name", "==", adName).where("password", "==", adPass).where("role", "==", "admin").get().then(snapShot => {
            snapShot.forEach(doc => {
                adminUserDate = doc.data()
                adminId = adminUserDate["id"];
            })
        })
        if(adminUserDate == null) {
            alert("その管理者いないよ")
            return false;
        } else {
            // 管理者ユーザーのstate更新
            const adminData = {
                uid: adminId,
                username: adName,
                isSignedIn: true,
                isLoading: false,
                role: "admin"
            }
            dispatch(loginAdminAction(adminData));
            dispatch(push('/adminMenu'))
        }
    }
};

//管理者ログアウト
export const adminSignOut = () => {
    return async (dispatch) => {
        dispatch(logOutAdminAction());
        dispatch(push("/admin"));
    }
}


//管理者技追加
export const addWaza = (wazaId, wazaName, wazaLevel, wazaUrl) => {
    return async (dispatch) => {
        let batch = db.batch();
        const newWazaRef = db.collection('wazas').doc(wazaId.toString());
        batch.set(newWazaRef, { favoriteSum: 0, id: wazaId.toString(), level: wazaLevel, makeSum: 0, url: wazaUrl, waza: wazaName});
        // バッチ処理の完了
        await batch.commit();
        dispatch(push('/addComp'))
    }
};

//管理者技編集
export const editWaza = (wazaId, wazaName, wazaLevel, wazaUrl) => {
    return async (dispatch) => {
        let batch = db.batch();
        const updateWazaRef = db.collection('wazas').doc(wazaId.toString());
        batch.set(updateWazaRef, { favoriteSum: 0, id: wazaId.toString(), level: wazaLevel, makeSum: 0, url: wazaUrl, waza: wazaName});
        // バッチ処理の完了
        await batch.commit();
        dispatch(push('/editComp'))
    }
};

//管理者技の登録（アプリ立ち上げ時に一度読み込むイメージ,ローカルでjsonの立ち上げ必要）
export const wazaRegist = () => {
    return async (dispatch) => {
        let wazas;
        await axios.get("http://localhost:3000/wazas")
        .then(res => {
            wazas = res.data;
            console.log(wazas);
        })
        let batch = db.batch();
        const wazaRef = db.collection('wazas');
        // 技データベース設定
        wazas.forEach(function(waza, index) {
            let wazaEachRef = wazaRef.doc((index + 1).toString());
            batch.set(wazaEachRef, { id: waza["id"],　waza:waza["waza"], favoiteSum: waza["favoriteSum"], level: waza["level"], makeSum: waza["makeSum"], url:waza["url"]});
        });
        // バッチ処理の完了を宣言
        await batch.commit();
        dispatch(push('/registComp'))
    }
}

//ユーザーログイン時
export const signIn = (name, password) => {
    return async (dispatch) => {
        let sameIdUserData ;
        let maxId;
        let userId;
        const wazaSum = 200;
        //valid
        if(name === "" || password === "") {
            alert("必須項目が未入力です")
            return false;
        }
        //ログインしたユーザ情報の取得
        await db.collection("users").where("name", "==", name).where("password", "==", password).get().then(snapShot => {
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
            batch.set(userStandardRef, { id: userId, password: password, name: name, registerDate: timestamp, role: 'user'})
            // ユーザごとの各技達成度等詳細DB登録（処理速度最速while文使用）
            let index = 1;
            while (index <= wazaSum) {
                let detailsRef = db.collection('users').doc(userId.toString()).collection('results').doc(index.toString());
                batch.set(detailsRef, { id:index, achieve: 0, memo: "", favorite: false, makeDay: timestamp});
                index++;
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
        const detailsRef = db.collection('users').doc(userId.toString()).collection('results');
        const detailsDocsOrderById = await detailsRef.orderBy("id", "asc").get();
        detailsDocsOrderById.forEach((detailsDocOrderById) => {
            if (detailsDocOrderById.exists) {
                joinedList.push(Object.assign(userWazaList[detailsDocOrderById.data()["id"] - 1], detailsDocOrderById.data()));
            }
        });
        dispatch(fetchWazasAction(userWazaList));

        // ユーザーのstate更新
        const userData = {
            uid: userId,
            username: name,
            isSignedIn: true,
            isLoading: false,
            role: "user"
        }
        dispatch(initUserAction(userData));
        dispatch(push("/record"));
    }
}
//ユーザー各技進捗更新時
export const updateDetail = (achieve,memo,favorite, wazaId, userId) => {
    return async (dispatch, getState) => {
        console.log("update starting")
        const timestamp = FirebaseTimestamp.now()
        //DBへの登録
        const detailsRef = db.collection('users').doc(userId.toString()).collection('results').doc(wazaId);
        await detailsRef.update({
            achieve:Number(achieve),
            memo:memo,
            favorite:favorite,
            makeDay:timestamp,
        })
        //stateの更新（id指定しての更新)
        const nextDetails = getState().wazas.list;
        nextDetails[wazaId - 1]["achieve"] = Number(achieve);
        nextDetails[wazaId - 1]["memo"] = memo;
        nextDetails[wazaId - 1]["favorite"] = favorite;
        nextDetails[wazaId - 1]["makeDay"] = timestamp;
        dispatch(uploadWazaInfo(nextDetails));
        dispatch(push('/record'))
    }
};