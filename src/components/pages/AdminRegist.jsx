import React from "react";
import { useDispatch } from "react-redux";
import { UpdateButton } from "../atoms/button/UpdateButton";
import { TransitionButton } from "../atoms/button/TransitionButton";
import { push } from "connected-react-router";
import { wazaRegist } from "../../reducks/wazas/operations";
import { useSelector } from "react-redux";
import { getRole } from "../../reducks/users/selectors";
import { Grid } from "@material-ui/core";

export const AdminRegist = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const role = getRole(selector);

  if (role !== "admin") {
    return <div className="center">管理者ログインしてください</div>;
  }
  return (
    <>
      <Grid item xs={12} sm={8}>
        <div className="red-text">・全ての技を登録します。よろしいでしょうか？</div>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TransitionButton onClick={() => dispatch(push("/adminMenu"))} label="戻る" />
        <UpdateButton onClick={() => dispatch(wazaRegist())} />
      </Grid>
    </>
  );
};
