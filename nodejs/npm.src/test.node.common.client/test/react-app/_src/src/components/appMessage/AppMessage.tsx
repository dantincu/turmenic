import React from 'react';
import { Row, Col } from 'reactstrap';

import { AppTestMsgProps } from '../appTest/AppTestData';

const AppMessage = (props: AppTestMsgProps) => {
    const getMsgCssClass = () => {
        let cssClass = `tttt-msg-${props.msg.msgType}`;
        return cssClass;
    }

    return (<Row className={`tttt-msg ${getMsgCssClass()}`}>
        <Col className="tttt-msg-label"></Col>
        <Col md={11} className="tttt-msg-text"><span>{ props.msg.msgText }</span></Col>
    </Row>);
};

export default AppMessage;