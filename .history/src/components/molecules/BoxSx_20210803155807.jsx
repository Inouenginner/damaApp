import * as React from "react";
import Box from "@material-ui/core/Box";
import TechBox from "../atoms/TechBox";
import { useSelector } from "react-redux";
import { getWazas } from "../../reducks/wazas/selectors";

export default function BoxSx() {
  const useSelector = useSelector((state) => state);
  let wazas = getWazas(useSelector);
  let sortId = getWazas(selector);
  let updatedWazas;
  switch (sortId) {
    case "10":
      updatedWazas = wazas.filter((waza) => {
        return waza.favorite;
      });
      break;
    case "20":
      updatedWazas = wazas;
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
      {updatedWazas.length > 0 &&
        updatedWazas.map((waza) => (
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
