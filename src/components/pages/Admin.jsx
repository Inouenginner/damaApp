import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { adLogin } from "../../reducks/users/operations";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { NameInput } from "../atoms/input/NameInput";
import { PasswordInput } from "../atoms/input/PasswordInput";
import { LoginButton } from "../atoms/button/LoginButton";
import { LoginContent } from "../organisms/LoginContent";

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
        <LoginContent
          title="管理者ログイン画面"
          message="・管理者ログインしてください"
          transitionLabel="管理者ログインする"
          transitionMove="() => dispatch(adLogin(name, password))"
          haveLink="false"
        />
      </Grid>
    </Container>
  );
};
