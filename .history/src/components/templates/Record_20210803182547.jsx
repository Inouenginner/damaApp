import React, { useState } from "react";
import BoxSx from "../molecules/BoxSx";
import { SortSelectBox } from "../atoms/SortSelectBox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  moduleSpacerSmall: {
    height: "25x",
  },
}));

export const Record = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className={classes.root}>
      <SortSelectBox value={filter} onChange={handleChange} />
      <div className={classes.moduleSpacerSmall} />
      <BoxSx sortId={filter} />
    </div>
  );
};
