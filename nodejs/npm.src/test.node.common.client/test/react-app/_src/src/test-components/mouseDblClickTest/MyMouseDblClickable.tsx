import React, { useState, useEffect, MouseEvent } from 'react';

import MouseDblClickable from '../../src.node.common.client/jsx-cmp/mouseDblClickable/MouseDblClickable';
import { MouseDblClickableProps } from '../../src.node.common.client/jsx-cmp/mouseDblClickable/MouseDblClickableProps';
import { MyMouseDblClickableProps } from './MyMouseDblClickableProps';
import TrmrkComp from '../../src.node.common.client/jsx-cmp/trmrkComp/TrmrkComp';
import { TrmrkCompProps, DomElAttrs, DBL_CLICK_DEFAULT_MILLIS } from '../../src.node.common.client/jsx-cmp/trmrkComp/TrmrkCompProps';

const MyMouseDblClickable = (props: MyMouseDblClickableProps) => {
    const dblClickMillis = props.dblClickMillis ?? DBL_CLICK_DEFAULT_MILLIS;
    const [lastMouseUpMillis, setLastMouseUpMillis] = useState(0);
    const [lastMouseUpTimeout, setLastMouseUpTimeout] = useState<NodeJS.Timeout | null>(null);
    const [launchMouseUpTimeout, setLaunchMouseUpTimeout] = useState(false);
    const [sendDelayedClick, setSendDelayedClick] = useState(false);

    const onMouseUp = (e: MouseEvent) => {
        const mouseDownMillis = new Date().getTime();

        if (lastMouseUpMillis > 0 && mouseDownMillis - lastMouseUpMillis <= dblClickMillis) {
            setLastMouseUpMillis(0);
            if (lastMouseUpTimeout) {
                clearTimeout(lastMouseUpTimeout);
                setLastMouseUpTimeout(null);
            }
        } else {
            setLastMouseUpMillis(mouseDownMillis);
            setLaunchMouseUpTimeout(true);
        }

        if (props.onMouseUp) {
            props.onMouseUp(e);
        }
    }

    useEffect(() => {
        if (sendDelayedClick) {
            setSendDelayedClick(false);
            if (props.onDelayedClick) {
                props.onDelayedClick();
            }
        } else if (launchMouseUpTimeout && !lastMouseUpTimeout) {
            setLaunchMouseUpTimeout(false);
            setLastMouseUpTimeout(setTimeout(() => {
                setSendDelayedClick(true);
                setLastMouseUpTimeout(null);
            }, dblClickMillis));
        }
    }, [launchMouseUpTimeout, lastMouseUpTimeout, dblClickMillis, props, sendDelayedClick]);

    /* const domElAttrs = ({ ...props.domElAttrs } ?? {
    }) as DomElAttrs;

    domElAttrs.className = "tttt-cmpnt";
    domElAttrs.onMouseUp = onMouseUp; */

    const mouseDblClickableProps: MouseDblClickableProps = {
        dblClickMillis: dblClickMillis,
        onClick: props.onClick,
        onMouseDown: props.onMouseDown,
        onMouseUp: onMouseUp,
        onDoubleClick: props.onDoubleClick,
        onMiddleClick: props.onMiddleClick,
        onRightClick: props.onRightClick,
        mouseBtnPressedCssClasses: {
            btn0: "leftMouseDown",
            btn1: "middleMouseDown",
            btn2: "rightMouseDown"
        }
    };

    return (<MouseDblClickable {...mouseDblClickableProps}></MouseDblClickable>);
};

export default MyMouseDblClickable;
