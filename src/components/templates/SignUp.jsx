import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../reducks/wazas/operations";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { NameInput } from "../atoms/NameInput";
import { PasswordInput } from "../atoms/PasswordInput";
import { LoginButton } from "../atoms/LoginButton";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

export const SignUp = () => {
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
    <Container maxWidth="sm" spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <h1>新規ユーザー登録画面</h1>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div className="red-text">・ニックネームとパスワードを入力してください（今後ログインに使用します）</div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <NameInput name={name} onChange={nameChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <PasswordInput placeholder={"パスワード"} name={password} onChange={passwordChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LoginButton label="登録・kendamastart" onClick={() => dispatch(signUp(name, password))} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Link component={RouterLink} to="/">
            ログイン画面に進む
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
