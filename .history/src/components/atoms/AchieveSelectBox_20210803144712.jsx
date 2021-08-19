import React from "react";
import TextField from "@material-ui/core/TextField";
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
        <MenuItem key={level.value} value={level.value} classes={level.class}>
          {level.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
