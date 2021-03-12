import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import {
    useLocation,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

import './styles/App.scss';

import { urlQueryParams } from './components/components';
import DriveRootFolder from './components/driveRootFolder/DriveRootFolder';

import { selectRootFolder } from './app/driveItems/driveItems';
import { DriveFolder } from './app/driveItems/driveItems.types';
import { toDriveItemProps } from './app/driveItems/driveItems.converters';

import AppHeader from './components/appHeader/AppHeader';
import AppFooter from './components/appFooter/AppFooter';

import DriveExplorerPage from './pages/drive-explorer/DriveExplorerPage';
import DashboardPage from './pages/dashboard/DashboardPage';

const App = () => {
    const rootFolder = useSelector(selectRootFolder);

    const getRootFolderComponent = (rootFolder?: DriveFolder) => {
        let retComp = null;
        const rootFolderProps = rootFolder ? toDriveItemProps(rootFolder) : null;

        if (rootFolderProps) {
            retComp = (<DriveRootFolder rootFolder={rootFolderProps}></DriveRootFolder>);
        }

        return retComp;
    }

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