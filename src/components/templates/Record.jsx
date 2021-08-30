import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import BoxSx from "../molecules/BoxSx";
import { SortSelectBox } from "../atoms/SortSelectBox";
import { makeStyles } from "@material-ui/core/styles";
import { BackButton } from "../atoms/BackButton";
import { signOut } from "../../reducks/users/operations";
import { push } from "connected-react-router";
import { getUserName } from "../../reducks/users/selectors";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  moduleSpacerSmall: {
    height: "20px",
  },
}));

export const Record = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const username = getUserName(selector);
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const backToHome = useCallback(() => {
    dispatch(signOut());
    //eslint-disable-next-line
  }, []);
  const goChart = useCallback(() => {
    dispatch(push("/resultCharts"));
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <BackButton onClick={backToHome} label="Logout" />
      <BackButton onClick={goChart} label="チャートへ" />
      <Typography variant="subtitle1" gutterBottom>
        ユーザ名：{username}さん
      </Typography>
      <SortSelectBox value={filter} onChange={handleChange} />
      <div className={classes.moduleSpacerSmall} />
      <BoxSx sortId={filter} />
    </div>
  );
};
