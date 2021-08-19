import React, { useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";

export const NameInput = (props) => {
  const [name, setName] = useState("");

  //関数のメモ化
  const nameChange = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  return (
    <TextField
      id="memo"
      name="memo"
      label="名前"
      autoComplete="shipping address-line1"
      value={props.name}
      onChange={props.onChange}
      variant="outlined"
    />
  );
};
