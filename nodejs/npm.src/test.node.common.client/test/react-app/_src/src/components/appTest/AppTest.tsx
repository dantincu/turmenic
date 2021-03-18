import React, { useState } from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';

import { intIdGenerator } from '../../js.common/dist/src.common/utils/intIdGenerator';
import { AppTestMsg } from './AppTestData';
import './AppTest.scss';

import { appTestRoute, AppTestMsgProps, AppTestMsgTypes, appTestMsgTypesEnumKeys } from './AppTestData';
import MouseDblClickTest from '../../test-components/mouseDblClickTest/MouseDblClickTest';
import AppMessage from '../appMessage/AppMessage';

interface AppTestRouteData {
    relPath: string;
    component: JSX.Element
}

const AppTest = () => {
    const [ appTestMessages, setAppTestMessages ] = useState<AppTestMsg[]>([]);

    const onAppMessage = (msg: AppTestMsg) => {
        msg.intIdx = msg.intIdx ?? intIdGenerator.getNextId();
        const msgArr = appTestMessages.slice(0, appTestMessages.length);
        console.log("msgArr", msgArr);

        msgArr.splice(0, 0, msg);
        console.log("msgArr", msgArr);
        setAppTestMessages(msgArr);
    }

    const routesArr: AppTestRouteData[] = [
        {
            relPath: "mouse-dbl-click",
            component: (<MouseDblClickTest onAppMessage={onAppMessage}></MouseDblClickTest>)
        }
    ];

    return (<Container className="tttt">
        <Row className="tttt-cmpnt-cntr">
            <Switch>
                { routesArr.map(data => <Route path={appTestRoute.getRoutePath(data.relPath)}>{data.component}</Route>) }
            </Switch>
        </Row>
        <Row className="tttt-msg-cntr">
            { appTestMessages.map((msg, idx, arr) => {
                return {
                    msg: msg,
                    msgType: appTestMsgTypesEnumKeys[(arr.length - 1 - idx) % appTestMsgTypesEnumKeys.length] as unknown as AppTestMsgTypes
                } as AppTestMsgProps
            }).map(msg => <AppMessage key={msg.msg.intIdx} {...msg}></AppMessage>) }
        </Row>
    </Container>);
}

export default AppTest;
