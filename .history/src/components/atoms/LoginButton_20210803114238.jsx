import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { signIn } from "../../reducks/wazas/operations";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { push } from "connected-react-router";
import { NameInput } from "../atoms/NameInput";

export const LoginButton = () => {
  const dispatch = useDispatch();

  const goRecord = useCallback((name) => {
    dispatch(signIn(name));
    dispatch(push("/record"));
    //eslint-disable-next-line
  }, []);

  const [name, setName] = useState("");

  //関数のメモ化
  const nameChange = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  return (
    <Button variant="outlined" color="primary" onClick={() => goRecord(name)}>
      kendamastart
    </Button>
  );
};
