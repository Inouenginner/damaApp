import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Record } from "../src/components/templates/Record";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} component={Top} />
        <Route path={"/record"} component={Record} />
      </Switch>
    </BrowserRouter>
  );
};
