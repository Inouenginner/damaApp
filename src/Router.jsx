import React from "react";
import { Route, Switch } from "react-router";
import { Record } from "./components/pages/Record";
import { SignIn } from "./components/pages/SignIn";
import { WazaDetail } from "../src/components/pages/WazaDetail";
import { Admin } from "./components/pages/Admin";
import { AdminEditComp } from "./components/pages/AdminEditComp";
import { AdminEdit } from "./components/pages/AdminEdit";
import { AdminMenu } from "../src/components/pages/AdminMenu";
import { AdminAdd } from "./components/pages/AdminAdd";
import { AdminRegist } from "../src/components/pages/AdminRegist";
import { ResultCharts } from "./components/pages/ResultCharts";
import { AdminRegistComp } from "./components/pages/AdminRegistComp";
import { AdminAddComp } from "./components/pages/AdminAddComp";
import { SignUp } from "./components/pages/SignUp";
import { HeaderLayout } from "./components/templates/HeaderLayout";

export const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"}>
        <HeaderLayout>
          <SignIn />
        </HeaderLayout>
      </Route>
      <Route path={"/record"}>
        <HeaderLayout>
          <Record />
        </HeaderLayout>
      </Route>
      <Route exact key={"id"} path={"/detail/:id"}>
        <HeaderLayout>
          <WazaDetail />
        </HeaderLayout>
      </Route>
      <Route path={"/signup"}>
        <HeaderLayout>
          <SignUp />
        </HeaderLayout>
      </Route>
      <Route path={"/resultCharts"}>
        <HeaderLayout>
          <ResultCharts />
        </HeaderLayout>
      </Route>

      <Route path={"/admin"}>
        <HeaderLayout>
          <Admin />
        </HeaderLayout>
      </Route>
      <Route path={"/adminMenu"}>
        <HeaderLayout>
          <AdminMenu />
        </HeaderLayout>
      </Route>
      <Route path={"/adminRegist"}>
        <HeaderLayout>
          <AdminRegist />
        </HeaderLayout>
      </Route>
      <Route path={"/adminAdd"}>
        <HeaderLayout>
          <AdminAdd />
        </HeaderLayout>
      </Route>
      <Route path={"/adminEdit"}>
        <HeaderLayout>
          <AdminEdit />
        </HeaderLayout>
      </Route>
      <Route path={"/registComp"}>
        <HeaderLayout>
          <AdminRegistComp />
        </HeaderLayout>
      </Route>
      <Route path={"/addComp"}>
        <HeaderLayout>
          <AdminAddComp />
        </HeaderLayout>
      </Route>
      <Route path={"/editComp"}>
        <HeaderLayout>
          <AdminEditComp />
        </HeaderLayout>
      </Route>
    </Switch>
  );
};
