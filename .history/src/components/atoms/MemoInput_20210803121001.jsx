import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { useLocation } from "react-router";
import TextField from "@material-ui/core/TextField";

export const MemoInput = (props) => {
  return (
    <TextField
      id="memo"
      name="memo"
      label="メモ"
      fullWidth
      autoComplete="shipping address-line1"
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      variant="outlined"
    />
  );
};
