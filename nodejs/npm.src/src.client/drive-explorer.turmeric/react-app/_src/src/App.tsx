import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";

import './styles/App.scss';

import { ErrorBoundary } from './jsx-cmp/errorBoundary/ErrorBoundary';

import AppHeader from './components/appHeader/AppHeader';
import AppFooter from './components/appFooter/AppFooter';

import DriveExplorerPage from './pages/drive-explorer/DriveExplorerPage';
import DashboardPage from './pages/dashboard/DashboardPage';

import { driveApi } from './api/drives.api';

const App = () => {
    const [ authenticated, setAuthenticated ] = useState(true);
    const [ error, setError ] = useState(false);

    const showErrorDetails: boolean = process.env.REACT_APP_DEV_MODE === "true";

    useEffect(() => {
        if (authenticated !== true && error === false) {
            driveApi.assureAuth().then(auth => {
                setAuthenticated(auth);
                setError(!auth);
            }, err => {
                setError(true);
            })
        }
    });

    let appElement: JSX.Element;

    if (authenticated === true) {
        appElement = (<div className="txqk-app">
                <ErrorBoundary showDetails={showErrorDetails}>
                    <AppHeader></AppHeader>
                    <Switch>
                        <Route path="/drive/:id"><DriveExplorerPage></DriveExplorerPage></Route>
                        <Route path="/"><DashboardPage></DashboardPage></Route>
                    </Switch>
                    <AppFooter></AppFooter>
                </ErrorBoundary>
            </div>);
           
    } else if (error) {
        appElement = (<div className="txqk-app-error">
            <p className="txqk-error-msg">Something went wrong and the app could not start...</p>
        </div>);
    } else {
        appElement = (<div className="txqk-app-loading">
            <h3 className="txqk-info-title">Starting the app...</h3>
        </div>);
    }

    return appElement;
};

export default App;