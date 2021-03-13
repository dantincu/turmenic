import React from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";

import './styles/App.scss';

import AppHeader from './components/appHeader/AppHeader';
import AppFooter from './components/appFooter/AppFooter';

import DriveExplorerPage from './pages/drive-explorer/DriveExplorerPage';
import DashboardPage from './pages/dashboard/DashboardPage';

const App = () => {
    return (
        <div className="txqk-app">
            <AppHeader></AppHeader>
            <Switch>
                <Route path="/drive/:id"><DriveExplorerPage></DriveExplorerPage></Route>
                <Route path="/"><DashboardPage></DashboardPage></Route>
            </Switch>
            <AppFooter></AppFooter>
        </div>
    );
};

export default App;