import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sortSelect: {
    width: "300px",
    marginLeft: "60%",
  },
}));

export const SortSelectBox = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl className={classes.sortSelect} dense="normal">
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
    </FormControl>
  );
};
