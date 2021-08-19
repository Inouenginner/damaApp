import React, { useState, useCallback } from "react";
import BoxSx from "../molecules/BoxSx";
import { SortSelectBox } from "../atoms/SortSelectBox";
import { makeStyles } from "@material-ui/core/styles";
import { BackButton } from "../atoms/BackButton";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/users/operations";

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
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const backToHome = useCallback(() => {
    dispatch(signOut());
    dispatch(push("/"));
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <BackButton onClick={backToHome} label="Logout" />
      <SortSelectBox value={filter} onChange={handleChange} />
      <div className={classes.moduleSpacerSmall} />
      <BoxSx sortId={filter} />
    </div>
  );
};
