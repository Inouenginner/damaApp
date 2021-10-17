import React from "react";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { TransitionButton } from "../atoms/TransitionButton";
import { push } from "connected-react-router";
import { adminSignOut } from "../../reducks/users/operations";
import { useSelector } from "react-redux";
import { getRole } from "../../reducks/users/selectors";

export const AdminMenu = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const role = getRole(selector);

  if (role !== "admin") {
    return <div className="center">管理者ログインしてください</div>;
  }
  return (
    <Container maxWidth="sm" spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <div className="red-text">管理者画面</div>
          <TransitionButton onClick={() => dispatch(push("/adminRegist"))} label="技登録へ進む" />
          <TransitionButton onClick={() => dispatch(push("/adminAdd"))} label="技追加へ進む" />
          <TransitionButton onClick={() => dispatch(push("/adminEdit"))} label="技編集へ進む" />
          <TransitionButton onClick={() => dispatch(adminSignOut())} label="ログアウト" />
        </Grid>
      </Grid>
    </Container>
  );
};
