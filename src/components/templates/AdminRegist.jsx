import React from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
// import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import { UpdateButton } from "../atoms/UpdateButton";
import { BackButton } from "../atoms/BackButton";
import { push } from "connected-react-router";
import { wazaRegist } from "../../reducks/wazas/operations";
import { useSelector } from "react-redux";
import { getRole } from "../../reducks/users/selectors";

export const AdminRegist = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const role = getRole(selector);

  if (role !== "admin") {
    return <div>管理者ログインしてください</div>;
  }
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Grid item xs={12}>
          <BackButton
            onClick={() => dispatch(push("/adminMenu"))}
            label="戻る"
          />
          <UpdateButton onClick={() => dispatch(wazaRegist())} />
        </Grid>
      </Container>
    </React.Fragment>
  );
};
