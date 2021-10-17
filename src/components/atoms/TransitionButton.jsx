import React from "react";

import Button from "@material-ui/core/Button";

export const TransitionButton = (props) => {
  return (
    <Button variant="outlined" onClick={props.onClick}>
      {props.label}
    </Button>
  );
};
