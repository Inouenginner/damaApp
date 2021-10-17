import React from "react";
import Button from "@material-ui/core/Button";

export const LoginButton = (props) => {
  return (
    <Button variant="outlined" color="primary" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  );
};
