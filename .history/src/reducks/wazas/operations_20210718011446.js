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
        const detailsRef = db.collection('details').doc(userId).collection('results').doc(wazaId);
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
            let batch = db.batch();
            const userStandardRef = db.collection('users').doc(id);
            batch.set(userStandardRef, { id: id, name: name, registerDate: timestamp, role: 'user' });
            //db3に挿入
            //ドキュメントにフィールドを追加することによって、ドキュメントが斜体になるのを防ぐ。他にも方法はあると思われる
            const detailsRef = db.collection('details').doc(id.toString())
            batch.set(detailsRef, {});
            // //各技のユーザごとの達成度等詳細
            const details1Ref = db.collection('details').doc(id).collection('results').doc('1');
            batch.set(details1Ref, { id:1, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details2Ref = db.collection('details').doc(id).collection('results').doc('2');
            batch.set(details2Ref, { id:2, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details3Ref = db.collection('details').doc(id).collection('results').doc('3');
            batch.set(details3Ref, { id:3, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details4Ref = db.collection('details').doc(id).collection('results').doc('4');
            batch.set(details4Ref, { id:4, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details5Ref = db.collection('details').doc(id).collection('results').doc('5');
            batch.set(details5Ref, { id:5, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details6Ref = db.collection('details').doc(id).collection('results').doc('6');
            batch.set(details6Ref, { id:6, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details7Ref = db.collection('details').doc(id).collection('results').doc('7');
            batch.set(details7Ref, { id:7, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details8Ref = db.collection('details').doc(id).collection('results').doc('8');
            batch.set(details8Ref, { id:8, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details9Ref = db.collection('details').doc(id).collection('results').doc('9');
            batch.set(details9Ref, { id:9, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details10Ref = db.collection('details').doc(id).collection('results').doc('10');
            batch.set(details10Ref, { id:10, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details11Ref = db.collection('details').doc(id).collection('results').doc('11');
            batch.set(details11Ref, { id:11, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details12Ref = db.collection('details').doc(id).collection('results').doc('12');
            batch.set(details12Ref, { id:12, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details13Ref = db.collection('details').doc(id).collection('results').doc('13');
            batch.set(details13Ref, { id:13, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details14Ref = db.collection('details').doc(id).collection('results').doc('14');
            batch.set(details14Ref, { id:14, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details15Ref = db.collection('details').doc(id).collection('results').doc('15');
            batch.set(details15Ref, { id:15, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details16Ref = db.collection('details').doc(id).collection('results').doc('16');
            batch.set(details16Ref, { id:16, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details17Ref = db.collection('details').doc(id).collection('results').doc('17');
            batch.set(details17Ref, { id:17, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details18Ref = db.collection('details').doc(id).collection('results').doc('18');
            batch.set(details18Ref, { id:18, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details19Ref = db.collection('details').doc(id).collection('results').doc('19');
            batch.set(details19Ref, { id:19, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details20Ref = db.collection('details').doc(id).collection('results').doc('20');
            batch.set(details20Ref, { id:20, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details21Ref = db.collection('details').doc(id).collection('results').doc('21');
            batch.set(details21Ref, { id:21, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details22Ref = db.collection('details').doc(id).collection('results').doc('22');
            batch.set(details22Ref, { id:22, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details23Ref = db.collection('details').doc(id).collection('results').doc('23');
            batch.set(details23Ref, { id:23, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details24Ref = db.collection('details').doc(id).collection('results').doc('24');
            batch.set(details24Ref, { id:24, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details25Ref = db.collection('details').doc(id).collection('results').doc('25');
            batch.set(details25Ref, { id:25, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details26Ref = db.collection('details').doc(id).collection('results').doc('26');
            batch.set(details26Ref, { id:26, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details27Ref = db.collection('details').doc(id).collection('results').doc('27');
            batch.set(details27Ref, { id:27, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details28Ref = db.collection('details').doc(id).collection('results').doc('28');
            batch.set(details28Ref, { id:28, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details29Ref = db.collection('details').doc(id).collection('results').doc('29');
            batch.set(details29Ref, { id:29, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details30Ref = db.collection('details').doc(id).collection('results').doc('30');
            batch.set(details30Ref, { id:30, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details31Ref = db.collection('details').doc(id).collection('results').doc('31');
            batch.set(details31Ref, { id:31, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details32Ref = db.collection('details').doc(id).collection('results').doc('32');
            batch.set(details32Ref, { id:32, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details33Ref = db.collection('details').doc(id).collection('results').doc('33');
            batch.set(details33Ref, { id:33, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details34Ref = db.collection('details').doc(id).collection('results').doc('34');
            batch.set(details34Ref, { id:34, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details35Ref = db.collection('details').doc(id).collection('results').doc('35');
            batch.set(details35Ref, { id:35, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details36Ref = db.collection('details').doc(id).collection('results').doc('36');
            batch.set(details36Ref, { id:36, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details37Ref = db.collection('details').doc(id).collection('results').doc('37');
            batch.set(details37Ref, { id:37, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details38Ref = db.collection('details').doc(id).collection('results').doc('38');
            batch.set(details38Ref, { id:38, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details39Ref = db.collection('details').doc(id).collection('results').doc('39');
            batch.set(details39Ref, { id:39, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details40Ref = db.collection('details').doc(id).collection('results').doc('40');
            batch.set(details40Ref, { id:40, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details41Ref = db.collection('details').doc(id).collection('results').doc('41');
            batch.set(details41Ref, { id:41, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details42Ref = db.collection('details').doc(id).collection('results').doc('42');
            batch.set(details42Ref, { id:42, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details43Ref = db.collection('details').doc(id).collection('results').doc('43');
            batch.set(details43Ref, { id:43, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details44Ref = db.collection('details').doc(id).collection('results').doc('44');
            batch.set(details44Ref, { id:44, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details45Ref = db.collection('details').doc(id).collection('results').doc('45');
            batch.set(details45Ref, { id:45, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details46Ref = db.collection('details').doc(id).collection('results').doc('46');
            batch.set(details46Ref, { id:46, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details47Ref = db.collection('details').doc(id).collection('results').doc('47');
            batch.set(details47Ref, { id:47, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details48Ref = db.collection('details').doc(id).collection('results').doc('48');
            batch.set(details48Ref, { id:48, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details49Ref = db.collection('details').doc(id).collection('results').doc('49');
            batch.set(details49Ref, { id:49, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details50Ref = db.collection('details').doc(id).collection('results').doc('50');
            batch.set(details50Ref, { id:50, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details51Ref = db.collection('details').doc(id).collection('results').doc('51');
            batch.set(details51Ref, { id:51, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details52Ref = db.collection('details').doc(id).collection('results').doc('52');
            batch.set(details52Ref, { id:52, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details53Ref = db.collection('details').doc(id).collection('results').doc('53');
            batch.set(details53Ref, { id:53, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details54Ref = db.collection('details').doc(id).collection('results').doc('54');
            batch.set(details54Ref, { id:54, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details55Ref = db.collection('details').doc(id).collection('results').doc('55');
            batch.set(details55Ref, { id:55, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details56Ref = db.collection('details').doc(id).collection('results').doc('56');
            batch.set(details56Ref, { id:56, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details57Ref = db.collection('details').doc(id).collection('results').doc('57');
            batch.set(details57Ref, { id:57, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details58Ref = db.collection('details').doc(id).collection('results').doc('58');
            batch.set(details58Ref, { id:58, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details59Ref = db.collection('details').doc(id).collection('results').doc('59');
            batch.set(details59Ref, { id:59, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details60Ref = db.collection('details').doc(id).collection('results').doc('60');
            batch.set(details60Ref, { id:60, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details61Ref = db.collection('details').doc(id).collection('results').doc('61');
            batch.set(details61Ref, { id:61, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details62Ref = db.collection('details').doc(id).collection('results').doc('62');
            batch.set(details62Ref, { id:62, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details63Ref = db.collection('details').doc(id).collection('results').doc('63');
            batch.set(details63Ref, { id:63, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details64Ref = db.collection('details').doc(id).collection('results').doc('64');
            batch.set(details64Ref, { id:64, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details65Ref = db.collection('details').doc(id).collection('results').doc('65');
            batch.set(details65Ref, { id:65, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details66Ref = db.collection('details').doc(id).collection('results').doc('66');
            batch.set(details66Ref, { id:66, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details67Ref = db.collection('details').doc(id).collection('results').doc('67');
            batch.set(details67Ref, { id:67, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details68Ref = db.collection('details').doc(id).collection('results').doc('68');
            batch.set(details68Ref, { id:68, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details69Ref = db.collection('details').doc(id).collection('results').doc('69');
            batch.set(details69Ref, { id:69, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details70Ref = db.collection('details').doc(id).collection('results').doc('70');
            batch.set(details70Ref, { id:70, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details71Ref = db.collection('details').doc(id).collection('results').doc('71');
            batch.set(details71Ref, { id:71, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details72Ref = db.collection('details').doc(id).collection('results').doc('72');
            batch.set(details72Ref, { id:72, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details73Ref = db.collection('details').doc(id).collection('results').doc('73');
            batch.set(details73Ref, { id:73, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details74Ref = db.collection('details').doc(id).collection('results').doc('74');
            batch.set(details74Ref, { id:74, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details75Ref = db.collection('details').doc(id).collection('results').doc('75');
            batch.set(details75Ref, { id:75, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details76Ref = db.collection('details').doc(id).collection('results').doc('76');
            batch.set(details76Ref, { id:76, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details77Ref = db.collection('details').doc(id).collection('results').doc('77');
            batch.set(details77Ref, { id:77, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details78Ref = db.collection('details').doc(id).collection('results').doc('78');
            batch.set(details78Ref, { id:78, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details79Ref = db.collection('details').doc(id).collection('results').doc('79');
            batch.set(details79Ref, { id:79, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details80Ref = db.collection('details').doc(id).collection('results').doc('80');
            batch.set(details80Ref, { id:80, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details81Ref = db.collection('details').doc(id).collection('results').doc('81');
            batch.set(details81Ref, { id:81, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details82Ref = db.collection('details').doc(id).collection('results').doc('82');
            batch.set(details82Ref, { id:82, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details83Ref = db.collection('details').doc(id).collection('results').doc('83');
            batch.set(details83Ref, { id:83, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details84Ref = db.collection('details').doc(id).collection('results').doc('84');
            batch.set(details84Ref, { id:84, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details85Ref = db.collection('details').doc(id).collection('results').doc('85');
            batch.set(details85Ref, { id:85, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details86Ref = db.collection('details').doc(id).collection('results').doc('86');
            batch.set(details86Ref, { id:86, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details87Ref = db.collection('details').doc(id).collection('results').doc('87');
            batch.set(details87Ref, { id:87, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details88Ref = db.collection('details').doc(id).collection('results').doc('88');
            batch.set(details88Ref, { id:88, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details89Ref = db.collection('details').doc(id).collection('results').doc('89');
            batch.set(details89Ref, { id:89, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details90Ref = db.collection('details').doc(id).collection('results').doc('90');
            batch.set(details90Ref, { id:90, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details91Ref = db.collection('details').doc(id).collection('results').doc('91');
            batch.set(details91Ref, { id:91, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details92Ref = db.collection('details').doc(id).collection('results').doc('92');
            batch.set(details92Ref, { id:92, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details93Ref = db.collection('details').doc(id).collection('results').doc('93');
            batch.set(details93Ref, { id:93, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details94Ref = db.collection('details').doc(id).collection('results').doc('94');
            batch.set(details94Ref, { id:94, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details95Ref = db.collection('details').doc(id).collection('results').doc('95');
            batch.set(details95Ref, { id:95, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details96Ref = db.collection('details').doc(id).collection('results').doc('96');
            batch.set(details96Ref, { id:96, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details97Ref = db.collection('details').doc(id).collection('results').doc('97');
            batch.set(details97Ref, { id:97, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details98Ref = db.collection('details').doc(id).collection('results').doc('98');
            batch.set(details98Ref, { id:98, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details99Ref = db.collection('details').doc(id).collection('results').doc('99');
            batch.set(details99Ref, { id:99, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details100Ref = db.collection('details').doc(id).collection('results').doc('100');
            batch.set(details100Ref, { id:100, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details101Ref = db.collection('details').doc(id).collection('results').doc('101');
            batch.set(details101Ref, { id:101, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details102Ref = db.collection('details').doc(id).collection('results').doc('102');
            batch.set(details102Ref, { id:102, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details103Ref = db.collection('details').doc(id).collection('results').doc('103');
            batch.set(details103Ref, { id:103, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details104Ref = db.collection('details').doc(id).collection('results').doc('104');
            batch.set(details104Ref, { id:104, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details105Ref = db.collection('details').doc(id).collection('results').doc('105');
            batch.set(details105Ref, { id:105, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details106Ref = db.collection('details').doc(id).collection('results').doc('106');
            batch.set(details106Ref, { id:106, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details107Ref = db.collection('details').doc(id).collection('results').doc('107');
            batch.set(details107Ref, { id:107, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details108Ref = db.collection('details').doc(id).collection('results').doc('108');
            batch.set(details108Ref, { id:108, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details109Ref = db.collection('details').doc(id).collection('results').doc('109');
            batch.set(details109Ref, { id:109, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details110Ref = db.collection('details').doc(id).collection('results').doc('110');
            batch.set(details110Ref, { id:110, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details111Ref = db.collection('details').doc(id).collection('results').doc('111');
            batch.set(details111Ref, { id:111, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details112Ref = db.collection('details').doc(id).collection('results').doc('112');
            batch.set(details112Ref, { id:112, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details113Ref = db.collection('details').doc(id).collection('results').doc('113');
            batch.set(details113Ref, { id:113, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details114Ref = db.collection('details').doc(id).collection('results').doc('114');
            batch.set(details114Ref, { id:114, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details115Ref = db.collection('details').doc(id).collection('results').doc('115');
            batch.set(details115Ref, { id:115, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details116Ref = db.collection('details').doc(id).collection('results').doc('116');
            batch.set(details116Ref, { id:116, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details117Ref = db.collection('details').doc(id).collection('results').doc('117');
            batch.set(details117Ref, { id:117, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details118Ref = db.collection('details').doc(id).collection('results').doc('118');
            batch.set(details118Ref, { id:118, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details119Ref = db.collection('details').doc(id).collection('results').doc('119');
            batch.set(details119Ref, { id:119, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details120Ref = db.collection('details').doc(id).collection('results').doc('120');
            batch.set(details120Ref, { id:120, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details121Ref = db.collection('details').doc(id).collection('results').doc('121');
            batch.set(details121Ref, { id:121, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details122Ref = db.collection('details').doc(id).collection('results').doc('122');
            batch.set(details122Ref, { id:122, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details123Ref = db.collection('details').doc(id).collection('results').doc('123');
            batch.set(details123Ref, { id:123, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details124Ref = db.collection('details').doc(id).collection('results').doc('124');
            batch.set(details124Ref, { id:124, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details125Ref = db.collection('details').doc(id).collection('results').doc('125');
            batch.set(details125Ref, { id:125, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details126Ref = db.collection('details').doc(id).collection('results').doc('126');
            batch.set(details126Ref, { id:126, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details127Ref = db.collection('details').doc(id).collection('results').doc('127');
            batch.set(details127Ref, { id:127, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details128Ref = db.collection('details').doc(id).collection('results').doc('128');
            batch.set(details128Ref, { id:128, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details129Ref = db.collection('details').doc(id).collection('results').doc('129');
            batch.set(details129Ref, { id:129, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details130Ref = db.collection('details').doc(id).collection('results').doc('130');
            batch.set(details130Ref, { id:130, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details131Ref = db.collection('details').doc(id).collection('results').doc('131');
            batch.set(details131Ref, { id:131, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details132Ref = db.collection('details').doc(id).collection('results').doc('132');
            batch.set(details132Ref, { id:132, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details133Ref = db.collection('details').doc(id).collection('results').doc('133');
            batch.set(details133Ref, { id:133, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details134Ref = db.collection('details').doc(id).collection('results').doc('134');
            batch.set(details134Ref, { id:134, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details135Ref = db.collection('details').doc(id).collection('results').doc('135');
            batch.set(details135Ref, { id:135, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details136Ref = db.collection('details').doc(id).collection('results').doc('136');
            batch.set(details136Ref, { id:136, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details137Ref = db.collection('details').doc(id).collection('results').doc('137');
            batch.set(details137Ref, { id:137, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details138Ref = db.collection('details').doc(id).collection('results').doc('138');
            batch.set(details138Ref, { id:138, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details139Ref = db.collection('details').doc(id).collection('results').doc('139');
            batch.set(details139Ref, { id:139, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details140Ref = db.collection('details').doc(id).collection('results').doc('140');
            batch.set(details140Ref, { id:140, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details141Ref = db.collection('details').doc(id).collection('results').doc('141');
            batch.set(details141Ref, { id:141, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details142Ref = db.collection('details').doc(id).collection('results').doc('142');
            batch.set(details142Ref, { id:142, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details143Ref = db.collection('details').doc(id).collection('results').doc('143');
            batch.set(details143Ref, { id:143, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details144Ref = db.collection('details').doc(id).collection('results').doc('144');
            batch.set(details144Ref, { id:144, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details145Ref = db.collection('details').doc(id).collection('results').doc('145');
            batch.set(details145Ref, { id:145, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details146Ref = db.collection('details').doc(id).collection('results').doc('146');
            batch.set(details146Ref, { id:146, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details147Ref = db.collection('details').doc(id).collection('results').doc('147');
            batch.set(details147Ref, { id:147, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details148Ref = db.collection('details').doc(id).collection('results').doc('148');
            batch.set(details148Ref, { id:148, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details149Ref = db.collection('details').doc(id).collection('results').doc('149');
            batch.set(details149Ref, { id:149, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details150Ref = db.collection('details').doc(id).collection('results').doc('150');
            batch.set(details150Ref, { id:150, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details151Ref = db.collection('details').doc(id).collection('results').doc('151');
            batch.set(details151Ref, { id:151, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details152Ref = db.collection('details').doc(id).collection('results').doc('152');
            batch.set(details152Ref, { id:152, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details153Ref = db.collection('details').doc(id).collection('results').doc('153');
            batch.set(details153Ref, { id:153, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details154Ref = db.collection('details').doc(id).collection('results').doc('154');
            batch.set(details154Ref, { id:154, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details155Ref = db.collection('details').doc(id).collection('results').doc('155');
            batch.set(details155Ref, { id:155, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details156Ref = db.collection('details').doc(id).collection('results').doc('156');
            batch.set(details156Ref, { id:156, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details157Ref = db.collection('details').doc(id).collection('results').doc('157');
            batch.set(details157Ref, { id:157, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details158Ref = db.collection('details').doc(id).collection('results').doc('158');
            batch.set(details158Ref, { id:158, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details159Ref = db.collection('details').doc(id).collection('results').doc('159');
            batch.set(details159Ref, { id:159, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details160Ref = db.collection('details').doc(id).collection('results').doc('160');
            batch.set(details160Ref, { id:160, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details161Ref = db.collection('details').doc(id).collection('results').doc('161');
            batch.set(details161Ref, { id:161, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details162Ref = db.collection('details').doc(id).collection('results').doc('162');
            batch.set(details162Ref, { id:162, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details163Ref = db.collection('details').doc(id).collection('results').doc('163');
            batch.set(details163Ref, { id:163, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details164Ref = db.collection('details').doc(id).collection('results').doc('164');
            batch.set(details164Ref, { id:164, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details165Ref = db.collection('details').doc(id).collection('results').doc('165');
            batch.set(details165Ref, { id:165, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details166Ref = db.collection('details').doc(id).collection('results').doc('166');
            batch.set(details166Ref, { id:166, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details167Ref = db.collection('details').doc(id).collection('results').doc('167');
            batch.set(details167Ref, { id:167, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details168Ref = db.collection('details').doc(id).collection('results').doc('168');
            batch.set(details168Ref, { id:168, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details169Ref = db.collection('details').doc(id).collection('results').doc('169');
            batch.set(details169Ref, { id:169, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details170Ref = db.collection('details').doc(id).collection('results').doc('170');
            batch.set(details170Ref, { id:170, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details171Ref = db.collection('details').doc(id).collection('results').doc('171');
            batch.set(details171Ref, { id:171, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details172Ref = db.collection('details').doc(id).collection('results').doc('172');
            batch.set(details172Ref, { id:172, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details173Ref = db.collection('details').doc(id).collection('results').doc('173');
            batch.set(details173Ref, { id:173, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details174Ref = db.collection('details').doc(id).collection('results').doc('174');
            batch.set(details174Ref, { id:174, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details175Ref = db.collection('details').doc(id).collection('results').doc('175');
            batch.set(details175Ref, { id:175, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details176Ref = db.collection('details').doc(id).collection('results').doc('176');
            batch.set(details176Ref, { id:176, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details177Ref = db.collection('details').doc(id).collection('results').doc('177');
            batch.set(details177Ref, { id:177, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details178Ref = db.collection('details').doc(id).collection('results').doc('178');
            batch.set(details178Ref, { id:178, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details179Ref = db.collection('details').doc(id).collection('results').doc('179');
            batch.set(details179Ref, { id:179, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details180Ref = db.collection('details').doc(id).collection('results').doc('180');
            batch.set(details180Ref, { id:180, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details181Ref = db.collection('details').doc(id).collection('results').doc('181');
            batch.set(details181Ref, { id:181, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details182Ref = db.collection('details').doc(id).collection('results').doc('182');
            batch.set(details182Ref, { id:182, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details183Ref = db.collection('details').doc(id).collection('results').doc('183');
            batch.set(details183Ref, { id:183, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details184Ref = db.collection('details').doc(id).collection('results').doc('184');
            batch.set(details184Ref, { id:184, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details185Ref = db.collection('details').doc(id).collection('results').doc('185');
            batch.set(details185Ref, { id:185, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details186Ref = db.collection('details').doc(id).collection('results').doc('186');
            batch.set(details186Ref, { id:186, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details187Ref = db.collection('details').doc(id).collection('results').doc('187');
            batch.set(details187Ref, { id:187, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details188Ref = db.collection('details').doc(id).collection('results').doc('188');
            batch.set(details188Ref, { id:188, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details189Ref = db.collection('details').doc(id).collection('results').doc('189');
            batch.set(details189Ref, { id:189, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details190Ref = db.collection('details').doc(id).collection('results').doc('190');
            batch.set(details190Ref, { id:190, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details191Ref = db.collection('details').doc(id).collection('results').doc('191');
            batch.set(details191Ref, { id:191, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details192Ref = db.collection('details').doc(id).collection('results').doc('192');
            batch.set(details192Ref, { id:192, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details193Ref = db.collection('details').doc(id).collection('results').doc('193');
            batch.set(details193Ref, { id:193, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details194Ref = db.collection('details').doc(id).collection('results').doc('194');
            batch.set(details194Ref, { id:194, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details195Ref = db.collection('details').doc(id).collection('results').doc('195');
            batch.set(details195Ref, { id:195, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details196Ref = db.collection('details').doc(id).collection('results').doc('196');
            batch.set(details196Ref, { id:196, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details197Ref = db.collection('details').doc(id).collection('results').doc('197');
            batch.set(details197Ref, { id:197, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details198Ref = db.collection('details').doc(id).collection('results').doc('198');
            batch.set(details198Ref, { id:198, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details199Ref = db.collection('details').doc(id).collection('results').doc('199');
            batch.set(details199Ref, { id:199, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            const details200Ref = db.collection('details').doc(id).collection('results').doc('200');
            batch.set(details200Ref, { id:200, achieve: "", memo: "", favorite: false, makeDay: timestamp});
            // バッチ処理の完了を宣言
            await batch.commit();
        }
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
        dispatch(initUserAction(users));
    }
}

    export const wazaRegist = () => {
        return async (dispatch, getState) => {

        let batch = db.batch();
        const wazaRef = db.collection('wazas');
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
        // await wazaRef.doc("1").set({ id: 1,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        // await wazaRef.doc("2").set({ id: 2,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        // await wazaRef.doc("3").set({ id: 3,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        // await wazaRef.doc("4").set({ id: 4,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("5").set({ id: 5,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("6").set({ id: 6,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("7").set({ id: 7,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("8").set({ id: 8,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("9").set({ id: 9,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("10").set({ id: 10,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("11").set({ id: 11,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("12").set({ id: 12,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("13").set({ id: 13,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("14").set({ id: 14,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("15").set({ id: 15,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("16").set({ id: 16,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("17").set({ id: 17,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("18").set({ id: 18,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("19").set({ id: 19,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("20").set({ id: 20,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("21").set({ id: 21,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("22").set({ id: 22,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("23").set({ id: 23,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("24").set({ id: 24,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("25").set({ id: 25,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("26").set({ id: 26,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("27").set({ id: 27,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("28").set({ id: 28,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("29").set({ id: 29,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("30").set({ id: 30,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("31").set({ id: 31,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("32").set({ id: 32,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("33").set({ id: 33,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("34").set({ id: 34,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("35").set({ id: 35,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("36").set({ id: 36,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("37").set({ id: 37,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("38").set({ id: 38,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("39").set({ id: 39,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("40").set({ id: 40,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("41").set({ id: 41,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("42").set({ id: 42,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("43").set({ id: 43,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("44").set({ id: 44,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("45").set({ id: 45,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("46").set({ id: 46,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("47").set({ id: 47,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("48").set({ id: 48,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("49").set({ id: 49,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("50").set({ id: 50,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("51").set({ id: 51,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("52").set({ id: 52,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("53").set({ id: 53,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("54").set({ id: 54,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("55").set({ id: 55,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("56").set({ id: 56,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("57").set({ id: 57,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("58").set({ id: 58,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("59").set({ id: 59,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("60").set({ id: 60,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("61").set({ id: 61,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("62").set({ id: 62,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("63").set({ id: 63,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("64").set({ id: 64,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("65").set({ id: 65,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("66").set({ id: 66,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("67").set({ id: 67,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("68").set({ id: 68,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("69").set({ id: 69,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("70").set({ id: 70,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("71").set({ id: 71,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("72").set({ id: 72,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("73").set({ id: 73,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("74").set({ id: 74,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("75").set({ id: 75,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("76").set({ id: 76,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("77").set({ id: 77,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("78").set({ id: 78,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("79").set({ id: 79,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("80").set({ id: 80,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("81").set({ id: 81,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("82").set({ id: 82,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("83").set({ id: 83,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("84").set({ id: 84,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("85").set({ id: 85,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("86").set({ id: 86,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("87").set({ id: 87,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("88").set({ id: 88,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("89").set({ id: 89,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("90").set({ id: 90,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("91").set({ id: 91,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("92").set({ id: 92,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("93").set({ id: 93,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("94").set({ id: 94,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("95").set({ id: 95,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("96").set({ id: 96,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("97").set({ id: 97,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("98").set({ id: 98,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("99").set({ id: 99,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("100").set({ id: 100,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("101").set({ id: 101,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("102").set({ id: 102,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("103").set({ id: 103,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("104").set({ id: 104,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("105").set({ id: 105,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("106").set({ id: 106,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("107").set({ id: 107,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("108").set({ id: 108,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("109").set({ id: 109,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("110").set({ id: 110,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("111").set({ id: 111,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("112").set({ id: 112,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("113").set({ id: 113,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("114").set({ id: 114,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("115").set({ id: 115,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("116").set({ id: 116,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("117").set({ id: 117,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("118").set({ id: 118,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("119").set({ id: 119,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("120").set({ id: 120,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("121").set({ id: 121,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("122").set({ id: 122,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("123").set({ id: 123,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("124").set({ id: 124,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("125").set({ id: 125,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("126").set({ id: 126,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("127").set({ id: 127,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("128").set({ id: 128,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("129").set({ id: 129,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("130").set({ id: 130,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("131").set({ id: 131,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("132").set({ id: 132,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("133").set({ id: 133,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("134").set({ id: 134,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("135").set({ id: 135,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("136").set({ id: 136,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("137").set({ id: 137,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("138").set({ id: 138,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("139").set({ id: 139,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("140").set({ id: 140,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("141").set({ id: 141,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("142").set({ id: 142,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("143").set({ id: 143,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("144").set({ id: 144,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("145").set({ id: 145,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("146").set({ id: 146,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("147").set({ id: 147,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("148").set({ id: 148,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("149").set({ id: 149,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("150").set({ id: 150,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("151").set({ id: 151,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("152").set({ id: 152,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("153").set({ id: 153,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("154").set({ id: 154,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("155").set({ id: 155,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("156").set({ id: 156,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("157").set({ id: 157,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("158").set({ id: 158,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("159").set({ id: 159,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("160").set({ id: 160,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("161").set({ id: 161,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("162").set({ id: 162,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("163").set({ id: 163,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("164").set({ id: 164,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("165").set({ id: 165,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("166").set({ id: 166,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("167").set({ id: 167,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("168").set({ id: 168,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("169").set({ id: 169,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("170").set({ id: 170,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("171").set({ id: 171,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("172").set({ id: 172,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("173").set({ id: 173,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("174").set({ id: 174,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("175").set({ id: 175,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("176").set({ id: 176,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("177").set({ id: 177,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("178").set({ id: 178,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("179").set({ id: 179,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("180").set({ id: 180,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("181").set({ id: 181,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("182").set({ id: 182,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("183").set({ id: 183,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("184").set({ id: 184,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("185").set({ id: 185,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("186").set({ id: 186,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("187").set({ id: 187,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("188").set({ id: 188,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("189").set({ id: 189,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("190").set({ id: 190,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("191").set({ id: 191,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("192").set({ id: 192,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("193").set({ id: 193,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("194").set({ id: 194,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("195").set({ id: 195,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("196").set({ id: 196,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("197").set({ id: 197,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("198").set({ id: 198,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("199").set({ id: 199,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
        //  await wazaRef.doc("200").set({ id: 200,　waza:"世界一周", favoiteSum: "5", level: "2", makeSum: "3", url:"https://www.youtube.com/embed/cWDJoK8zw58"})
    }
    }