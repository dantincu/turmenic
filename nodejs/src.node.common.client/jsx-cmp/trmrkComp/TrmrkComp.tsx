import React from 'react';

import { TrmrkCompProps, DomElTag, BtstrpElType, ButtonDomElAttrs, InputDomElAttrs } from './TrmrkCompProps';
import { Container, Row, Col } from 'reactstrap';

const TrmrkComp = (props: TrmrkCompProps) => {
    switch (props.domElTagName) {
        case DomElTag.div:
            return (<div {...props.domElAttrs}>
                { props.children }
            </div>);
        case DomElTag.span:
            return (<span {...props.domElAttrs}>
                { props.children }
            </span>);
        case DomElTag.button:
            return (<button {...props.domElAttrs as ButtonDomElAttrs}>
                { props.children }
            </button>);
        case DomElTag.input:
            return (<input {...props.domElAttrs as InputDomElAttrs}>
                { props.children }
            </input>);
        case DomElTag.label:
            return (<label {...props.domElAttrs}>
                { props.children }
            </label>);
        case DomElTag.p:
            return (<p {...props.domElAttrs}>
                { props.children }
            </p>);
        case DomElTag.h1:
            return (<h1 {...props.domElAttrs}>
                { props.children }
            </h1>);
        case DomElTag.h2:
            return (<h2 {...props.domElAttrs}>
                { props.children }
            </h2>);
        case DomElTag.h3:
            return (<h3 {...props.domElAttrs}>
                { props.children }
            </h3>);
        case DomElTag.h4:
            return (<h4 {...props.domElAttrs}>
                { props.children }
            </h4>);
        case DomElTag.h5:
            return (<h5 {...props.domElAttrs}>
                { props.children }
            </h5>);
        case DomElTag.h6:
            return (<h6 {...props.domElAttrs}>
                { props.children }
            </h6>);
        case DomElTag.textarea:
            return (<textarea {...props.domElAttrs as InputDomElAttrs}>
                { props.children }
            </textarea>);
    }

    switch(props.btstrpElType) {
        case BtstrpElType.Container:
            return (<Container {...props.domElAttrs}>
                { props.children }
            </Container>);
        case BtstrpElType.Row:
            return (<Row {...props.domElAttrs}>
                { props.children }
            </Row>);
        case BtstrpElType.Col:
            return (<Col {...props.domElAttrs}>
                { props.children }
            </Col>);
    }

    return null
}

export default TrmrkComp;