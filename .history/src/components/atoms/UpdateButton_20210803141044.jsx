import React from "react";

import Button from "@material-ui/core/Button";
import { UpdateDetail } from "../../reducks/wazas/operations";

export const UpdateButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      value="true"
      onClick={() =>
        dispatch(UpdateDetail(achieve, memo, favorite, id, userId))
      }
    >
      登録
    </Button>
  );
};
