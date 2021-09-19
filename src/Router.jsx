import React from "react";
import { Route, Switch } from "react-router";
import { Record } from "../src/components/templates/Record";
import { Top } from "../src/components/templates/Top";
import { WazaDetail } from "../src/components/templates/WazaDetail";
import { Admin } from "../src/components/templates/Admin";
import { EditComp } from "../src/components/templates/EditComp";
import { AdminEdit } from "./components/templates/AdminEdit";
import { AdminMenu } from "../src/components/templates/AdminMenu";
import { AdminAdd } from "../src/components/templates/AdminAdd";
import { AdminRegist } from "../src/components/templates/AdminRegist";
import { ResultCharts } from "./components/templates/ResultCharts";
import { RegistComp } from "./components/templates/RegistComp";
import { AddComp } from "./components/templates/AddComp";
import { SignUp } from "./components/templates/SignUp";

export const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Top} />
      <Route path={"/record"} component={Record} />
      <Route exact key={"id"} path={"/detail/:id"} component={WazaDetail} />
      <Route path={"/signup"} component={SignUp} />
      <Route path={"/resultCharts"} component={ResultCharts} />

      <Route path={"/admin"} component={Admin} />
      <Route path={"/adminMenu"} component={AdminMenu} />
      <Route path={"/adminRegist"} component={AdminRegist} />
      <Route path={"/adminAdd"} component={AdminAdd} />
      <Route path={"/adminEdit"} component={AdminEdit} />
      <Route path={"/registComp"} component={RegistComp} />
      <Route path={"/addComp"} component={AddComp} />
      <Route path={"/editComp"} component={EditComp} />
    </Switch>
  );
};
