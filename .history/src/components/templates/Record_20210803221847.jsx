import React, { useState, useCallback } from "react";
import BoxSx from "../molecules/BoxSx";
import { SortSelectBox } from "../atoms/SortSelectBox";
import { makeStyles } from "@material-ui/core/styles";
import { BackButton } from "../atoms/BackButton";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  moduleSpacerSmall: {
    height: "25px",
  },
}));

export const Record = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const backToHome = useCallback(() => {
    dispatch(push("/"));
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <BackButton onClick={backToHome} label="戻る" />
      <SortSelectBox value={filter} onChange={handleChange} />
      <div className={classes.moduleSpacerSmall} />
      <BoxSx sortId={filter} />
    </div>
  );
};
