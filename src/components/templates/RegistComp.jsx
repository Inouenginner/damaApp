import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { BackButton } from "../atoms/BackButton";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  text: {
    borderRadius: "4px",
    color: "red",
    fontSize: "20px",
    fontWeight: "500",
  },
}));

export const RegistComp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const backToAdminHome = useCallback(() => {
    dispatch(push("/adminMenu"));
    //eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="sm" spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <div className={classes.text}>最初の技登録が完了しました</div>
          <BackButton onClick={backToAdminHome} label="戻る" />
        </Grid>
      </Grid>
    </Container>
  );
};
