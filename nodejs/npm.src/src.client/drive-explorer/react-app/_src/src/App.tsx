import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import "./styles/App.scss";

import { ErrorBoundary } from "./src.node.common.client/jsx-cmp/errorBoundary/ErrorBoundary";

import AppHeader from "./components/appHeader/AppHeader";
import AppFooter from "./components/appFooter/AppFooter";

import AppSessionPage from "./pages/sessions/appSession/AppSessionPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

import AppPage from './pages/AppPage';

import { authApi } from "./api/auth.api";

const App = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [error, setError] = useState(false);

  const devMode: boolean = process.env.REACT_APP_DEV_MODE === "true";

  useEffect(() => {
    if (authenticated !== true && error === false) {
      authApi.assureAuth().then(
        (auth) => {
          setAuthenticated(auth);
          setError(!auth);
        },
        (err) => {
          setError(true);
        }
      );
    }
  });

  let appElement: JSX.Element;

  if (authenticated === true) {
    appElement = (
      <div className="trmrk-app">
        <ErrorBoundary showDetails={devMode}>
          <AppHeader devMode={devMode}></AppHeader>
          <Switch>
            <Route path="/app-session/:uuid">
              <AppSessionPage></AppSessionPage>
            </Route>
            <Route path="/dashboard">
              <DashboardPage></DashboardPage>
            </Route>
            <Route path="/">
              <AppPage></AppPage>
            </Route>
          </Switch>
          <AppFooter></AppFooter>
        </ErrorBoundary>
      </div>
    );
  } else if (error) {
    appElement = (
      <div className="trmrk-app-error">
        <p className="trmrk-error-msg">
          Something went wrong and the app could not start...
        </p>
      </div>
    );
  } else {
    appElement = (
      <div className="trmrk-app-loading">
        <h3 className="trmrk-info-title">Starting the app...</h3>
      </div>
    );
  }

  return appElement;
};

export default App;
