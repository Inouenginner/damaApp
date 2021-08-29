import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
// import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import { NameInput } from "../atoms/NameInput";
import { UpdateButton } from "../atoms/UpdateButton";
import { BackButton } from "../atoms/BackButton";
import { push } from "connected-react-router";
import { editWaza } from "../../reducks/wazas/operations";

export const AdminEdit = () => {
  const dispatch = useDispatch();
  const [wazaId, setWazaId] = useState("");
  const idChange = useCallback(
    (event) => {
      setWazaId(event.target.value);
    },
    [setWazaId]
  );
  const [wazaName, setWazaName] = useState("");
  const nameChange = useCallback(
    (event) => {
      setWazaName(event.target.value);
    },
    [setWazaName]
  );
  const [wazaLevel, setWazaLevel] = useState("");
  const levelChange = useCallback(
    (event) => {
      setWazaLevel(event.target.value);
    },
    [setWazaLevel]
  );
  const [wazaUrl, setWazaUrl] = useState("");
  const urlChange = useCallback(
    (event) => {
      setWazaUrl(event.target.value);
    },
    [setWazaUrl]
  );

  const backToAdminHome = useCallback(() => {
    dispatch(push("/adminMenu"));
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <div>編集する技の各項目を入力してください</div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NameInput
              placeholder={"技のID"}
              name={wazaId}
              onChange={idChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NameInput
              placeholder={"技の名前"}
              name={wazaName}
              onChange={nameChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NameInput
              placeholder={"技のレベル"}
              name={wazaLevel}
              onChange={levelChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NameInput
              placeholder={"技のURL"}
              name={wazaUrl}
              onChange={urlChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <BackButton onClick={backToAdminHome} label="戻る" />
          <UpdateButton
            onClick={() =>
              dispatch(editWaza(wazaId, wazaName, wazaLevel, wazaUrl))
            }
          />
        </Grid>
      </Container>
    </React.Fragment>
  );
};
