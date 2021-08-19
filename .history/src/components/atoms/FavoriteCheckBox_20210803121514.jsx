import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { useLocation } from "react-router";
import { getWazas } from "../../reducks/wazas/selectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Iframe from "react-iframe";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { UpdateDetail } from "../../reducks/wazas/operations";
import { AchieveSelectBox } from "../atoms/AchieveSelectBox";
import { MemoInput } from "../atoms/MemoInput";

export const FavoriteCheckBox = (props) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            name="favorite"
            value="true"
            defaultChecked={props.defaultChecked}
            onChange={props.onChange}
          />
        }
        label="お気に入りチェック"
      />
    </div>
  );
};
