import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
// import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import { UpdateButton } from "../atoms/UpdateButton";
import { BackButton } from "../atoms/BackButton";
import { push } from "connected-react-router";
import { wazaRegist } from "../../reducks/wazas/operations";

export const AdminRegist = () => {
  const dispatch = useDispatch();

  const backToAdminHome = useCallback(() => {
    dispatch(push("/adminMenu"));
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Grid item xs={12}>
          <BackButton onClick={backToAdminHome} label="戻る" />
          <UpdateButton onClick={() => dispatch(wazaRegist())} />
        </Grid>
      </Container>
    </React.Fragment>
  );
};
