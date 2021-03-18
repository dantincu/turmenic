import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import HomePageMainComponent from './components/homePageMainComponent/HomePageMainComponent';
import './App.scss';

import { appTestRoute } from './components/appTest/AppTestData';
import AppTest from './components/appTest/AppTest';

const App = () => {
  return (
    <div className="App">
      <main className="App-header">
        <Switch>
          <Route path={appTestRoute.routePathBase}>
            <AppTest></AppTest>
          </Route>
          <Route path="/">
            <HomePageMainComponent></HomePageMainComponent>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
