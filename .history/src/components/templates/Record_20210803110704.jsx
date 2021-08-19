import React from "react";
import BoxSx from "../molecules/BoxSx";
import FormControl from "@material-ui/core/FormControl";
import { SelectBox } from "../atoms/SelectBox";
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

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <SelectBox />
      </FormControl>
      <BoxSx />
    </div>
  );
};
