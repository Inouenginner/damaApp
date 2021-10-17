import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { UpdateButton } from "../atoms/UpdateButton";
import { TransitionButton } from "../atoms/TransitionButton";
import { push } from "connected-react-router";
import { editWaza } from "../../reducks/wazas/operations";
import { useSelector } from "react-redux";
import { getRole } from "../../reducks/users/selectors";

export const AdminEdit = () => {
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

  const wazas = [
    { placeholder: "技のID", name: wazaId, onChange: idChange },
    { placeholder: "技の名前", name: wazaName, onChange: nameChange },
    { placeholder: "技のレベル", name: wazaLevel, onChange: levelChange },
    { placeholder: "技のURL", name: wazaUrl, onChange: urlChange },
  ];

  if (role !== "admin") {
    return <div>管理者ログインしてください</div>;
  }
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <div>編集する技の各項目を入力してください</div>
        {wazas.map((waza) => (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField variant="outlined" placeholder={waza.placeholder} name={waza.name} onChange={waza.onChange} />
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <TransitionButton onClick={() => dispatch(push("/adminMenu"))} label="戻る" />
          <UpdateButton onClick={() => dispatch(editWaza(wazaId, wazaName, wazaLevel, wazaUrl))} />
        </Grid>
      </Container>
    </React.Fragment>
  );
};
