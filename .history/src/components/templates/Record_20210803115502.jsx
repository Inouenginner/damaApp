import React from "react";
import BoxSx from "../molecules/BoxSx";
import { SelectBox } from "../atoms/SortSelectBox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export const Record = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SortSelectBox />
      <BoxSx />
    </div>
  );
};
