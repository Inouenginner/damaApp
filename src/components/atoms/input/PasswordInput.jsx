import React from "react";
import TextField from "@material-ui/core/TextField";

export const PasswordInput = (props) => {
  return (
    <TextField
      id="password"
      name="password"
      type="password"
      label="パスワード"
      autoComplete="off"
      value={props.name}
      onChange={props.onChange}
      variant="outlined"
      placeholder="パスワード"
      required
    />
  );
};
