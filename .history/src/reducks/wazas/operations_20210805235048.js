import {fetchWazasAction, uploadWazaInfo} from "./actions"
import {initUserAction} from "../users/actions"
import {db, FirebaseTimestamp} from '../../firebase/index'
import {push} from "connected-react-router"


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
        //wazaRegist();
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

    export const wazaRegist = () => {
        return async (dispatch, getState) => {
            let wazas = [];
            fetch("http://localhost:3000/wazas")
            .then(response => response.json())
            .then(data => {
                wazas.push(data);
            })

        let batch = db.batch();
        const wazaRef = db.collection('wazas');
        // //各技のユーザごとの達成度等詳細データベース設定
        wazas.forEach(function(waza, index) {
            let wazaEachRef = wazaRef.doc(String(index));
            batch.set(wazaEachRef, { id: waza["id"],　waza:waza["waza"], favoiteSum: waza["favoriteSum"], level: waza["level"], makeSum: waza["makeSum"], url:waza["url"]});
        });
        //idの文字型をどうするか
        const waza1Ref = wazaRef.doc("1");
        batch.set(waza1Ref, { id: 1,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza2Ref = wazaRef.doc("2");
        batch.set(waza2Ref, { id: 2,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza3Ref = wazaRef.doc("3");
        batch.set(waza3Ref, { id: 3,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza4Ref = wazaRef.doc("4");
        batch.set(waza4Ref, { id: 4,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza5Ref = wazaRef.doc("5");
        batch.set(waza5Ref, { id: 5,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza6Ref = wazaRef.doc("6");
        batch.set(waza6Ref, { id: 6,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza7Ref = wazaRef.doc("7");
        batch.set(waza7Ref, { id: 7,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza8Ref = wazaRef.doc("8");
        batch.set(waza8Ref, { id: 8,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza9Ref = wazaRef.doc("9");
        batch.set(waza9Ref, { id: 9,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza10Ref = wazaRef.doc("10");
        batch.set(waza10Ref, { id: 10,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza11Ref = wazaRef.doc("11");
        batch.set(waza11Ref, { id: 11,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza12Ref = wazaRef.doc("12");
        batch.set(waza12Ref, { id: 12,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza13Ref = wazaRef.doc("13");
        batch.set(waza13Ref, { id: 13,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza14Ref = wazaRef.doc("14");
        batch.set(waza14Ref, { id: 14,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza15Ref = wazaRef.doc("15");
        batch.set(waza15Ref, { id: 15,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza16Ref = wazaRef.doc("16");
        batch.set(waza16Ref, { id: 16,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza17Ref = wazaRef.doc("17");
        batch.set(waza17Ref, { id: 17,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza18Ref = wazaRef.doc("18");
        batch.set(waza18Ref, { id: 18,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza19Ref = wazaRef.doc("19");
        batch.set(waza19Ref, { id: 19,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza20Ref = wazaRef.doc("20");
        batch.set(waza20Ref, { id: 20,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza21Ref = wazaRef.doc("21");
        batch.set(waza21Ref, { id: 21,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza22Ref = wazaRef.doc("22");
        batch.set(waza22Ref, { id: 22,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza23Ref = wazaRef.doc("23");
        batch.set(waza23Ref, { id: 23,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza24Ref = wazaRef.doc("24");
        batch.set(waza24Ref, { id: 24,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza25Ref = wazaRef.doc("25");
        batch.set(waza25Ref, { id: 25,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza26Ref = wazaRef.doc("26");
        batch.set(waza26Ref, { id: 26,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza27Ref = wazaRef.doc("27");
        batch.set(waza27Ref, { id: 27,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza28Ref = wazaRef.doc("28");
        batch.set(waza28Ref, { id: 28,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza29Ref = wazaRef.doc("29");
        batch.set(waza29Ref, { id: 29,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza30Ref = wazaRef.doc("30");
        batch.set(waza30Ref, { id: 30,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza31Ref = wazaRef.doc("31");
        batch.set(waza31Ref, { id: 31,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza32Ref = wazaRef.doc("32");
        batch.set(waza32Ref, { id: 32,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza33Ref = wazaRef.doc("33");
        batch.set(waza33Ref, { id: 33,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza34Ref = wazaRef.doc("34");
        batch.set(waza34Ref, { id: 34,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza35Ref = wazaRef.doc("35");
        batch.set(waza35Ref, { id: 35,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza36Ref = wazaRef.doc("36");
        batch.set(waza36Ref, { id: 36,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza37Ref = wazaRef.doc("37");
        batch.set(waza37Ref, { id: 37,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza38Ref = wazaRef.doc("38");
        batch.set(waza38Ref, { id: 38,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza39Ref = wazaRef.doc("39");
        batch.set(waza39Ref, { id: 39,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza40Ref = wazaRef.doc("40");
        batch.set(waza40Ref, { id: 40,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza41Ref = wazaRef.doc("41");
        batch.set(waza41Ref, { id: 41,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza42Ref = wazaRef.doc("42");
        batch.set(waza42Ref, { id: 42,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza43Ref = wazaRef.doc("43");
        batch.set(waza43Ref, { id: 43,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza44Ref = wazaRef.doc("44");
        batch.set(waza44Ref, { id: 44,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza45Ref = wazaRef.doc("45");
        batch.set(waza45Ref, { id: 45,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza46Ref = wazaRef.doc("46");
        batch.set(waza46Ref, { id: 46,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza47Ref = wazaRef.doc("47");
        batch.set(waza47Ref, { id: 47,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza48Ref = wazaRef.doc("48");
        batch.set(waza48Ref, { id: 48,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza49Ref = wazaRef.doc("49");
        batch.set(waza49Ref, { id: 49,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza50Ref = wazaRef.doc("50");
        batch.set(waza50Ref, { id: 50,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza51Ref = wazaRef.doc("51");
        batch.set(waza51Ref, { id: 51,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza52Ref = wazaRef.doc("52");
        batch.set(waza52Ref, { id: 52,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza53Ref = wazaRef.doc("53");
        batch.set(waza53Ref, { id: 53,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza54Ref = wazaRef.doc("54");
        batch.set(waza54Ref, { id: 54,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza55Ref = wazaRef.doc("55");
        batch.set(waza55Ref, { id: 55,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza56Ref = wazaRef.doc("56");
        batch.set(waza56Ref, { id: 56,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza57Ref = wazaRef.doc("57");
        batch.set(waza57Ref, { id: 57,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza58Ref = wazaRef.doc("58");
        batch.set(waza58Ref, { id: 58,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza59Ref = wazaRef.doc("59");
        batch.set(waza59Ref, { id: 59,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza60Ref = wazaRef.doc("60");
        batch.set(waza60Ref, { id: 60,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza61Ref = wazaRef.doc("61");
        batch.set(waza61Ref, { id: 61,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza62Ref = wazaRef.doc("62");
        batch.set(waza62Ref, { id: 62,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza63Ref = wazaRef.doc("63");
        batch.set(waza63Ref, { id: 63,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza64Ref = wazaRef.doc("64");
        batch.set(waza64Ref, { id: 64,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza65Ref = wazaRef.doc("65");
        batch.set(waza65Ref, { id: 65,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza66Ref = wazaRef.doc("66");
        batch.set(waza66Ref, { id: 66,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza67Ref = wazaRef.doc("67");
        batch.set(waza67Ref, { id: 67,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza68Ref = wazaRef.doc("68");
        batch.set(waza68Ref, { id: 68,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza69Ref = wazaRef.doc("69");
        batch.set(waza69Ref, { id: 69,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza70Ref = wazaRef.doc("70");
        batch.set(waza70Ref, { id: 70,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza71Ref = wazaRef.doc("71");
        batch.set(waza71Ref, { id: 71,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza72Ref = wazaRef.doc("72");
        batch.set(waza72Ref, { id: 72,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza73Ref = wazaRef.doc("73");
        batch.set(waza73Ref, { id: 73,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza74Ref = wazaRef.doc("74");
        batch.set(waza74Ref, { id: 74,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza75Ref = wazaRef.doc("75");
        batch.set(waza75Ref, { id: 75,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza76Ref = wazaRef.doc("76");
        batch.set(waza76Ref, { id: 76,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza77Ref = wazaRef.doc("77");
        batch.set(waza77Ref, { id: 77,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza78Ref = wazaRef.doc("78");
        batch.set(waza78Ref, { id: 78,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza79Ref = wazaRef.doc("79");
        batch.set(waza79Ref, { id: 79,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza80Ref = wazaRef.doc("80");
        batch.set(waza80Ref, { id: 80,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza81Ref = wazaRef.doc("81");
        batch.set(waza81Ref, { id: 81,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza82Ref = wazaRef.doc("82");
        batch.set(waza82Ref, { id: 82,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza83Ref = wazaRef.doc("83");
        batch.set(waza83Ref, { id: 83,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza84Ref = wazaRef.doc("84");
        batch.set(waza84Ref, { id: 84,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza85Ref = wazaRef.doc("85");
        batch.set(waza85Ref, { id: 85,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza86Ref = wazaRef.doc("86");
        batch.set(waza86Ref, { id: 86,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza87Ref = wazaRef.doc("87");
        batch.set(waza87Ref, { id: 87,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza88Ref = wazaRef.doc("88");
        batch.set(waza88Ref, { id: 88,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza89Ref = wazaRef.doc("89");
        batch.set(waza89Ref, { id: 89,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza90Ref = wazaRef.doc("90");
        batch.set(waza90Ref, { id: 90,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza91Ref = wazaRef.doc("91");
        batch.set(waza91Ref, { id: 91,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza92Ref = wazaRef.doc("92");
        batch.set(waza92Ref, { id: 92,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza93Ref = wazaRef.doc("93");
        batch.set(waza93Ref, { id: 93,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza94Ref = wazaRef.doc("94");
        batch.set(waza94Ref, { id: 94,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza95Ref = wazaRef.doc("95");
        batch.set(waza95Ref, { id: 95,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza96Ref = wazaRef.doc("96");
        batch.set(waza96Ref, { id: 96,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza97Ref = wazaRef.doc("97");
        batch.set(waza97Ref, { id: 97,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza98Ref = wazaRef.doc("98");
        batch.set(waza98Ref, { id: 98,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza99Ref = wazaRef.doc("99");
        batch.set(waza99Ref, { id: 99,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza100Ref = wazaRef.doc("100");
        batch.set(waza100Ref, { id: 100,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza101Ref = wazaRef.doc("101");
        batch.set(waza101Ref, { id: 101,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza102Ref = wazaRef.doc("102");
        batch.set(waza102Ref, { id: 102,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza103Ref = wazaRef.doc("103");
        batch.set(waza103Ref, { id: 103,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza104Ref = wazaRef.doc("104");
        batch.set(waza104Ref, { id: 104,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza105Ref = wazaRef.doc("105");
        batch.set(waza105Ref, { id: 105,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza106Ref = wazaRef.doc("106");
        batch.set(waza106Ref, { id: 106,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza107Ref = wazaRef.doc("107");
        batch.set(waza107Ref, { id: 107,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza108Ref = wazaRef.doc("108");
        batch.set(waza108Ref, { id: 108,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza109Ref = wazaRef.doc("109");
        batch.set(waza109Ref, { id: 109,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza110Ref = wazaRef.doc("110");
        batch.set(waza110Ref, { id: 110,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza111Ref = wazaRef.doc("111");
        batch.set(waza111Ref, { id: 111,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza112Ref = wazaRef.doc("112");
        batch.set(waza112Ref, { id: 112,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza113Ref = wazaRef.doc("113");
        batch.set(waza113Ref, { id: 113,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza114Ref = wazaRef.doc("114");
        batch.set(waza114Ref, { id: 114,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza115Ref = wazaRef.doc("115");
        batch.set(waza115Ref, { id: 115,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza116Ref = wazaRef.doc("116");
        batch.set(waza116Ref, { id: 116,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza117Ref = wazaRef.doc("117");
        batch.set(waza117Ref, { id: 117,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza118Ref = wazaRef.doc("118");
        batch.set(waza118Ref, { id: 118,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza119Ref = wazaRef.doc("119");
        batch.set(waza119Ref, { id: 119,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza120Ref = wazaRef.doc("120");
        batch.set(waza120Ref, { id: 120,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza121Ref = wazaRef.doc("121");
        batch.set(waza121Ref, { id: 121,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza122Ref = wazaRef.doc("122");
        batch.set(waza122Ref, { id: 122,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza123Ref = wazaRef.doc("123");
        batch.set(waza123Ref, { id: 123,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza124Ref = wazaRef.doc("124");
        batch.set(waza124Ref, { id: 124,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza125Ref = wazaRef.doc("125");
        batch.set(waza125Ref, { id: 125,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza126Ref = wazaRef.doc("126");
        batch.set(waza126Ref, { id: 126,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza127Ref = wazaRef.doc("127");
        batch.set(waza127Ref, { id: 127,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza128Ref = wazaRef.doc("128");
        batch.set(waza128Ref, { id: 128,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza129Ref = wazaRef.doc("129");
        batch.set(waza129Ref, { id: 129,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza130Ref = wazaRef.doc("130");
        batch.set(waza130Ref, { id: 130,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza131Ref = wazaRef.doc("131");
        batch.set(waza131Ref, { id: 131,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza132Ref = wazaRef.doc("132");
        batch.set(waza132Ref, { id: 132,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza133Ref = wazaRef.doc("133");
        batch.set(waza133Ref, { id: 133,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza134Ref = wazaRef.doc("134");
        batch.set(waza134Ref, { id: 134,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza135Ref = wazaRef.doc("135");
        batch.set(waza135Ref, { id: 135,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza136Ref = wazaRef.doc("136");
        batch.set(waza136Ref, { id: 136,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza137Ref = wazaRef.doc("137");
        batch.set(waza137Ref, { id: 137,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza138Ref = wazaRef.doc("138");
        batch.set(waza138Ref, { id: 138,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza139Ref = wazaRef.doc("139");
        batch.set(waza139Ref, { id: 139,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza140Ref = wazaRef.doc("140");
        batch.set(waza140Ref, { id: 140,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza141Ref = wazaRef.doc("141");
        batch.set(waza141Ref, { id: 141,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza142Ref = wazaRef.doc("142");
        batch.set(waza142Ref, { id: 142,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza143Ref = wazaRef.doc("143");
        batch.set(waza143Ref, { id: 143,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza144Ref = wazaRef.doc("144");
        batch.set(waza144Ref, { id: 144,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza145Ref = wazaRef.doc("145");
        batch.set(waza145Ref, { id: 145,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza146Ref = wazaRef.doc("146");
        batch.set(waza146Ref, { id: 146,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza147Ref = wazaRef.doc("147");
        batch.set(waza147Ref, { id: 147,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza148Ref = wazaRef.doc("148");
        batch.set(waza148Ref, { id: 148,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza149Ref = wazaRef.doc("149");
        batch.set(waza149Ref, { id: 149,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza150Ref = wazaRef.doc("150");
        batch.set(waza150Ref, { id: 150,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza151Ref = wazaRef.doc("151");
        batch.set(waza151Ref, { id: 151,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza152Ref = wazaRef.doc("152");
        batch.set(waza152Ref, { id: 152,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza153Ref = wazaRef.doc("153");
        batch.set(waza153Ref, { id: 153,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza154Ref = wazaRef.doc("154");
        batch.set(waza154Ref, { id: 154,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza155Ref = wazaRef.doc("155");
        batch.set(waza155Ref, { id: 155,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza156Ref = wazaRef.doc("156");
        batch.set(waza156Ref, { id: 156,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza157Ref = wazaRef.doc("157");
        batch.set(waza157Ref, { id: 157,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza158Ref = wazaRef.doc("158");
        batch.set(waza158Ref, { id: 158,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza159Ref = wazaRef.doc("159");
        batch.set(waza159Ref, { id: 159,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza160Ref = wazaRef.doc("160");
        batch.set(waza160Ref, { id: 160,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza161Ref = wazaRef.doc("161");
        batch.set(waza161Ref, { id: 161,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza162Ref = wazaRef.doc("162");
        batch.set(waza162Ref, { id: 162,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza163Ref = wazaRef.doc("163");
        batch.set(waza163Ref, { id: 163,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza164Ref = wazaRef.doc("164");
        batch.set(waza164Ref, { id: 164,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza165Ref = wazaRef.doc("165");
        batch.set(waza165Ref, { id: 165,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza166Ref = wazaRef.doc("166");
        batch.set(waza166Ref, { id: 166,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza167Ref = wazaRef.doc("167");
        batch.set(waza167Ref, { id: 167,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza168Ref = wazaRef.doc("168");
        batch.set(waza168Ref, { id: 168,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza169Ref = wazaRef.doc("169");
        batch.set(waza169Ref, { id: 169,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza170Ref = wazaRef.doc("170");
        batch.set(waza170Ref, { id: 170,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza171Ref = wazaRef.doc("171");
        batch.set(waza171Ref, { id: 171,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza172Ref = wazaRef.doc("172");
        batch.set(waza172Ref, { id: 172,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza173Ref = wazaRef.doc("173");
        batch.set(waza173Ref, { id: 173,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza174Ref = wazaRef.doc("174");
        batch.set(waza174Ref, { id: 174,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza175Ref = wazaRef.doc("175");
        batch.set(waza175Ref, { id: 175,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza176Ref = wazaRef.doc("176");
        batch.set(waza176Ref, { id: 176,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza177Ref = wazaRef.doc("177");
        batch.set(waza177Ref, { id: 177,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza178Ref = wazaRef.doc("178");
        batch.set(waza178Ref, { id: 178,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza179Ref = wazaRef.doc("179");
        batch.set(waza179Ref, { id: 179,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza180Ref = wazaRef.doc("180");
        batch.set(waza180Ref, { id: 180,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza181Ref = wazaRef.doc("181");
        batch.set(waza181Ref, { id: 181,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza182Ref = wazaRef.doc("182");
        batch.set(waza182Ref, { id: 182,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza183Ref = wazaRef.doc("183");
        batch.set(waza183Ref, { id: 183,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza184Ref = wazaRef.doc("184");
        batch.set(waza184Ref, { id: 184,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza185Ref = wazaRef.doc("185");
        batch.set(waza185Ref, { id: 185,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza186Ref = wazaRef.doc("186");
        batch.set(waza186Ref, { id: 186,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza187Ref = wazaRef.doc("187");
        batch.set(waza187Ref, { id: 187,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza188Ref = wazaRef.doc("188");
        batch.set(waza188Ref, { id: 188,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza189Ref = wazaRef.doc("189");
        batch.set(waza189Ref, { id: 189,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza190Ref = wazaRef.doc("190");
        batch.set(waza190Ref, { id: 190,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza191Ref = wazaRef.doc("191");
        batch.set(waza191Ref, { id: 191,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza192Ref = wazaRef.doc("192");
        batch.set(waza192Ref, { id: 192,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza193Ref = wazaRef.doc("193");
        batch.set(waza193Ref, { id: 193,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza194Ref = wazaRef.doc("194");
        batch.set(waza194Ref, { id: 194,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza195Ref = wazaRef.doc("195");
        batch.set(waza195Ref, { id: 195,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza196Ref = wazaRef.doc("196");
        batch.set(waza196Ref, { id: 196,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza197Ref = wazaRef.doc("197");
        batch.set(waza197Ref, { id: 197,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza198Ref = wazaRef.doc("198");
        batch.set(waza198Ref, { id: 198,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza199Ref = wazaRef.doc("199");
        batch.set(waza199Ref, { id: 199,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
        const waza200Ref = wazaRef.doc("200");
        batch.set(waza200Ref, { id: 200,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"});
// バッチ処理の完了を宣言
await batch.commit();
    }
    }