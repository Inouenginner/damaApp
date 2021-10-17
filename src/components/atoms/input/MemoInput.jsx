import React from "react";
import TextField from "@material-ui/core/TextField";

export const MemoInput = (props) => {
  return (
    <TextField
      id="memo"
      name="memo"
      label="メモ"
      fullWidth
      autoComplete="off"
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      variant="outlined"
    />
  );
};
