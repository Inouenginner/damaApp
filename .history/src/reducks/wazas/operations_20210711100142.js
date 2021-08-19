import {fetchWazasAction} from "./actions"
import {push} from "connected-react-router"
import {db} from '../../firebase/index'


export const fetchWazas = (name) => {
    return async (dispatch, getState) => {
        let userWazaList = [];
        
        const detailsRef = db.collection('details').doc(name).collection('results');
        const detailsDocs = await detailsRef.get() // firebase.firestore.DocumentSnapshotのインスタンスを取得
        console.log(detailsDocs)
        detailsDocs.forEach((detailsDoc) => {
            if (detailsDoc.exists) {
    //            list.add(detailsDoc.datea);
                console.log("Document data:", detailsDoc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
          })
          console.log(list)
        dispatch(fetchWazasAction(list));
        dispatch(push('/record'));
    }
}

//ログイン時
export const signIn = (name) => {
    return async (dispatch, getState) => {
        //valid
        if(name === "") {
            alert("必須項目が未入力です")
            return false
        }
        const userRef = db.collection('users').doc(name);
        const userDoc = await userRef.get() // firebase.firestore.DocumentSnapshotのインスタンスを取得
        //すでにuserがあるのならば
        if (userDoc.exists) {
            console.log(userRef);
            console.log(userDoc)
        } else {
            //db1に挿入
            await userRef.set({ id: 'title1', name: 'body1', registerDate: 50, role: 'life' })
            console.log('No such document!')
            //db3に挿入
            //ドキュメントにフィールドを追加することによって、ドキュメントが斜体になるのを防ぐ。他にも方法はあると思われる
            const detailsRef = db.collection('details').doc(name).set({ });
            const details1Ref = db.collection('details').doc(name).collection('results').doc('1');
            await details1Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details2Ref = db.collection('details').doc(name).collection('results').doc('2');
            await details2Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details3Ref = db.collection('details').doc(name).collection('results').doc('3');
            await details3Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details4Ref = db.collection('details').doc(name).collection('results').doc('4');
            await details4Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details5Ref = db.collection('details').doc(name).collection('results').doc('5');
            await details5Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details6Ref = db.collection('details').doc(name).collection('results').doc('6');
            await details6Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details7Ref = db.collection('details').doc(name).collection('results').doc('7');
            await details7Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details8Ref = db.collection('details').doc(name).collection('results').doc('8');
            await details8Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details9Ref = db.collection('details').doc(name).collection('results').doc('9');
            await details9Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details10Ref = db.collection('details').doc(name).collection('results').doc('10');
            await details10Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details11Ref = db.collection('details').doc(name).collection('results').doc('11');
            await details11Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details12Ref = db.collection('details').doc(name).collection('results').doc('12');
            await details12Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details13Ref = db.collection('details').doc(name).collection('results').doc('13');
            await details13Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details14Ref = db.collection('details').doc(name).collection('results').doc('14');
            await details14Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details15Ref = db.collection('details').doc(name).collection('results').doc('15');
            await details15Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details16Ref = db.collection('details').doc(name).collection('results').doc('16');
            await details16Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details17Ref = db.collection('details').doc(name).collection('results').doc('17');
            await details17Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details18Ref = db.collection('details').doc(name).collection('results').doc('18');
            await details18Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details19Ref = db.collection('details').doc(name).collection('results').doc('19');
            await details19Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details20Ref = db.collection('details').doc(name).collection('results').doc('20');
            await details20Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details21Ref = db.collection('details').doc(name).collection('results').doc('21');
            await details21Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details22Ref = db.collection('details').doc(name).collection('results').doc('22');
            await details22Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details23Ref = db.collection('details').doc(name).collection('results').doc('23');
            await details23Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details24Ref = db.collection('details').doc(name).collection('results').doc('24');
            await details24Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details25Ref = db.collection('details').doc(name).collection('results').doc('25');
            await details25Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details26Ref = db.collection('details').doc(name).collection('results').doc('26');
            await details26Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details27Ref = db.collection('details').doc(name).collection('results').doc('27');
            await details27Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details28Ref = db.collection('details').doc(name).collection('results').doc('28');
            await details28Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details29Ref = db.collection('details').doc(name).collection('results').doc('29');
            await details29Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details30Ref = db.collection('details').doc(name).collection('results').doc('30');
            await details30Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details31Ref = db.collection('details').doc(name).collection('results').doc('31');
            await details31Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details32Ref = db.collection('details').doc(name).collection('results').doc('32');
            await details32Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details33Ref = db.collection('details').doc(name).collection('results').doc('33');
            await details33Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details34Ref = db.collection('details').doc(name).collection('results').doc('34');
            await details34Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details35Ref = db.collection('details').doc(name).collection('results').doc('35');
            await details35Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details36Ref = db.collection('details').doc(name).collection('results').doc('36');
            await details36Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details37Ref = db.collection('details').doc(name).collection('results').doc('37');
            await details37Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details38Ref = db.collection('details').doc(name).collection('results').doc('38');
            await details38Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details39Ref = db.collection('details').doc(name).collection('results').doc('39');
            await details39Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details40Ref = db.collection('details').doc(name).collection('results').doc('40');
            await details40Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details41Ref = db.collection('details').doc(name).collection('results').doc('41');
            await details41Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details42Ref = db.collection('details').doc(name).collection('results').doc('42');
            await details42Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details43Ref = db.collection('details').doc(name).collection('results').doc('43');
            await details43Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details44Ref = db.collection('details').doc(name).collection('results').doc('44');
            await details44Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details45Ref = db.collection('details').doc(name).collection('results').doc('45');
            await details45Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details46Ref = db.collection('details').doc(name).collection('results').doc('46');
            await details46Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details47Ref = db.collection('details').doc(name).collection('results').doc('47');
            await details47Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details48Ref = db.collection('details').doc(name).collection('results').doc('48');
            await details48Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details49Ref = db.collection('details').doc(name).collection('results').doc('49');
            await details49Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details50Ref = db.collection('details').doc(name).collection('results').doc('50');
            await details50Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details51Ref = db.collection('details').doc(name).collection('results').doc('51');
            await details51Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details52Ref = db.collection('details').doc(name).collection('results').doc('52');
            await details52Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details53Ref = db.collection('details').doc(name).collection('results').doc('53');
            await details53Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details54Ref = db.collection('details').doc(name).collection('results').doc('54');
            await details54Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details55Ref = db.collection('details').doc(name).collection('results').doc('55');
            await details55Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details56Ref = db.collection('details').doc(name).collection('results').doc('56');
            await details56Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details57Ref = db.collection('details').doc(name).collection('results').doc('57');
            await details57Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details58Ref = db.collection('details').doc(name).collection('results').doc('58');
            await details58Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details59Ref = db.collection('details').doc(name).collection('results').doc('59');
            await details59Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details60Ref = db.collection('details').doc(name).collection('results').doc('60');
            await details60Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details61Ref = db.collection('details').doc(name).collection('results').doc('61');
            await details61Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details62Ref = db.collection('details').doc(name).collection('results').doc('62');
            await details62Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details63Ref = db.collection('details').doc(name).collection('results').doc('63');
            await details63Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details64Ref = db.collection('details').doc(name).collection('results').doc('64');
            await details64Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details65Ref = db.collection('details').doc(name).collection('results').doc('65');
            await details65Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details66Ref = db.collection('details').doc(name).collection('results').doc('66');
            await details66Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details67Ref = db.collection('details').doc(name).collection('results').doc('67');
            await details67Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details68Ref = db.collection('details').doc(name).collection('results').doc('68');
            await details68Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details69Ref = db.collection('details').doc(name).collection('results').doc('69');
            await details69Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details70Ref = db.collection('details').doc(name).collection('results').doc('70');
            await details70Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details71Ref = db.collection('details').doc(name).collection('results').doc('71');
            await details71Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details72Ref = db.collection('details').doc(name).collection('results').doc('72');
            await details72Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details73Ref = db.collection('details').doc(name).collection('results').doc('73');
            await details73Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details74Ref = db.collection('details').doc(name).collection('results').doc('74');
            await details74Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details75Ref = db.collection('details').doc(name).collection('results').doc('75');
            await details75Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details76Ref = db.collection('details').doc(name).collection('results').doc('76');
            await details76Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details77Ref = db.collection('details').doc(name).collection('results').doc('77');
            await details77Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details78Ref = db.collection('details').doc(name).collection('results').doc('78');
            await details78Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details79Ref = db.collection('details').doc(name).collection('results').doc('79');
            await details79Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details80Ref = db.collection('details').doc(name).collection('results').doc('80');
            await details80Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details81Ref = db.collection('details').doc(name).collection('results').doc('81');
            await details81Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details82Ref = db.collection('details').doc(name).collection('results').doc('82');
            await details82Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details83Ref = db.collection('details').doc(name).collection('results').doc('83');
            await details83Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details84Ref = db.collection('details').doc(name).collection('results').doc('84');
            await details84Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details85Ref = db.collection('details').doc(name).collection('results').doc('85');
            await details85Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details86Ref = db.collection('details').doc(name).collection('results').doc('86');
            await details86Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details87Ref = db.collection('details').doc(name).collection('results').doc('87');
            await details87Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details88Ref = db.collection('details').doc(name).collection('results').doc('88');
            await details88Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details89Ref = db.collection('details').doc(name).collection('results').doc('89');
            await details89Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details90Ref = db.collection('details').doc(name).collection('results').doc('90');
            await details90Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details91Ref = db.collection('details').doc(name).collection('results').doc('91');
            await details91Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details92Ref = db.collection('details').doc(name).collection('results').doc('92');
            await details92Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details93Ref = db.collection('details').doc(name).collection('results').doc('93');
            await details93Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details94Ref = db.collection('details').doc(name).collection('results').doc('94');
            await details94Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details95Ref = db.collection('details').doc(name).collection('results').doc('95');
            await details95Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details96Ref = db.collection('details').doc(name).collection('results').doc('96');
            await details96Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details97Ref = db.collection('details').doc(name).collection('results').doc('97');
            await details97Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details98Ref = db.collection('details').doc(name).collection('results').doc('98');
            await details98Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details99Ref = db.collection('details').doc(name).collection('results').doc('99');
            await details99Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details100Ref = db.collection('details').doc(name).collection('results').doc('100');
            await details100Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details101Ref = db.collection('details').doc(name).collection('results').doc('101');
            await details101Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details102Ref = db.collection('details').doc(name).collection('results').doc('102');
            await details102Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details103Ref = db.collection('details').doc(name).collection('results').doc('103');
            await details103Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details104Ref = db.collection('details').doc(name).collection('results').doc('104');
            await details104Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details105Ref = db.collection('details').doc(name).collection('results').doc('105');
            await details105Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details106Ref = db.collection('details').doc(name).collection('results').doc('106');
            await details106Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details107Ref = db.collection('details').doc(name).collection('results').doc('107');
            await details107Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details108Ref = db.collection('details').doc(name).collection('results').doc('108');
            await details108Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details109Ref = db.collection('details').doc(name).collection('results').doc('109');
            await details109Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details110Ref = db.collection('details').doc(name).collection('results').doc('110');
            await details110Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details111Ref = db.collection('details').doc(name).collection('results').doc('111');
            await details111Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details112Ref = db.collection('details').doc(name).collection('results').doc('112');
            await details112Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details113Ref = db.collection('details').doc(name).collection('results').doc('113');
            await details113Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details114Ref = db.collection('details').doc(name).collection('results').doc('114');
            await details114Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details115Ref = db.collection('details').doc(name).collection('results').doc('115');
            await details115Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details116Ref = db.collection('details').doc(name).collection('results').doc('116');
            await details116Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details117Ref = db.collection('details').doc(name).collection('results').doc('117');
            await details117Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details118Ref = db.collection('details').doc(name).collection('results').doc('118');
            await details118Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details119Ref = db.collection('details').doc(name).collection('results').doc('119');
            await details119Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details120Ref = db.collection('details').doc(name).collection('results').doc('120');
            await details120Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details121Ref = db.collection('details').doc(name).collection('results').doc('121');
            await details121Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details122Ref = db.collection('details').doc(name).collection('results').doc('122');
            await details122Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details123Ref = db.collection('details').doc(name).collection('results').doc('123');
            await details123Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details124Ref = db.collection('details').doc(name).collection('results').doc('124');
            await details124Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details125Ref = db.collection('details').doc(name).collection('results').doc('125');
            await details125Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details126Ref = db.collection('details').doc(name).collection('results').doc('126');
            await details126Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details127Ref = db.collection('details').doc(name).collection('results').doc('127');
            await details127Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details128Ref = db.collection('details').doc(name).collection('results').doc('128');
            await details128Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details129Ref = db.collection('details').doc(name).collection('results').doc('129');
            await details129Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details130Ref = db.collection('details').doc(name).collection('results').doc('130');
            await details130Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details131Ref = db.collection('details').doc(name).collection('results').doc('131');
            await details131Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details132Ref = db.collection('details').doc(name).collection('results').doc('132');
            await details132Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details133Ref = db.collection('details').doc(name).collection('results').doc('133');
            await details133Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details134Ref = db.collection('details').doc(name).collection('results').doc('134');
            await details134Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details135Ref = db.collection('details').doc(name).collection('results').doc('135');
            await details135Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details136Ref = db.collection('details').doc(name).collection('results').doc('136');
            await details136Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details137Ref = db.collection('details').doc(name).collection('results').doc('137');
            await details137Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details138Ref = db.collection('details').doc(name).collection('results').doc('138');
            await details138Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details139Ref = db.collection('details').doc(name).collection('results').doc('139');
            await details139Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details140Ref = db.collection('details').doc(name).collection('results').doc('140');
            await details140Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details141Ref = db.collection('details').doc(name).collection('results').doc('141');
            await details141Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details142Ref = db.collection('details').doc(name).collection('results').doc('142');
            await details142Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details143Ref = db.collection('details').doc(name).collection('results').doc('143');
            await details143Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details144Ref = db.collection('details').doc(name).collection('results').doc('144');
            await details144Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details145Ref = db.collection('details').doc(name).collection('results').doc('145');
            await details145Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details146Ref = db.collection('details').doc(name).collection('results').doc('146');
            await details146Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details147Ref = db.collection('details').doc(name).collection('results').doc('147');
            await details147Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details148Ref = db.collection('details').doc(name).collection('results').doc('148');
            await details148Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details149Ref = db.collection('details').doc(name).collection('results').doc('149');
            await details149Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details150Ref = db.collection('details').doc(name).collection('results').doc('150');
            await details150Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details151Ref = db.collection('details').doc(name).collection('results').doc('151');
            await details151Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details152Ref = db.collection('details').doc(name).collection('results').doc('152');
            await details152Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details153Ref = db.collection('details').doc(name).collection('results').doc('153');
            await details153Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details154Ref = db.collection('details').doc(name).collection('results').doc('154');
            await details154Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details155Ref = db.collection('details').doc(name).collection('results').doc('155');
            await details155Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details156Ref = db.collection('details').doc(name).collection('results').doc('156');
            await details156Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details157Ref = db.collection('details').doc(name).collection('results').doc('157');
            await details157Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details158Ref = db.collection('details').doc(name).collection('results').doc('158');
            await details158Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details159Ref = db.collection('details').doc(name).collection('results').doc('159');
            await details159Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details160Ref = db.collection('details').doc(name).collection('results').doc('160');
            await details160Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details161Ref = db.collection('details').doc(name).collection('results').doc('161');
            await details161Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details162Ref = db.collection('details').doc(name).collection('results').doc('162');
            await details162Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details163Ref = db.collection('details').doc(name).collection('results').doc('163');
            await details163Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details164Ref = db.collection('details').doc(name).collection('results').doc('164');
            await details164Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details165Ref = db.collection('details').doc(name).collection('results').doc('165');
            await details165Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details166Ref = db.collection('details').doc(name).collection('results').doc('166');
            await details166Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details167Ref = db.collection('details').doc(name).collection('results').doc('167');
            await details167Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details168Ref = db.collection('details').doc(name).collection('results').doc('168');
            await details168Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details169Ref = db.collection('details').doc(name).collection('results').doc('169');
            await details169Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details170Ref = db.collection('details').doc(name).collection('results').doc('170');
            await details170Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details171Ref = db.collection('details').doc(name).collection('results').doc('171');
            await details171Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details172Ref = db.collection('details').doc(name).collection('results').doc('172');
            await details172Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details173Ref = db.collection('details').doc(name).collection('results').doc('173');
            await details173Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details174Ref = db.collection('details').doc(name).collection('results').doc('174');
            await details174Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details175Ref = db.collection('details').doc(name).collection('results').doc('175');
            await details175Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details176Ref = db.collection('details').doc(name).collection('results').doc('176');
            await details176Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details177Ref = db.collection('details').doc(name).collection('results').doc('177');
            await details177Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details178Ref = db.collection('details').doc(name).collection('results').doc('178');
            await details178Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details179Ref = db.collection('details').doc(name).collection('results').doc('179');
            await details179Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details180Ref = db.collection('details').doc(name).collection('results').doc('180');
            await details180Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details181Ref = db.collection('details').doc(name).collection('results').doc('181');
            await details181Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details182Ref = db.collection('details').doc(name).collection('results').doc('182');
            await details182Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details183Ref = db.collection('details').doc(name).collection('results').doc('183');
            await details183Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details184Ref = db.collection('details').doc(name).collection('results').doc('184');
            await details184Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details185Ref = db.collection('details').doc(name).collection('results').doc('185');
            await details185Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details186Ref = db.collection('details').doc(name).collection('results').doc('186');
            await details186Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details187Ref = db.collection('details').doc(name).collection('results').doc('187');
            await details187Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details188Ref = db.collection('details').doc(name).collection('results').doc('188');
            await details188Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details189Ref = db.collection('details').doc(name).collection('results').doc('189');
            await details189Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details190Ref = db.collection('details').doc(name).collection('results').doc('190');
            await details190Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details191Ref = db.collection('details').doc(name).collection('results').doc('191');
            await details191Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details192Ref = db.collection('details').doc(name).collection('results').doc('192');
            await details192Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details193Ref = db.collection('details').doc(name).collection('results').doc('193');
            await details193Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details194Ref = db.collection('details').doc(name).collection('results').doc('194');
            await details194Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details195Ref = db.collection('details').doc(name).collection('results').doc('195');
            await details195Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details196Ref = db.collection('details').doc(name).collection('results').doc('196');
            await details196Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details197Ref = db.collection('details').doc(name).collection('results').doc('197');
            await details197Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details198Ref = db.collection('details').doc(name).collection('results').doc('198');
            await details198Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details199Ref = db.collection('details').doc(name).collection('results').doc('199');
            await details199Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})
            const details200Ref = db.collection('details').doc(name).collection('results').doc('200');
            await details200Ref.set({ acheive: "", memo: "", favorite: false, makeDay: new Date('2019-02-08 00:00:00')})


    }
}

}