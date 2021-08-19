import * as React from "react";
import Box from "@material-ui/core/Box";
import TechBox from "../atoms/TechBox";
import { useSelector } from "react-redux";
import { getWazas } from "../../reducks/wazas/selectors";

export default function BoxSx() {
  const selector = useSelector((state) => state);
  let wazas = getWazas(selector);
  let sortId = getWazas(selector);
  sortId = "10";
  let updatedWazas;
  switch (sortId) {
    case "10":
      updatedWazas = wazas.filter((waza) => {
        return waza.achieve === 0;
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
