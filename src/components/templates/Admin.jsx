import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { adLogin } from "../../reducks/wazas/operations";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { NameInput } from "../atoms/NameInput";
import { LoginButton } from "../atoms/LoginButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    borderRadius: "4px",
    color: "red",
    fontSize: "20px",
    fontWeight: "500",
  },
}));

export const Admin = () => {
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
  const adminLogin = useCallback((name, password) => {
    dispatch(adLogin(name, password));
    //eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="sm" spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <div className={classes.text}>
            ・ニックネームとパスワードを入力してください
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <NameInput placeholder={"名前"} name={name} onChange={nameChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <NameInput
            placeholder={"パスワード"}
            name={password}
            onChange={passwordChange}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LoginButton onClick={() => adminLogin(name, password)} />
        </Grid>
      </Grid>
    </Container>
  );
};
