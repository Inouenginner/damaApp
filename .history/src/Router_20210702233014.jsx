import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Record } from "../src/components/templates/Record";
import { Top } from "../src/components/templates/Top";
import { WazaDetail } from "../src/components/templates/WazaDetail";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/record"} component={Record} />
        <Route exact path={"/"} component={Top} />
        <Route exact path={"/detail/:id"} component={WazaDetail} />
      </Switch>
    </BrowserRouter>
  );
};
