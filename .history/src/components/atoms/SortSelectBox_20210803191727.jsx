import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sortSelect: {
    width: "200px",
    marginLeft: "70%",
  },
}));

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

export const SortSelectBox = (props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.sortSelect} dense="normal">
      <InputLabel id="demo-simple-select-label">並び替え</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        onChange={props.onChange}
      >
        <MenuItem value={"10"}>番号順</MenuItem>
        <MenuItem value={"20"}>難易度順</MenuItem>
        <MenuItem value={"30"}>難易度１</MenuItem>
      </Select>
    </FormControl>
  );
};
