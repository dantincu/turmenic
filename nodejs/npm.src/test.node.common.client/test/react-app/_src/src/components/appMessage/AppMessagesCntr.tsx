import React from 'react';
import { Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import { selectMsgArr, pushMsg } from '../../app/appMessagesSlice';
import AppMessage from '../appMessage/AppMessage';
import { AppMessagesCntrProps } from './AppMessagesCntrProps';

const AppMessagesCntr = (props: AppMessagesCntrProps) => {
    // const dispatch = useDispatch();
    const appTestMessages = useSelector(selectMsgArr);

    props.$appTestMsgSubject.subscribe(msg => {
        // dispatch(pushMsg(msg));
    });

    return (
        <Row className="tttt-msg-cntr">
            { appTestMessages.map(msg => <AppMessage key={msg.intIdx} msg={msg}></AppMessage>) }
        </Row>
    );
};

export default AppMessagesCntr;