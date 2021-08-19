import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { signIn } from "../../reducks/wazas/operations";
import { push } from "connected-react-router";

export const LoginButton = (props) => {
  return (
    <Button variant="outlined" color="primary" onClick={() => props.onClick}>
      kendamastart
    </Button>
  );
};
