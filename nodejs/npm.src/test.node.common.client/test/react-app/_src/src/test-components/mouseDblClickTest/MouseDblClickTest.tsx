import React from 'react';
import { v4 as uuid } from 'uuid';

import { MouseDblClick } from '../../js.common/dist/src.node.common.client/domEvents/MouseDblClick.js';
import { AppTestComponentProps } from '../../components/appTest/AppTestData';

const MouseDblClickTest = (props: AppTestComponentProps) => {
    const mouseDblClick = new MouseDblClick();

    const sendMouseClickMessage = (message: string) => {
        const date = new Date();
        const str = `${message}: ${date.getTime()} >>>> ${date}`;

        props.onAppMessage({text: str});
    }

    mouseDblClick.singleClickSubject.subscribe(() => {
        sendMouseClickMessage("single click");
    });

    mouseDblClick.doubleClickSubject.subscribe(() => {
        sendMouseClickMessage("double click");
    });

    const onClick = () => {
        mouseDblClick.onMouseDown();
    }

    return (<div><button onClick={onClick}>Press</button></div>);
}

export default MouseDblClickTest;
