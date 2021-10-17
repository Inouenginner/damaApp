import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { adLogin } from "../../reducks/users/operations";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { NameInput } from "../atoms/input/NameInput";
import { PasswordInput } from "../atoms/input/PasswordInput";
import { LoginButton } from "../atoms/button/LoginButton";

export const Admin = () => {
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
          <div className="red-text">管理者画面</div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <NameInput name={name} onChange={nameChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <PasswordInput name={password} onChange={passwordChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LoginButton label="管理者ログイン" onClick={() => dispatch(adLogin(name, password))} />
        </Grid>
      </Grid>
    </Container>
  );
};
