import {fetchWazasAction} from "./actions"
import {db, FirebaseTimestamp} from '../../firebase/index'

export const fetchWazas = (userId) => {
    return async (dispatch, getState) => {
        let userWazaList = [];
        let joinedList = [];
        const wazasRef = db.collection('wazas');
        const wazasDoc = await wazasRef.doc(userId).get()
        const wazasDocsOrderById = await wazasRef.orderBy("id", "asc").get()
        wazasDocsOrderById.forEach((wazasDocOrderById) => {
            if (wazasDoc.exists) {
                console.log("Document data:", wazasDocOrderById.data());
                userWazaList.push(wazasDocOrderById.data());
            } else {
                console.log("No such document!");
            }
        });
        console.log(userWazaList)
        const detailsRef = db.collection('details').doc(userId).collection('results');
        const detailsDocs = await detailsRef.orderBy("id", "asc").get(); // firebase.firestore.DocumentSnapshotのインスタンスを取得
        detailsDocs.forEach((detailsDoc) => {
            if (detailsDoc.exists) {
                let temp = Object.assign(userWazaList[detailsDoc.data()["id"] - 1], detailsDoc.data());
                joinedList.push(temp);
            } else {
                console.log("No such document!");
            }
        });
        console.log(joinedList);
        dispatch(fetchWazasAction(userWazaList));
    }
}

//ログイン時
export const updateDetail = (achieve,memo,favorite, userId) => {
    return async (dispatch, getState) => {
        //DBへの登録
        const detailsRef = db.collection('details').doc(userId).collection('results');
        //stateの更新（id指定しての更新)
    }
}

//ログイン時
export const signIn = (name) => {
    return async (dispatch, getState) => {
        //wazaRegist();
        //valid
        if(name === "") {
            alert("必須項目が未入力です")
            return false
        }
        const userStandardRef = db.collection('users')
        const userRef = db.collection('users').where("name", "==", name)
        const userDoc = await userRef.get();
        let id;
        //すでにuserがあるのならば
        if (userDoc.exists) {
            id = userDoc.data()["id"];
            console.log("already exist user");
        } else {
            //db1に挿入
            //idは連番にしたい
            const userRefOrderById = db.collection('users').orderBy("id").limit(1)
            const userDocOrderById = await userRefOrderById.get() // firebase.firestore.DocumentSnapshotのインスタンスを取得
            if (userDocOrderById.exists) {
                console.log("added user not first");
                console.log(userDocOrderById)
                console.log(userDocOrderById.data()["id"]);
                id = Number(userDocOrderById.data()["id"]) + 1;
            } else {
                console.log("first user");
                id = 1;
            }
            const timestamp = FirebaseTimestamp.now()
            console.log("userDB input start")
            await userStandardRef.add({ id: id, name: name, registerDate: timestamp, role: 'user' })
            //db3に挿入
            //ドキュメントにフィールドを追加することによって、ドキュメントが斜体になるのを防ぐ。他にも方法はあると思われる
            const detailsRef = db.collection('details').doc(id)
            await detailsRef.set({})
            console.log("detailDB input start")
            //各技のユーザごとの達成度等詳細
            const details1Ref = db.collection('details').doc(id).collection('results').doc('1');
            await details1Ref.set({ id:1, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details2Ref = db.collection('details').doc(id).collection('results').doc('2');
            await details2Ref.set({ id:2, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details3Ref = db.collection('details').doc(id).collection('results').doc('3');
            await details3Ref.set({ id:3, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details4Ref = db.collection('details').doc(id).collection('results').doc('4');
            await details4Ref.set({ id:4, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details5Ref = db.collection('details').doc(id).collection('results').doc('5');
            await details5Ref.set({ id:5, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details6Ref = db.collection('details').doc(id).collection('results').doc('6');
            await details6Ref.set({ id:6, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details7Ref = db.collection('details').doc(id).collection('results').doc('7');
            await details7Ref.set({ id:7, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details8Ref = db.collection('details').doc(id).collection('results').doc('8');
            await details8Ref.set({ id:8, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details9Ref = db.collection('details').doc(id).collection('results').doc('9');
            await details9Ref.set({ id:9, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details10Ref = db.collection('details').doc(id).collection('results').doc('10');
            await details10Ref.set({ id:10, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details11Ref = db.collection('details').doc(id).collection('results').doc('11');
            await details11Ref.set({ id:11, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details12Ref = db.collection('details').doc(id).collection('results').doc('12');
            await details12Ref.set({ id:12, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details13Ref = db.collection('details').doc(id).collection('results').doc('13');
            await details13Ref.set({ id:13, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details14Ref = db.collection('details').doc(id).collection('results').doc('14');
            await details14Ref.set({ id:14, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details15Ref = db.collection('details').doc(id).collection('results').doc('15');
            await details15Ref.set({ id:15, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details16Ref = db.collection('details').doc(id).collection('results').doc('16');
            await details16Ref.set({ id:16, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details17Ref = db.collection('details').doc(id).collection('results').doc('17');
            await details17Ref.set({ id:17, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details18Ref = db.collection('details').doc(id).collection('results').doc('18');
            await details18Ref.set({ id:18, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details19Ref = db.collection('details').doc(id).collection('results').doc('19');
            await details19Ref.set({ id:19, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details20Ref = db.collection('details').doc(id).collection('results').doc('20');
            await details20Ref.set({ id:20, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details21Ref = db.collection('details').doc(id).collection('results').doc('21');
            await details21Ref.set({ id:21, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details22Ref = db.collection('details').doc(id).collection('results').doc('22');
            await details22Ref.set({ id:22, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details23Ref = db.collection('details').doc(id).collection('results').doc('23');
            await details23Ref.set({ id:23, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details24Ref = db.collection('details').doc(id).collection('results').doc('24');
            await details24Ref.set({ id:24, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details25Ref = db.collection('details').doc(id).collection('results').doc('25');
            await details25Ref.set({ id:25, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details26Ref = db.collection('details').doc(id).collection('results').doc('26');
            await details26Ref.set({ id:26, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details27Ref = db.collection('details').doc(id).collection('results').doc('27');
            await details27Ref.set({ id:27, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details28Ref = db.collection('details').doc(id).collection('results').doc('28');
            await details28Ref.set({ id:28, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details29Ref = db.collection('details').doc(id).collection('results').doc('29');
            await details29Ref.set({ id:29, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details30Ref = db.collection('details').doc(id).collection('results').doc('30');
            await details30Ref.set({ id:30, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details31Ref = db.collection('details').doc(id).collection('results').doc('31');
            await details31Ref.set({ id:31, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details32Ref = db.collection('details').doc(id).collection('results').doc('32');
            await details32Ref.set({ id:32, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details33Ref = db.collection('details').doc(id).collection('results').doc('33');
            await details33Ref.set({ id:33, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details34Ref = db.collection('details').doc(id).collection('results').doc('34');
            await details34Ref.set({ id:34, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details35Ref = db.collection('details').doc(id).collection('results').doc('35');
            await details35Ref.set({ id:35, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details36Ref = db.collection('details').doc(id).collection('results').doc('36');
            await details36Ref.set({ id:36, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details37Ref = db.collection('details').doc(id).collection('results').doc('37');
            await details37Ref.set({ id:37, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details38Ref = db.collection('details').doc(id).collection('results').doc('38');
            await details38Ref.set({ id:38, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details39Ref = db.collection('details').doc(id).collection('results').doc('39');
            await details39Ref.set({ id:39, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details40Ref = db.collection('details').doc(id).collection('results').doc('40');
            await details40Ref.set({ id:40, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details41Ref = db.collection('details').doc(id).collection('results').doc('41');
            await details41Ref.set({ id:41, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details42Ref = db.collection('details').doc(id).collection('results').doc('42');
            await details42Ref.set({ id:42, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details43Ref = db.collection('details').doc(id).collection('results').doc('43');
            await details43Ref.set({ id:43, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details44Ref = db.collection('details').doc(id).collection('results').doc('44');
            await details44Ref.set({ id:44, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details45Ref = db.collection('details').doc(id).collection('results').doc('45');
            await details45Ref.set({ id:45, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details46Ref = db.collection('details').doc(id).collection('results').doc('46');
            await details46Ref.set({ id:46, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details47Ref = db.collection('details').doc(id).collection('results').doc('47');
            await details47Ref.set({ id:47, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details48Ref = db.collection('details').doc(id).collection('results').doc('48');
            await details48Ref.set({ id:48, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details49Ref = db.collection('details').doc(id).collection('results').doc('49');
            await details49Ref.set({ id:49, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details50Ref = db.collection('details').doc(id).collection('results').doc('50');
            await details50Ref.set({ id:50, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details51Ref = db.collection('details').doc(id).collection('results').doc('51');
            await details51Ref.set({ id:51, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details52Ref = db.collection('details').doc(id).collection('results').doc('52');
            await details52Ref.set({ id:52, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details53Ref = db.collection('details').doc(id).collection('results').doc('53');
            await details53Ref.set({ id:53, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details54Ref = db.collection('details').doc(id).collection('results').doc('54');
            await details54Ref.set({ id:54, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details55Ref = db.collection('details').doc(id).collection('results').doc('55');
            await details55Ref.set({ id:55, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details56Ref = db.collection('details').doc(id).collection('results').doc('56');
            await details56Ref.set({ id:56, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details57Ref = db.collection('details').doc(id).collection('results').doc('57');
            await details57Ref.set({ id:57, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details58Ref = db.collection('details').doc(id).collection('results').doc('58');
            await details58Ref.set({ id:58, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details59Ref = db.collection('details').doc(id).collection('results').doc('59');
            await details59Ref.set({ id:59, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details60Ref = db.collection('details').doc(id).collection('results').doc('60');
            await details60Ref.set({ id:60, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details61Ref = db.collection('details').doc(id).collection('results').doc('61');
            await details61Ref.set({ id:61, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details62Ref = db.collection('details').doc(id).collection('results').doc('62');
            await details62Ref.set({ id:62, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details63Ref = db.collection('details').doc(id).collection('results').doc('63');
            await details63Ref.set({ id:63, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details64Ref = db.collection('details').doc(id).collection('results').doc('64');
            await details64Ref.set({ id:64, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details65Ref = db.collection('details').doc(id).collection('results').doc('65');
            await details65Ref.set({ id:65, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details66Ref = db.collection('details').doc(id).collection('results').doc('66');
            await details66Ref.set({ id:66, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details67Ref = db.collection('details').doc(id).collection('results').doc('67');
            await details67Ref.set({ id:67, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details68Ref = db.collection('details').doc(id).collection('results').doc('68');
            await details68Ref.set({ id:68, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details69Ref = db.collection('details').doc(id).collection('results').doc('69');
            await details69Ref.set({ id:69, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details70Ref = db.collection('details').doc(id).collection('results').doc('70');
            await details70Ref.set({ id:70, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details71Ref = db.collection('details').doc(id).collection('results').doc('71');
            await details71Ref.set({ id:71, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details72Ref = db.collection('details').doc(id).collection('results').doc('72');
            await details72Ref.set({ id:72, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details73Ref = db.collection('details').doc(id).collection('results').doc('73');
            await details73Ref.set({ id:73, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details74Ref = db.collection('details').doc(id).collection('results').doc('74');
            await details74Ref.set({ id:74, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details75Ref = db.collection('details').doc(id).collection('results').doc('75');
            await details75Ref.set({ id:75, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details76Ref = db.collection('details').doc(id).collection('results').doc('76');
            await details76Ref.set({ id:76, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details77Ref = db.collection('details').doc(id).collection('results').doc('77');
            await details77Ref.set({ id:77, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details78Ref = db.collection('details').doc(id).collection('results').doc('78');
            await details78Ref.set({ id:78, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details79Ref = db.collection('details').doc(id).collection('results').doc('79');
            await details79Ref.set({ id:79, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details80Ref = db.collection('details').doc(id).collection('results').doc('80');
            await details80Ref.set({ id:80, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details81Ref = db.collection('details').doc(id).collection('results').doc('81');
            await details81Ref.set({ id:81, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details82Ref = db.collection('details').doc(id).collection('results').doc('82');
            await details82Ref.set({ id:82, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details83Ref = db.collection('details').doc(id).collection('results').doc('83');
            await details83Ref.set({ id:83, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details84Ref = db.collection('details').doc(id).collection('results').doc('84');
            await details84Ref.set({ id:84, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details85Ref = db.collection('details').doc(id).collection('results').doc('85');
            await details85Ref.set({ id:85, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details86Ref = db.collection('details').doc(id).collection('results').doc('86');
            await details86Ref.set({ id:86, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details87Ref = db.collection('details').doc(id).collection('results').doc('87');
            await details87Ref.set({ id:87, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details88Ref = db.collection('details').doc(id).collection('results').doc('88');
            await details88Ref.set({ id:88, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details89Ref = db.collection('details').doc(id).collection('results').doc('89');
            await details89Ref.set({ id:89, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details90Ref = db.collection('details').doc(id).collection('results').doc('90');
            await details90Ref.set({ id:90, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details91Ref = db.collection('details').doc(id).collection('results').doc('91');
            await details91Ref.set({ id:91, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details92Ref = db.collection('details').doc(id).collection('results').doc('92');
            await details92Ref.set({ id:92, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details93Ref = db.collection('details').doc(id).collection('results').doc('93');
            await details93Ref.set({ id:93, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details94Ref = db.collection('details').doc(id).collection('results').doc('94');
            await details94Ref.set({ id:94, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details95Ref = db.collection('details').doc(id).collection('results').doc('95');
            await details95Ref.set({ id:95, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details96Ref = db.collection('details').doc(id).collection('results').doc('96');
            await details96Ref.set({ id:96, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details97Ref = db.collection('details').doc(id).collection('results').doc('97');
            await details97Ref.set({ id:97, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details98Ref = db.collection('details').doc(id).collection('results').doc('98');
            await details98Ref.set({ id:98, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details99Ref = db.collection('details').doc(id).collection('results').doc('99');
            await details99Ref.set({ id:99, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details100Ref = db.collection('details').doc(id).collection('results').doc('100');
            await details100Ref.set({ id:100, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details101Ref = db.collection('details').doc(id).collection('results').doc('101');
            await details101Ref.set({ id:101, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details102Ref = db.collection('details').doc(id).collection('results').doc('102');
            await details102Ref.set({ id:102, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details103Ref = db.collection('details').doc(id).collection('results').doc('103');
            await details103Ref.set({ id:103, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details104Ref = db.collection('details').doc(id).collection('results').doc('104');
            await details104Ref.set({ id:104, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details105Ref = db.collection('details').doc(id).collection('results').doc('105');
            await details105Ref.set({ id:105, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details106Ref = db.collection('details').doc(id).collection('results').doc('106');
            await details106Ref.set({ id:106, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details107Ref = db.collection('details').doc(id).collection('results').doc('107');
            await details107Ref.set({ id:107, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details108Ref = db.collection('details').doc(id).collection('results').doc('108');
            await details108Ref.set({ id:108, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details109Ref = db.collection('details').doc(id).collection('results').doc('109');
            await details109Ref.set({ id:109, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details110Ref = db.collection('details').doc(id).collection('results').doc('110');
            await details110Ref.set({ id:110, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details111Ref = db.collection('details').doc(id).collection('results').doc('111');
            await details111Ref.set({ id:111, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details112Ref = db.collection('details').doc(id).collection('results').doc('112');
            await details112Ref.set({ id:112, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details113Ref = db.collection('details').doc(id).collection('results').doc('113');
            await details113Ref.set({ id:113, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details114Ref = db.collection('details').doc(id).collection('results').doc('114');
            await details114Ref.set({ id:114, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details115Ref = db.collection('details').doc(id).collection('results').doc('115');
            await details115Ref.set({ id:115, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details116Ref = db.collection('details').doc(id).collection('results').doc('116');
            await details116Ref.set({ id:116, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details117Ref = db.collection('details').doc(id).collection('results').doc('117');
            await details117Ref.set({ id:117, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details118Ref = db.collection('details').doc(id).collection('results').doc('118');
            await details118Ref.set({ id:118, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details119Ref = db.collection('details').doc(id).collection('results').doc('119');
            await details119Ref.set({ id:119, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details120Ref = db.collection('details').doc(id).collection('results').doc('120');
            await details120Ref.set({ id:120, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details121Ref = db.collection('details').doc(id).collection('results').doc('121');
            await details121Ref.set({ id:121, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details122Ref = db.collection('details').doc(id).collection('results').doc('122');
            await details122Ref.set({ id:122, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details123Ref = db.collection('details').doc(id).collection('results').doc('123');
            await details123Ref.set({ id:123, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details124Ref = db.collection('details').doc(id).collection('results').doc('124');
            await details124Ref.set({ id:124, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details125Ref = db.collection('details').doc(id).collection('results').doc('125');
            await details125Ref.set({ id:125, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details126Ref = db.collection('details').doc(id).collection('results').doc('126');
            await details126Ref.set({ id:126, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details127Ref = db.collection('details').doc(id).collection('results').doc('127');
            await details127Ref.set({ id:127, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details128Ref = db.collection('details').doc(id).collection('results').doc('128');
            await details128Ref.set({ id:128, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details129Ref = db.collection('details').doc(id).collection('results').doc('129');
            await details129Ref.set({ id:129, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details130Ref = db.collection('details').doc(id).collection('results').doc('130');
            await details130Ref.set({ id:130, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details131Ref = db.collection('details').doc(id).collection('results').doc('131');
            await details131Ref.set({ id:131, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details132Ref = db.collection('details').doc(id).collection('results').doc('132');
            await details132Ref.set({ id:132, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details133Ref = db.collection('details').doc(id).collection('results').doc('133');
            await details133Ref.set({ id:133, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details134Ref = db.collection('details').doc(id).collection('results').doc('134');
            await details134Ref.set({ id:134, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details135Ref = db.collection('details').doc(id).collection('results').doc('135');
            await details135Ref.set({ id:135, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details136Ref = db.collection('details').doc(id).collection('results').doc('136');
            await details136Ref.set({ id:136, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details137Ref = db.collection('details').doc(id).collection('results').doc('137');
            await details137Ref.set({ id:137, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details138Ref = db.collection('details').doc(id).collection('results').doc('138');
            await details138Ref.set({ id:138, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details139Ref = db.collection('details').doc(id).collection('results').doc('139');
            await details139Ref.set({ id:139, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details140Ref = db.collection('details').doc(id).collection('results').doc('140');
            await details140Ref.set({ id:140, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details141Ref = db.collection('details').doc(id).collection('results').doc('141');
            await details141Ref.set({ id:141, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details142Ref = db.collection('details').doc(id).collection('results').doc('142');
            await details142Ref.set({ id:142, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details143Ref = db.collection('details').doc(id).collection('results').doc('143');
            await details143Ref.set({ id:143, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details144Ref = db.collection('details').doc(id).collection('results').doc('144');
            await details144Ref.set({ id:144, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details145Ref = db.collection('details').doc(id).collection('results').doc('145');
            await details145Ref.set({ id:145, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details146Ref = db.collection('details').doc(id).collection('results').doc('146');
            await details146Ref.set({ id:146, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details147Ref = db.collection('details').doc(id).collection('results').doc('147');
            await details147Ref.set({ id:147, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details148Ref = db.collection('details').doc(id).collection('results').doc('148');
            await details148Ref.set({ id:148, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details149Ref = db.collection('details').doc(id).collection('results').doc('149');
            await details149Ref.set({ id:149, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details150Ref = db.collection('details').doc(id).collection('results').doc('150');
            await details150Ref.set({ id:150, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details151Ref = db.collection('details').doc(id).collection('results').doc('151');
            await details151Ref.set({ id:151, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details152Ref = db.collection('details').doc(id).collection('results').doc('152');
            await details152Ref.set({ id:152, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details153Ref = db.collection('details').doc(id).collection('results').doc('153');
            await details153Ref.set({ id:153, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details154Ref = db.collection('details').doc(id).collection('results').doc('154');
            await details154Ref.set({ id:154, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details155Ref = db.collection('details').doc(id).collection('results').doc('155');
            await details155Ref.set({ id:155, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details156Ref = db.collection('details').doc(id).collection('results').doc('156');
            await details156Ref.set({ id:156, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details157Ref = db.collection('details').doc(id).collection('results').doc('157');
            await details157Ref.set({ id:157, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details158Ref = db.collection('details').doc(id).collection('results').doc('158');
            await details158Ref.set({ id:158, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details159Ref = db.collection('details').doc(id).collection('results').doc('159');
            await details159Ref.set({ id:159, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details160Ref = db.collection('details').doc(id).collection('results').doc('160');
            await details160Ref.set({ id:160, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details161Ref = db.collection('details').doc(id).collection('results').doc('161');
            await details161Ref.set({ id:161, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details162Ref = db.collection('details').doc(id).collection('results').doc('162');
            await details162Ref.set({ id:162, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details163Ref = db.collection('details').doc(id).collection('results').doc('163');
            await details163Ref.set({ id:163, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details164Ref = db.collection('details').doc(id).collection('results').doc('164');
            await details164Ref.set({ id:164, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details165Ref = db.collection('details').doc(id).collection('results').doc('165');
            await details165Ref.set({ id:165, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details166Ref = db.collection('details').doc(id).collection('results').doc('166');
            await details166Ref.set({ id:166, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details167Ref = db.collection('details').doc(id).collection('results').doc('167');
            await details167Ref.set({ id:167, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details168Ref = db.collection('details').doc(id).collection('results').doc('168');
            await details168Ref.set({ id:168, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details169Ref = db.collection('details').doc(id).collection('results').doc('169');
            await details169Ref.set({ id:169, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details170Ref = db.collection('details').doc(id).collection('results').doc('170');
            await details170Ref.set({ id:170, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details171Ref = db.collection('details').doc(id).collection('results').doc('171');
            await details171Ref.set({ id:171, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details172Ref = db.collection('details').doc(id).collection('results').doc('172');
            await details172Ref.set({ id:172, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details173Ref = db.collection('details').doc(id).collection('results').doc('173');
            await details173Ref.set({ id:173, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details174Ref = db.collection('details').doc(id).collection('results').doc('174');
            await details174Ref.set({ id:174, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details175Ref = db.collection('details').doc(id).collection('results').doc('175');
            await details175Ref.set({ id:175, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details176Ref = db.collection('details').doc(id).collection('results').doc('176');
            await details176Ref.set({ id:176, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details177Ref = db.collection('details').doc(id).collection('results').doc('177');
            await details177Ref.set({ id:177, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details178Ref = db.collection('details').doc(id).collection('results').doc('178');
            await details178Ref.set({ id:178, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details179Ref = db.collection('details').doc(id).collection('results').doc('179');
            await details179Ref.set({ id:179, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details180Ref = db.collection('details').doc(id).collection('results').doc('180');
            await details180Ref.set({ id:180, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details181Ref = db.collection('details').doc(id).collection('results').doc('181');
            await details181Ref.set({ id:181, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details182Ref = db.collection('details').doc(id).collection('results').doc('182');
            await details182Ref.set({ id:182, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details183Ref = db.collection('details').doc(id).collection('results').doc('183');
            await details183Ref.set({ id:183, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details184Ref = db.collection('details').doc(id).collection('results').doc('184');
            await details184Ref.set({ id:184, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details185Ref = db.collection('details').doc(id).collection('results').doc('185');
            await details185Ref.set({ id:185, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details186Ref = db.collection('details').doc(id).collection('results').doc('186');
            await details186Ref.set({ id:186, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details187Ref = db.collection('details').doc(id).collection('results').doc('187');
            await details187Ref.set({ id:187, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details188Ref = db.collection('details').doc(id).collection('results').doc('188');
            await details188Ref.set({ id:188, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details189Ref = db.collection('details').doc(id).collection('results').doc('189');
            await details189Ref.set({ id:189, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details190Ref = db.collection('details').doc(id).collection('results').doc('190');
            await details190Ref.set({ id:190, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details191Ref = db.collection('details').doc(id).collection('results').doc('191');
            await details191Ref.set({ id:191, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details192Ref = db.collection('details').doc(id).collection('results').doc('192');
            await details192Ref.set({ id:192, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details193Ref = db.collection('details').doc(id).collection('results').doc('193');
            await details193Ref.set({ id:193, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details194Ref = db.collection('details').doc(id).collection('results').doc('194');
            await details194Ref.set({ id:194, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details195Ref = db.collection('details').doc(id).collection('results').doc('195');
            await details195Ref.set({ id:195, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details196Ref = db.collection('details').doc(id).collection('results').doc('196');
            await details196Ref.set({ id:196, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details197Ref = db.collection('details').doc(id).collection('results').doc('197');
            await details197Ref.set({ id:197, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details198Ref = db.collection('details').doc(id).collection('results').doc('198');
            await details198Ref.set({ id:198, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details199Ref = db.collection('details').doc(id).collection('results').doc('199');
            await details199Ref.set({ id:199, achieve: "", memo: "", favorite: false, makeDay: timestamp})
            const details200Ref = db.collection('details').doc(id).collection('results').doc('200');
            await details200Ref.set({ id:200, achieve: "", memo: "", favorite: false, makeDay: timestamp})

        }
        fetchWazas(name, id);
    }
}

// export const userInit = (userRef, name, id) => {
//     console.log("aiuaui")
//     return async (dispatch, getState) => {
//                     }
//     }

    export const wazaRegist = () => {
        return async (dispatch, getState) => {
        const wazaRef = db.collection('wazas');
        //idの文字型をどうするか
        await wazaRef.doc("1").set({ id: 1,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        await wazaRef.doc("2").set({ id: 2,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        await wazaRef.doc("3").set({ id: 3,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        await wazaRef.doc("4").set({ id: 4,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("5").set({ id: 5,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("6").set({ id: 6,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("7").set({ id: 7,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("8").set({ id: 8,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("9").set({ id: 9,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("10").set({ id: 10,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("11").set({ id: 11,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("12").set({ id: 12,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("13").set({ id: 13,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("14").set({ id: 14,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("15").set({ id: 15,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("16").set({ id: 16,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("17").set({ id: 17,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("18").set({ id: 18,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("19").set({ id: 19,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("20").set({ id: 20,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("21").set({ id: 21,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("22").set({ id: 22,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("23").set({ id: 23,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("24").set({ id: 24,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("25").set({ id: 25,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("26").set({ id: 26,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("27").set({ id: 27,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("28").set({ id: 28,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("29").set({ id: 29,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("30").set({ id: 30,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("31").set({ id: 31,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("32").set({ id: 32,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("33").set({ id: 33,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("34").set({ id: 34,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("35").set({ id: 35,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("36").set({ id: 36,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("37").set({ id: 37,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("38").set({ id: 38,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("39").set({ id: 39,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("40").set({ id: 40,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("41").set({ id: 41,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("42").set({ id: 42,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("43").set({ id: 43,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("44").set({ id: 44,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("45").set({ id: 45,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("46").set({ id: 46,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("47").set({ id: 47,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("48").set({ id: 48,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("49").set({ id: 49,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("50").set({ id: 50,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("51").set({ id: 51,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("52").set({ id: 52,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("53").set({ id: 53,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("54").set({ id: 54,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("55").set({ id: 55,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("56").set({ id: 56,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("57").set({ id: 57,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("58").set({ id: 58,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("59").set({ id: 59,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("60").set({ id: 60,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("61").set({ id: 61,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("62").set({ id: 62,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("63").set({ id: 63,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("64").set({ id: 64,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("65").set({ id: 65,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("66").set({ id: 66,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("67").set({ id: 67,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("68").set({ id: 68,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("69").set({ id: 69,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("70").set({ id: 70,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("71").set({ id: 71,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("72").set({ id: 72,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("73").set({ id: 73,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("74").set({ id: 74,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("75").set({ id: 75,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("76").set({ id: 76,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("77").set({ id: 77,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("78").set({ id: 78,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("79").set({ id: 79,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("80").set({ id: 80,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("81").set({ id: 81,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("82").set({ id: 82,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("83").set({ id: 83,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("84").set({ id: 84,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("85").set({ id: 85,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("86").set({ id: 86,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("87").set({ id: 87,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("88").set({ id: 88,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("89").set({ id: 89,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("90").set({ id: 90,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("91").set({ id: 91,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("92").set({ id: 92,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("93").set({ id: 93,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("94").set({ id: 94,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("95").set({ id: 95,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("96").set({ id: 96,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("97").set({ id: 97,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("98").set({ id: 98,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("99").set({ id: 99,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("100").set({ id: 100,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("101").set({ id: 101,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("102").set({ id: 102,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("103").set({ id: 103,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("104").set({ id: 104,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("105").set({ id: 105,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("106").set({ id: 106,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("107").set({ id: 107,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("108").set({ id: 108,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("109").set({ id: 109,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("110").set({ id: 110,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("111").set({ id: 111,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("112").set({ id: 112,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("113").set({ id: 113,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("114").set({ id: 114,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("115").set({ id: 115,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("116").set({ id: 116,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("117").set({ id: 117,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("118").set({ id: 118,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("119").set({ id: 119,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("120").set({ id: 120,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("121").set({ id: 121,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("122").set({ id: 122,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("123").set({ id: 123,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("124").set({ id: 124,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("125").set({ id: 125,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("126").set({ id: 126,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("127").set({ id: 127,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("128").set({ id: 128,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("129").set({ id: 129,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("130").set({ id: 130,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("131").set({ id: 131,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("132").set({ id: 132,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("133").set({ id: 133,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("134").set({ id: 134,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("135").set({ id: 135,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("136").set({ id: 136,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("137").set({ id: 137,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("138").set({ id: 138,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("139").set({ id: 139,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("140").set({ id: 140,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("141").set({ id: 141,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("142").set({ id: 142,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("143").set({ id: 143,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("144").set({ id: 144,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("145").set({ id: 145,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("146").set({ id: 146,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("147").set({ id: 147,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("148").set({ id: 148,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("149").set({ id: 149,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("150").set({ id: 150,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("151").set({ id: 151,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("152").set({ id: 152,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("153").set({ id: 153,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("154").set({ id: 154,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("155").set({ id: 155,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("156").set({ id: 156,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("157").set({ id: 157,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("158").set({ id: 158,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("159").set({ id: 159,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("160").set({ id: 160,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("161").set({ id: 161,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("162").set({ id: 162,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("163").set({ id: 163,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("164").set({ id: 164,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("165").set({ id: 165,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("166").set({ id: 166,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("167").set({ id: 167,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("168").set({ id: 168,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("169").set({ id: 169,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("170").set({ id: 170,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("171").set({ id: 171,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("172").set({ id: 172,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("173").set({ id: 173,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("174").set({ id: 174,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("175").set({ id: 175,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("176").set({ id: 176,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("177").set({ id: 177,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("178").set({ id: 178,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("179").set({ id: 179,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("180").set({ id: 180,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("181").set({ id: 181,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("182").set({ id: 182,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("183").set({ id: 183,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("184").set({ id: 184,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("185").set({ id: 185,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("186").set({ id: 186,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("187").set({ id: 187,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("188").set({ id: 188,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("189").set({ id: 189,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("190").set({ id: 190,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("191").set({ id: 191,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("192").set({ id: 192,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("193").set({ id: 193,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("194").set({ id: 194,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("195").set({ id: 195,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("196").set({ id: 196,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("197").set({ id: 197,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("198").set({ id: 198,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("199").set({ id: 199,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
         await wazaRef.doc("200").set({ id: 200,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
    }
    }