import React from "react";
import BoxSx from "../molecules/BoxSx";
import { SortSelectBox } from "../atoms/SortSelectBox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  right: {
    textAlign: "right",
  },
}));

export const Record = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.right}>
        <SortSelectBox />
      </div>
      <BoxSx />
    </div>
  );
};
