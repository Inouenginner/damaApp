import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
// import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import { NameInput } from "../atoms/NameInput";
import { UpdateButton } from "../atoms/UpdateButton";
import { BackButton } from "../atoms/BackButton";
import { push } from "connected-react-router";
import { addWaza } from "../../reducks/wazas/operations";
import { useSelector } from "react-redux";
import { getRole } from "../../reducks/users/selectors";

export const AdminAdd = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const role = getRole(selector);
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

  if (role !== "admin") {
    return <div>管理者ログインしてください</div>;
  }
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <div>追加する技の各項目を入力してください</div>
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
          <BackButton
            onClick={() => dispatch(push("/adminMenu"))}
            label="戻る"
          />
          <UpdateButton
            onClick={() =>
              dispatch(addWaza(wazaId, wazaName, wazaLevel, wazaUrl))
            }
          />
        </Grid>
      </Container>
    </React.Fragment>
  );
};
