import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { signIn } from "../../reducks/wazas/operations";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { push } from "connected-react-router";
import { NameInput } from "../atoms/NameInput";

export const Top = () => {
  const dispatch = useDispatch();

  const goRecord = useCallback((name) => {
    dispatch(signIn(name));
    dispatch(push("/record"));
    //eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="sm" spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <NameInput />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => goRecord(name)}
          >
            kendamastart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
