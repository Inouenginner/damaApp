import { fetchWazasAction, uploadWazaInfo } from "./actions";
import { initUserAction } from "../users/actions";
import { db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";
import axios from "axios";
import sha512 from "js-sha512";
import { wazaSum, nameMaxLength, passwordMaxLength, localDbJsonPath } from "../../constants/common";

//技系のoperations(ユーザーの処理も行うことがある)
//コレクション参照の定数化
const wazaRef = db.collection("wazas");
const userRef = db.collection("users");

//管理者画面からの技追加登録
//editと共通化できそう
export const addWaza = (wazaId, wazaName, wazaLevel, wazaUrl) => {
  return async (dispatch) => {
    //valid
    if (wazaId === "" || wazaName === "" || wazaLevel === "" || wazaUrl === "") {
      alert("必須項目が未入力です");
      return false;
    }
    let batch = db.batch();
    const newWazaRef = wazaRef.doc(wazaId.toString());
    batch.set(newWazaRef, {
      favoriteSum: 0,
      id: wazaId.toString(),
      level: wazaLevel,
      makeSum: 0,
      url: wazaUrl,
      waza: wazaName,
    });
    // バッチ処理の完了
    await batch.commit();
    dispatch(push("/addComp"));
  };
};

//管理者画面からの技編集
export const editWaza = (wazaId, wazaName, wazaLevel, wazaUrl) => {
  return async (dispatch) => {
    //valid
    if (wazaId === "" || wazaName === "" || wazaLevel === "" || wazaUrl === "") {
      alert("必須項目が未入力です");
      return false;
    }
    let batch = db.batch();
    const updateWazaRef = wazaRef.doc(wazaId.toString());
    batch.set(updateWazaRef, {
      favoriteSum: 0,
      id: wazaId.toString(),
      level: wazaLevel,
      makeSum: 0,
      url: wazaUrl,
      waza: wazaName,
    });
    // バッチ処理の完了
    await batch.commit();
    dispatch(push("/editComp"));
  };
};

//管理者画面からの技の登録（アプリリリース時に一度読み込むイメージ,ローカルでdb.jsonの立ち上げ必要）
export const wazaRegist = () => {
  return async (dispatch) => {
    let wazas;
    await axios.get(localDbJsonPath).then((res) => {
      wazas = res.data;
    });
    let batch = db.batch();
    // 技データベースの初期設定
    wazas.forEach(function (waza, index) {
      let wazaEachRef = wazaRef.doc((index + 1).toString());
      batch.set(wazaEachRef, {
        id: waza["id"],
        waza: waza["waza"],
        favoiteSum: waza["favoriteSum"],
        level: waza["level"],
        makeSum: waza["makeSum"],
        url: waza["url"],
      });
    });
    // バッチ処理の完了を宣言
    await batch.commit();
    dispatch(push("/registComp"));
  };
};

//ユーザー登録時
export const signUp = (name, password) => {
  return async (dispatch) => {
    let sameIdUserData;
    let maxId;
    let userId;
    const hashPass = sha512(password);
    //valid
    if (name === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    } else if (name.length > nameMaxLength) {
      alert("ログイン名が長いです");
      return false;
    } else if (password.length > passwordMaxLength) {
      alert("パスワードが長いです");
      return false;
    }
    //ログインしたユーザ情報の取得
    await userRef
      .where("name", "==", name)
      .where("password", "==", hashPass)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          sameIdUserData = doc.data();
        });
      });
    //すでに登録されたユーザ情報があるのならばidの取得
    if (sameIdUserData != null) {
      alert("同じ名前のユーザがいるので他の名前にしてください！");
      return false;
    } else {
      //登録するidの採番
      await userRef
        .orderBy("id", "desc")
        .limit(1)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            const data = doc.data();
            maxId = data["id"];
          });
        });
      if (Number(maxId) > 0) {
        console.log("add new user");
        userId = Number(maxId) + 1;
      } else {
        console.log("add first user");
        userId = 1;
      }

      //ユーザ情報のDB登録
      const timestamp = FirebaseTimestamp.now();
      let batch = db.batch();
      const userStandardRef = userRef.doc(userId.toString());
      batch.set(userStandardRef, {
        id: userId,
        password: hashPass,
        name: name,
        registerDate: timestamp,
        role: "user",
      });
      // ユーザごとの各技達成度等詳細DB登録（処理速度最速while文使用）
      let index = 1;
      while (index <= wazaSum) {
        let detailsEachRef = userRef
          .doc(userId.toString())
          .collection("results")
          .doc(index.toString());
        batch.set(detailsEachRef, {
          id: index,
          achieve: 0,
          memo: "",
          favorite: false,
          makeDay: timestamp,
        });
        index++;
      }
      // バッチ処理の完了
      await batch.commit();
    }

    // 技のstate更新(技の基本情報と達成度の詳細情報を連結した上で)
    let userWazaList = [];
    let joinedList = [];
    console.log("id:" + userId);
    const wazasDoc = await wazaRef.doc(userId.toString()).get();
    const wazasDocsOrderById = await wazaRef.orderBy("id", "asc").get();
    wazasDocsOrderById.forEach((wazasDocOrderById) => {
      if (wazasDoc.exists) {
        userWazaList.push(wazasDocOrderById.data());
      } else {
        console.log("ユーザーに紐づく技情報がありません");
      }
    });
    //登録時、detailの情報は初期値（ただ処理はログイン時と揃えてる）
    const detailsRef = userRef.doc(userId.toString()).collection("results");
    const detailsDocsOrderById = await detailsRef.orderBy("id", "asc").get();
    detailsDocsOrderById.forEach((detailsDocOrderById) => {
      if (detailsDocOrderById.exists) {
        joinedList.push(
          Object.assign(
            userWazaList[detailsDocOrderById.data()["id"] - 1],
            detailsDocOrderById.data()
          )
        );
      }
    });
    dispatch(fetchWazasAction(userWazaList));

    // ユーザーのstate更新
    const userData = {
      uid: userId,
      username: name,
      isSignedIn: true,
      isLoading: false,
      role: "user",
    };
    dispatch(initUserAction(userData));
    dispatch(push("/record"));
  };
};

//ユーザー各技進捗更新時
export const updateDetail = (achieve, memo, favorite, wazaId, userId, moveTo) => {
  return async (dispatch, getState) => {
    console.log("update starting");
    const timestamp = FirebaseTimestamp.now();
    //DBへの登録
    const detailsRef = userRef.doc(userId.toString()).collection("results").doc(wazaId);
    await detailsRef.update({
      achieve: Number(achieve),
      memo: memo,
      favorite: favorite,
      makeDay: timestamp,
    });
    //stateの更新（id指定しての更新)
    const nextDetails = getState().wazas.list;
    nextDetails[wazaId - 1]["achieve"] = Number(achieve);
    nextDetails[wazaId - 1]["memo"] = memo;
    nextDetails[wazaId - 1]["favorite"] = favorite;
    nextDetails[wazaId - 1]["makeDay"] = timestamp;
    dispatch(uploadWazaInfo(nextDetails));
    dispatch(push(moveTo));
  };
};

//ユーザーログイン
export const login = (name, password) => {
  return async (dispatch) => {
    let sameIdUserData;
    let userId;
    //valid
    if (name === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    } else if (name.length > nameMaxLength) {
      alert("ログイン名が長いです");
      return false;
    } else if (password.length > passwordMaxLength) {
      alert("パスワードが長いです");
      return false;
    }
    //パスワードのハッシュ化
    const hashPass = sha512(password);
    //ログインしたユーザ情報の取得
    await userRef
      .where("name", "==", name)
      .where("password", "==", hashPass)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          sameIdUserData = doc.data();
        });
      });
    //すでに登録されたユーザ情報があるのならばidの取得
    if (sameIdUserData != null) {
      userId = sameIdUserData["id"];
      console.log("already exist user");
    } else {
      alert("ログイン情報が間違っています");
      return false;
    }

    // 技のstate取得(技の基本情報と達成度の詳細情報を連結した上で)
    let userWazaList = [];
    console.log("id:" + userId);
    const wazasDoc = await wazaRef.doc(userId.toString()).get();
    const wazasDocsOrderById = await wazaRef.orderBy("id", "asc").get();
    wazasDocsOrderById.forEach((wazasDocOrderById) => {
      if (wazasDoc.exists) {
        userWazaList.push(wazasDocOrderById.data());
      } else {
        console.log("No such document!");
      }
    });
    const detailsRef = userRef.doc(userId.toString()).collection("results");
    const detailsDocsOrderById = await detailsRef.orderBy("id", "asc").get();
    detailsDocsOrderById.forEach((detailsDocOrderById) => {
      if (detailsDocOrderById.exists) {
        Object.assign(
          userWazaList[detailsDocOrderById.data()["id"] - 1],
          detailsDocOrderById.data()
        );
      }
    });
    dispatch(fetchWazasAction(userWazaList));

    // ユーザーのstate更新
    const userData = {
      uid: userId,
      username: name,
      isSignedIn: true,
      isLoading: false,
      role: "user",
    };
    dispatch(initUserAction(userData));
    dispatch(push("/record"));
  };
};
