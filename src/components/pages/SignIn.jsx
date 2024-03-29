import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../reducks/wazas/operations";
import Grid from "@material-ui/core/Grid";
import { NameInput } from "../atoms/input/NameInput";
import { PasswordInput } from "../atoms/input/PasswordInput";
import { LoginButton } from "../atoms/button/LoginButton";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

export const SignIn = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const nameChange = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const [password, setPassword] = useState("");
  const passwordChange = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <>
      <Grid item xs={12} sm={8}>
        <h1>ログイン画面</h1>
      </Grid>
      <Grid item xs={12} sm={8}>
        <div className="red-text">・登録したニックネームとパスワードを入力してください</div>
      </Grid>
      <Grid item xs={12} sm={8}>
        <NameInput name={name} onChange={nameChange} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <PasswordInput placeholder={"パスワード"} name={password} onChange={passwordChange} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <LoginButton label="kendamastart" onClick={() => dispatch(login(name, password))} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Link component={RouterLink} to="/signup">
          新規登録に進む
        </Link>
      </Grid>
    </>
  );
};
