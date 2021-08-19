import * as React from "react";
import Box from "@material-ui/core/Box";
import TechBox from "../atoms/TechBox";
import { useSelector } from "react-redux";
import { getWazas } from "../../reducks/wazas/selectors";

export default function BoxSx() {
  const selector = useSelector((state) => state);
  const wazas = getWazas(selector);
  const sortId = getWazas(selector);
  switch (sortId) {
    case "1":
      bg_class = "bg1";
      break;
    case "2":
      bg_class = "bg2";
      break;
    case "3":
      bg_class = "bg3";
      break;
    case "4":
      bg_class = "bg4";
      break;
    case "5":
      bg_class = "bg5";
      break;
    case "0":
    default:
      bg_class = "bg0";
  }

  const sortedWazas = wazas.filter((waza) => {
    return waza.achieve === 0;
  });
  return (
    <Box
      component="span"
      sx={{ p: 2, width: "3px", border: "1px dashed grey" }}
      display="flex"
      align-items="center"
      flexWrap="wrap"
    >
      {wazas.length > 0 &&
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
        ))}
    </Box>
  );
}
