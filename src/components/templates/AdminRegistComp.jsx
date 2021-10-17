import React from "react";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { TransitionButton } from "../atoms/TransitionButton";
import { push } from "connected-react-router";
import { useSelector } from "react-redux";
import { getRole } from "../../reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  text: {
    borderRadius: "4px",
    color: "red",
    fontSize: "20px",
    fontWeight: "500",
  },
}));

export const AdminRegistComp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const role = getRole(selector);

  if (role !== "admin") {
    return <div>管理者ログインしてください</div>;
  }
  return (
    <Container maxWidth="sm" spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <div className={classes.text}>最初の技登録が完了しました</div>
          <TransitionButton onClick={() => dispatch(push("/adminMenu"))} label="戻る" />
        </Grid>
      </Grid>
    </Container>
  );
};
