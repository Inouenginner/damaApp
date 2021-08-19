import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { signIn } from "../../reducks/wazas/operations";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { push } from "connected-react-router";

export const Top = () => {
  const dispatch = useDispatch();

  const goRecord = useCallback((name) => {
    dispatch(signIn(name));
    dispatch(push("/record"));
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
    <Container maxWidth="sm" spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <TextField
            id="memo"
            name="memo"
            label="名前"
            autoComplete="shipping address-line1"
            value={name}
            onChange={nameChange}
            variant="outlined"
          />
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
