import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export const FavoriteCheckBox = (props) => {
  return (
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
  );
};
