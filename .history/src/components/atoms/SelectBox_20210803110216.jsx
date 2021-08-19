import React, { useState } from "react";
import BoxSx from "../molecules/BoxSx";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const Record = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <InputLabel id="demo-simple-select-label">並び替え</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filter}
        onChange={handleChange}
      >
        <MenuItem value={10}>番号順</MenuItem>
        <MenuItem value={20}>難易度順</MenuItem>
        <MenuItem value={30}>難易度１</MenuItem>
      </Select>
    </>
  );
};
