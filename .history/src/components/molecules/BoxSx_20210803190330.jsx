import * as React from "react";
import Box from "@material-ui/core/Box";
import TechBox from "../atoms/TechBox";
import { useSelector } from "react-redux";
import { getWazas } from "../../reducks/wazas/selectors";
import Loader from "react-loader-spinner";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loader: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function BoxSx(props) {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  let wazas = getWazas(selector);
  switch (props.sortId) {
    case "10":
    default:
      break;
    case "20":
      wazas.sort(function (a, b) {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      });
      wazas = wazas.filter((waza) => {
        return waza.favorite;
      });
      break;
    case "40":
      wazas = wazas.filter((waza) => {
        return waza.favorite;
      });
      break;
    case "40":
      wazas = wazas.filter((waza) => {
        return waza.favorite;
      });
      break;
    case "40":
      wazas = wazas.filter((waza) => {
        return waza.favorite;
      });
      break;
    case "40":
      wazas = wazas.filter((waza) => {
        return waza.favorite;
      });
      break;
    case "40":
      wazas = wazas.filter((waza) => {
        return waza.favorite;
      });
      break;
  }

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
        <div className={classes.loader}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={300}
            width={300}
            timeout={10000}
          />
          準備中
        </div>
      )}
    </Box>
  );
}
