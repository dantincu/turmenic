import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import AppPage from '../../AppPage';
import { AppSessionPageProps } from "./AppSessionPageProps";
import "./AppSessionPage.scss";
import AppDrivesExplorer from '../app-drives-explorer/AppDrivesExplorer';
import { selectAppSession } from "../../../app/deviceAppDriveItems/deviceAppDriveItems";

const AppSessionPage = (props: AppSessionPageProps) => {
    let { path } = useRouteMatch();
    let { uuid: sessionUuid } = useParams<{ uuid: string }>();
    const appSession = useSelector(selectAppSession(sessionUuid));

    return (<AppPage>
        <h6 className="trmrk-app-session-name">{ appSession?.name }</h6>
        <p className="trmrk-app-session-descr">{ appSession?.description }</p>
        <Switch>
            <Route path={`${path}/app-drives/`}>
            <h4 className="trmrk-page-section-title">App session drives</h4>
              <AppDrivesExplorer sessionUuid={sessionUuid}></AppDrivesExplorer>
            </Route>
            <Route path={path}>
            <h4 className="trmrk-page-section-title">App session</h4>
            </Route>
          </Switch>
    </AppPage>);
};

export default AppSessionPage;