import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import TechBox from "../atoms/TechBox";
import { useSelector } from "react-redux";
import { getWazas } from "../../reducks/wazas/selectors";
import { getLoading } from "../../reducks/users/selectors";
import Loader from "react-loader-spinner";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loader: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function BoxSx(props) {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  let wazas = getWazas(selector);
  let isLoading = getLoading(selector);
  let bool;
  if (isLoading) {
    bool = "aaa";
  } else {
    bool = "bbb";
  }
  console.log(isLoading);
  console.log(bool);
  console.log(wazas);
  useEffect(() => {
    console.log("useEffectが実行されました");
  }, [isLoading]);
  switch (props.sortId) {
    case "10":
    default:
      wazas.sort(function (a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
      break;
    case "20":
      wazas.sort(function (a, b) {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
      break;
    case "30":
      wazas.sort(function (a, b) {
        if (a.level < b.level) return -1;
        if (a.level > b.level) return 1;
        return 0;
      });
      break;
    case "40":
      wazas.sort(function (a, b) {
        if (a.level > b.level) return -1;
        if (a.level < b.level) return 1;
        return 0;
      });
      break;
    case "50":
      wazas = wazas.filter((waza) => {
        return waza.level === "1";
      });
      break;
    case "60":
      wazas = wazas.filter((waza) => {
        return waza.level === "2";
      });
      break;
    case "70":
      wazas = wazas.filter((waza) => {
        return waza.level === "3";
      });
      break;
    case "80":
      wazas = wazas.filter((waza) => {
        return waza.level === "4";
      });
      break;
    case "90":
      wazas = wazas.filter((waza) => {
        return waza.level === "5";
      });
      break;
    case "100":
      wazas.sort(function (a, b) {
        if (a.achieve < b.achieve) return -1;
        if (a.achieve > b.achieve) return 1;
        return 0;
      });
      break;
    case "110":
      wazas.sort(function (a, b) {
        if (a.achieve > b.achieve) return -1;
        if (a.achieve < b.achieve) return 1;
        return 0;
      });
      break;
    case "120":
      wazas = wazas.filter((waza) => {
        return waza.achieve === "0" || waza.achieve === "";
      });
      break;
    case "130":
      wazas = wazas.filter((waza) => {
        return waza.achieve === "1";
      });
      break;
    case "140":
      wazas = wazas.filter((waza) => {
        return waza.achieve === "2";
      });
      break;
    case "150":
      wazas = wazas.filter((waza) => {
        return waza.achieve === "3";
      });
      break;
    case "160":
      wazas = wazas.filter((waza) => {
        return waza.achieve === "4";
      });
      break;
    case "170":
      wazas = wazas.filter((waza) => {
        return waza.achieve === "5";
      });
      break;
    case "180":
      wazas = wazas.filter((waza) => {
        return waza.favorite;
      });
      break;
    case "190":
      wazas = wazas.filter((waza) => {
        return waza.memo;
      });
      break;
  }

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={300}
          width={300}
          timeout={3000}
        />
        準備中
      </div>
    );
  } else {
    return (
      <Box
        component="span"
        sx={{ p: 2, width: "3px", border: "1px dashed grey" }}
        display="flex"
        align-items="center"
        flexWrap="wrap"
      >
        {wazas.length > 0 ? (
          wazas.map((waza) => (
            <TechBox
              key={waza.id}
              id={waza.id}
              achieve={waza.achieve}
              name={waza.waza}
              favorite={waza.favorite}
              memo={waza.memo}
              level={waza.level}
            />
          ))
        ) : (
          <div className={classes.loader}>該当なし</div>
        )}
      </Box>
    );
  }
}
