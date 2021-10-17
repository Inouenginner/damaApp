import React from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { TransitionButton } from "../atoms/button/TransitionButton";
import { push } from "connected-react-router";
import { useSelector } from "react-redux";
import { getRole } from "../../reducks/users/selectors";

export const AdminRegistComp = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const role = getRole(selector);

  if (role !== "admin") {
    return <div className="center">管理者ログインしてください</div>;
  }
  return (
    <Grid item xs={12} sm={8}>
      <div className="red-text">最初の技登録が完了しました</div>
      <TransitionButton onClick={() => dispatch(push("/adminMenu"))} label="戻る" />
    </Grid>
  );
};
