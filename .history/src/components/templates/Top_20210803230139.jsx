import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../reducks/wazas/operations";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { push } from "connected-react-router";
import { NameInput } from "../atoms/NameInput";
import { LoginButton } from "../atoms/LoginButton";

export const Top = () => {
  const dispatch = useDispatch();

  const goRecord = useCallback((name) => {
    dispatch(signIn(name));
    //eslint-disable-next-line
  }, []);

  const [name, setName] = useState("");

  //関数のメモ化
  const nameChange = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  return (
    <Container maxWidth="sm" spacing={6}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <NameInput name={name} onChange={nameChange} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LoginButton onClick={() => goRecord(name)} />
        </Grid>
      </Grid>
    </Container>
  );
};
