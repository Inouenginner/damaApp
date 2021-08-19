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
    value: "10",
    label: "番号順（昇）",
  },
  {
    value: "20",
    label: "番号順（降）",
  },
  {
    value: "30",
    label: "難易度順（昇）",
  },
  {
    value: "40",
    label: "難易度順（降）",
  },
  {
    value: "50",
    label: "難易度１",
  },
  {
    value: "60",
    label: "難易度２",
  },
  {
    value: "70",
    label: "難易度３",
  },
  {
    value: "80",
    label: "難易度４",
  },
  {
    value: "90",
    label: "難易度５",
  },
  {
    value: "100",
    label: "達成度（昇）",
  },
  {
    value: "110",
    label: "達成度（降）",
  },
  {
    value: "120",
    label: "達成度１",
  },
  {
    value: "130",
    label: "達成度２",
  },
  {
    value: "140",
    label: "達成度３",
  },
  {
    value: "150",
    label: "達成度４",
  },
  {
    value: "160",
    label: "達成度５",
  },
  {
    value: "170",
    label: "お気に入り",
  },
  {
    value: "180",
    label: "メモあり",
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
        {levels.map((level) => (
          <MenuItem key={level.value} value={level.value}>
            {level.label}
          </MenuItem>
        ))}
        <MenuItem value={"10"}>番号順</MenuItem>
        <MenuItem value={"20"}>難易度順</MenuItem>
        <MenuItem value={"30"}>難易度１</MenuItem>
      </Select>
    </FormControl>
  );
};
