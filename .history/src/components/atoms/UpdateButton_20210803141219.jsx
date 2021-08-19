import React from "react";

import Button from "@material-ui/core/Button";
import { UpdateDetail } from "../../reducks/wazas/operations";

export const UpdateButton = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      value="true"
      onClick={() => props.onClick()}
    >
      登録
    </Button>
  );
};
