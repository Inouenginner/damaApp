import React from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { UpdateButton } from "../atoms/button/UpdateButton";
import { TransitionButton } from "../atoms/button/TransitionButton";
import { push } from "connected-react-router";
import { wazaRegist } from "../../reducks/wazas/operations";
import { useSelector } from "react-redux";
import { getRole } from "../../reducks/users/selectors";

export const AdminRegist = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const role = getRole(selector);

  if (role !== "admin") {
    return <div className="center">管理者ログインしてください</div>;
  }
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Grid item xs={12}>
          <TransitionButton onClick={() => dispatch(push("/adminMenu"))} label="戻る" />
          <UpdateButton onClick={() => dispatch(wazaRegist())} />
        </Grid>
      </Container>
    </React.Fragment>
  );
};
