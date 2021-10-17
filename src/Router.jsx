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
import { HeaderContainerLayout } from "./components/templates/HeaderContainerLayout";

export const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"}>
        <HeaderContainerLayout>
          <SignIn />
        </HeaderContainerLayout>
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
        <HeaderContainerLayout>
          <SignUp />
        </HeaderContainerLayout>
      </Route>
      <Route path={"/resultCharts"}>
        <HeaderLayout>
          <ResultCharts />
        </HeaderLayout>
      </Route>

      <Route path={"/admin"}>
        <HeaderContainerLayout>
          <Admin />
        </HeaderContainerLayout>
      </Route>
      <Route path={"/adminMenu"}>
        <HeaderContainerLayout>
          <AdminMenu />
        </HeaderContainerLayout>
      </Route>
      <Route path={"/adminRegist"}>
        <HeaderContainerLayout>
          <AdminRegist />
        </HeaderContainerLayout>
      </Route>
      <Route path={"/adminAdd"}>
        <HeaderContainerLayout>
          <AdminAdd />
        </HeaderContainerLayout>
      </Route>
      <Route path={"/adminEdit"}>
        <HeaderContainerLayout>
          <AdminEdit />
        </HeaderContainerLayout>
      </Route>
      <Route path={"/registComp"}>
        <HeaderContainerLayout>
          <AdminRegistComp />
        </HeaderContainerLayout>
      </Route>
      <Route path={"/addComp"}>
        <HeaderContainerLayout>
          <AdminAddComp />
        </HeaderContainerLayout>
      </Route>
      <Route path={"/editComp"}>
        <HeaderContainerLayout>
          <AdminEditComp />
        </HeaderContainerLayout>
      </Route>
    </Switch>
  );
};
