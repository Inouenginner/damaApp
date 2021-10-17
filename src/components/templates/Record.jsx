import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BoxSx from "../molecules/BoxSx";
import { SortSelectBox } from "../atoms/SortSelectBox";
import { makeStyles } from "@material-ui/core/styles";
import { TransitionButton } from "../atoms/TransitionButton";
import { signOut } from "../../reducks/users/operations";
import { push } from "connected-react-router";
import { getUserName } from "../../reducks/users/selectors";
import Typography from "@material-ui/core/Typography";
import { getSignedIn } from "../../reducks/users/selectors";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loader: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
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
  const isSignedIn = getSignedIn(selector);
  const username = getUserName(selector);
  const [filter, setFilter] = useState("");

  if (!isSignedIn) {
    return (
      <div className={classes.loader}>
        <Link component={RouterLink} to="/">
          ログインしてね
        </Link>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <TransitionButton onClick={() => dispatch(signOut())} label="Logout" />
      <TransitionButton onClick={() => dispatch(push("/resultCharts"))} label="成績チャートへ" />
      <Typography variant="subtitle1" gutterBottom>
        ユーザ名：{username}さん
      </Typography>
      <SortSelectBox value={filter} select={setFilter} />
      <div className={classes.moduleSpacerSmall} />
      <BoxSx sortId={filter} />
    </div>
  );
};
