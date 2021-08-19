import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../reducks/wazas/operations";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { push } from "connected-react-router";
import { NameInput } from "../atoms/NameInput";
import { LoginButton } from "../atoms/LoginButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    borderRadius: "4px",
    color: "#eee",
    fontSize: "14px",
    fontWeight: "500",
  },
}));

export const Top = () => {
  const classes = useStyles();
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
          <div className={classes.text}>ニックネームを入力してください</div>
        </Grid>
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
