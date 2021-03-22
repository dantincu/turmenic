import React, { useState } from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import { Subject } from 'rxjs';

import './AppTest.scss';

import { AppTestMsg } from '../../app/appMessagesSlice';
import { appTestRoute } from './AppTestData';
import MyMouseDblClickTest from '../../test-components/mouseDblClickTest/MyMouseDblClickTest';
import AppMessagesCntr from '../appMessage/AppMessagesCntr';

interface AppTestRouteData {
    relPath: string;
    component: JSX.Element
}

const AppTest = () => {
    const $appTestMsgSubject = new Subject<AppTestMsg>();

    const onAppMessage = (msg: AppTestMsg) => {
        $appTestMsgSubject.next(msg);
    }

    const routesArr: AppTestRouteData[] = [
        {
            relPath: "mouse-dbl-click",
            component: (<MyMouseDblClickTest onAppMessage={onAppMessage}></MyMouseDblClickTest>)
        }
    ];

    return (
    <Container className="tttt">
        <Row className="tttt-cmpnt-cntr">
            <Switch>
                { routesArr.map(data => <Route path={appTestRoute.getRoutePath(data.relPath)}>{data.component}</Route>) }
            </Switch>
        </Row>
        <AppMessagesCntr $appTestMsgSubject={$appTestMsgSubject}></AppMessagesCntr>
    </Container>);
}

export default AppTest;
