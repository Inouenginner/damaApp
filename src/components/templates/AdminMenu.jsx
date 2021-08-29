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

export const AdminMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const goToWazaRegist = useCallback(() => {
    dispatch(push("/adminRegist"));
    //eslint-disable-next-line
  }, []);
  const goToWazaAdd = useCallback(() => {
    dispatch(push("/adminAdd"));
    //eslint-disable-next-line
  }, []);
  const goToWazaEdit = useCallback(() => {
    dispatch(push("/adminEdit"));
    //eslint-disable-next-line
  }, []);
  const adminLogout = useCallback(() => {
    dispatch(push("/admin"));
    //eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="sm" spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <div className={classes.text}>管理者画面</div>
          <BackButton onClick={goToWazaRegist} label="技登録へ進む" />
          <BackButton onClick={goToWazaAdd} label="技追加へ進む" />
          <BackButton onClick={goToWazaEdit} label="技編集へ進む" />
          <BackButton onClick={adminLogout} label="ログアウト" />
        </Grid>
      </Grid>
    </Container>
  );
};
