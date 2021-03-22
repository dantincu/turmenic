import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectMsgArr, pushMsg, AppTestMsg } from '../../app/appMessagesSlice';
import { AppTestComponentProps } from '../../components/appTest/AppTestData';
import MyMouseDblClickable from './MyMouseDblClickable';
import { DomElTag } from "../../jsx-cmp/trmrComp/TrmrCompProps";
import './MyMouseDblClickTest.scss';

const MyMouseDblClickTest = (props: AppTestComponentProps) => {
    const dispatch = useDispatch();
    const sendMouseClickMessage = (message: string) => {
        const date = new Date();
        const str = `${message}: ${date.getTime()} >>>> ${date}`;
        const msg = {msgText: str} as AppTestMsg;

        dispatch(pushMsg(msg));
        props.onAppMessage(msg);
    }

    const onClick = () => {
        sendMouseClickMessage("onClick");
    }

    const onMouseDown = () => {
        // sendMouseClickMessage("mouse down");
    }

    const onMouseUp = () => {
        // sendMouseClickMessage("mouse up");
    }

    const onDoubleClick = () => {
        sendMouseClickMessage("onDoubleClick");
    }

    const onDelayedClick = () => {
        sendMouseClickMessage("onDelayedClick");
    }

    const onMiddleClick = () => {
        sendMouseClickMessage("onMiddleClick");
    }

    const onRightClick = () => {
        sendMouseClickMessage("onRightClick");
    }

    return (<MyMouseDblClickable
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onDoubleClick={onDoubleClick}
        onMiddleClick={onMiddleClick}
        onRightClick={onRightClick}
        onDelayedClick={onDelayedClick}
        domElTagName={DomElTag.button}>
            Press
    </MyMouseDblClickable>);
}

export default MyMouseDblClickTest;
