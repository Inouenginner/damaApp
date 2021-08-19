import React from "react";

import Button from "@material-ui/core/Button";

export const UpdateButton = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      value="true"
      onClick={() => props.onClick}
    >
      登録
    </Button>
  );
};
