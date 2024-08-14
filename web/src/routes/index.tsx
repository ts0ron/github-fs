import React from "react";
import {Route, Switch} from "react-router-dom";
import {
  FS_TREE_ROUTE_URL,
  LOGIN_ROUTE_URL,
  LOGOUT_ROUTE_URL,
  REGISTRATION_URL,
} from "./routes";
import LoginPage from "../views/login";
import LogoutPage from "../views/logout";
import FileExplorerPage from "../views/fileexplorer";
import HomePage from "../views/homepage";
import MainLayout from "../views/layout/main";
import RegistrationPage from "../views/register";

const Index = () => {
  return (
    <Switch>
      {/* Register */}
      <Route exact path={REGISTRATION_URL}>
        <MainLayout includeAppBar={false}>
          <RegistrationPage />
        </MainLayout>
      </Route>
      {/* login */}
      <Route exact path={LOGIN_ROUTE_URL}>
        <MainLayout includeAppBar={false}>
          <LoginPage />
        </MainLayout>
      </Route>
      {/* logout */}
      <Route exact path={LOGOUT_ROUTE_URL}>
        <MainLayout includeAppBar={true}>
          <LogoutPage />
        </MainLayout>
      </Route>
      {/* files-tree */}
      <Route exact path={FS_TREE_ROUTE_URL}>
        <MainLayout includeAppBar={true}>
          <FileExplorerPage />
        </MainLayout>
      </Route>

      {/* homepage */}
      <Route exact path={"/"}>
        <MainLayout includeAppBar={true}>
          <HomePage />
        </MainLayout>
      </Route>
    </Switch>
  );
};

export default Index;
