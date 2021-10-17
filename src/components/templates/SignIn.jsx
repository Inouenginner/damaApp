import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../reducks/wazas/operations";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { NameInput } from "../atoms/NameInput";
import { PasswordInput } from "../atoms/PasswordInput";
import { LoginButton } from "../atoms/LoginButton";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  text: {
    borderRadius: "4px",
    color: "red",
    fontSize: "20px",
    fontWeight: "500",
  },
}));

export const SignIn = () => {
  const classes = useStyles();
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
          <h1>ログイン画面</h1>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div className={classes.text}>・登録したニックネームとパスワードを入力してください</div>
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
      </Grid>
    </Container>
  );
};
