import * as React from "react";
import Box from "@material-ui/core/Box";
import TechBox from "../atoms/TechBox";
import { useSelector } from "react-redux";
import { getWazas } from "../../reducks/wazas/selectors";

export default function BoxSx() {
  const selector = useSelector((state) => state);
  const wazas = getWazas(selector);
  const sortId = getWazas(selector);
  sortId = "10";
  switch (sortId) {
    case "10":
      wazas = wazas.filter((waza) => {
        return waza.achieve === 0;
      });
      break;
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
