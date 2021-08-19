import React from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { useLocation } from "react-router";
import { getWazas } from "../../reducks/wazas/selectors";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";

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

export const AchieveSelectBox = (props) => {
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
      defaultValue={props.defaultValue}
      onChange={props.onChange}
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
