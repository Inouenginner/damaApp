import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sortSelect: {
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      position: "absolute",
      top: "67px",
      right: "0px",
    },
    width: "200px",
    position: "absolute",
    top: "67px",
    right: "0px",
  },
}));

const options = [
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
    label: "達成度：できない",
  },
  {
    value: "130",
    label: "達成度：1回できた",
  },
  {
    value: "140",
    label: "達成度：5回くらいできた",
  },
  {
    value: "150",
    label: "達成度：半分の確率でできる",
  },
  {
    value: "160",
    label: "達成度：ほぼできる",
  },
  {
    value: "170",
    label: "達成度：完璧",
  },
  {
    value: "180",
    label: "お気に入り",
  },
  {
    value: "190",
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
        onChange={(event) => props.select(event.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
