import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { useLocation } from "react-router";
import { getWazas } from "../../reducks/wazas/selectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
// import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { UpdateDetail } from "../../reducks/wazas/operations";

const levels = [
  {
    value: "0",
    label: "できない",
  },
  {
    value: "1",
    label: "一回できた",
  },
  {
    value: "2",
    label: "5回くらいできた",
  },
  {
    value: "3",
    label: "半分の確率でできる",
  },
  {
    value: "4",
    label: "ほぼできる",
  },
  {
    value: "5",
    label: "完璧",
  },
];

export const AchieveSelectBox = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/detail/")[1];
  const selector = useSelector((state) => state);
  let wazaList = getWazas(selector);
  let userId = getUserId(selector);
  const targetWaza = wazaList[id - 1];
  const isFavorite = targetWaza.favorite === true;

  return (
    <TextField
      id="standard-select-currency"
      name="achieve"
      required
      fullWidth
      select
      label="達成度"
      defaultValue={targetWaza.achieve}
      onChange={achieveChange}
      helperText="達成度を入力してください"
    >
      {levels.map((level) => (
        <MenuItem key={level.value} value={level.value}>
          {level.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
