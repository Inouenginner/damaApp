import React, { useCallback, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { NameInput } from "../atoms/input/NameInput";
import { PasswordInput } from "../atoms/input/PasswordInput";
import { LoginButton } from "../atoms/button/LoginButton";
import Link from "@material-ui/core/Link";

export const LoginContent = (props) => {
  const [name, setName] = useState("");
  const nameChange = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );
  const [password, setPassword] = useState("");
  const passwordChange = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <>
      <Grid item xs={12} sm={8}>
        <h1>{props.title}</h1>
      </Grid>
      <Grid item xs={12} sm={8}>
        <div className="red-text">{props.message}</div>
      </Grid>
      <Grid item xs={12} sm={8}>
        <NameInput name={name} onChange={nameChange} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <PasswordInput placeholder={"パスワード"} name={password} onChange={passwordChange} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <LoginButton label={props.transitionLabel} onClick={props.transitionMove} />
      </Grid>
      {props.haveLink && (
        <Grid item xs={12} sm={8}>
          <Link component={props.linkComponent} to={props.linkTransitionTo}>
            {props.linkLabel}
          </Link>
        </Grid>
      )}
    </>
  );
};
