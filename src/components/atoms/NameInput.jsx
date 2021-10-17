import React from "react";
import TextField from "@material-ui/core/TextField";

export const NameInput = (props) => {
  return (
    <TextField
      error={props.inputError}
      inputProps={{ maxLength: 4, pattern: "^[a-zA-Z0-9_]+$" }}
      id="input"
      name="input"
      label="名前"
      autoComplete="off"
      value={props.name}
      onChange={props.onChange}
      onClick={props.onClick}
      variant="outlined"
      placeholder="名前"
      helperText={props.inputRef?.current?.validationMessage}
      required
    />
  );
};
