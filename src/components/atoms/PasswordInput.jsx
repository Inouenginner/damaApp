import React from "react";
import TextField from "@material-ui/core/TextField";

export const PasswordInput = (props) => {
  return (
    <TextField
      id="inputPass"
      name="input"
      type="password"
      label="パスワード"
      autoComplete="shipping address-line1"
      value={props.name}
      onChange={props.onChange}
      variant="outlined"
      placeholder="パスワード"
      required
    />
  );
};
