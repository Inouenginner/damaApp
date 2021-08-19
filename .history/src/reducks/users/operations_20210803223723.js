//ログイン時
export const signOut = () => {
    return async (dispatch, getState) => {
        let sameIdUserData ;
        let maxId;
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
        let id;
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
            id = id.toString();
            const timestamp = FirebaseTimestamp.now()
            console.log("userDB input start")
        let userWazaList = [];
        let joinedList = [];
        console.log(id)
        const wazasRef = db.collection('wazas');
        const wazasDoc = await wazasRef.doc(id).get()
        const wazasDocsOrderById = await wazasRef.orderBy("id", "asc").get()
        wazasDocsOrderById.forEach((wazasDocOrderById) => {
            if (wazasDoc.exists) {
                userWazaList.push(wazasDocOrderById.data());
            } else {
                console.log("No such document!");
            }
        });
        const detailsRef = db.collection('details').doc(id).collection('results');
        const detailsDocs = await detailsRef.orderBy("id", "asc").get(); // firebase.firestore.DocumentSnapshotのインスタンスを取得
        detailsDocs.forEach((detailsDoc) => {
            if (detailsDoc.exists) {
                let temp = Object.assign(userWazaList[detailsDoc.data()["id"] - 1], detailsDoc.data());
                joinedList.push(temp);
            } else {
                console.log("No such document!");
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