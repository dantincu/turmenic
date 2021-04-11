import React, { useState, useEffect, MouseEvent } from 'react';

import { MouseDblClickableProps } from './MouseDblClickableProps';
import TrmrComp from '../trmrkComp/TrmrkComp';
import { TrmrkCompProps, DomElAttrs, DBL_CLICK_DEFAULT_MILLIS } from '../trmrkComp/TrmrkCompProps';

const MouseDblClickable = (props: MouseDblClickableProps) => {
    const dblClickMillis = props.dblClickMillis ?? DBL_CLICK_DEFAULT_MILLIS;
    const [lastMouseUpMillis, setLastMouseUpMillis] = useState(0);
    const [mouseBtnPressedExtraCssClass, setMouseBtnPressedExtraCssClass] = useState<string | null>(null);

    const onMouseDown = (e: MouseEvent) => {
        if (props.mouseBtnPressedCssClasses) {
            switch (e.button) {
                case 0:
                    if (props.mouseBtnPressedCssClasses.btn0) {
                        setMouseBtnPressedExtraCssClass(props.mouseBtnPressedCssClasses.btn0);
                    }
                    break;
                case 1:
                    if (props.mouseBtnPressedCssClasses.btn1) {
                        setMouseBtnPressedExtraCssClass(props.mouseBtnPressedCssClasses.btn1);
                    }
                    break;
                case 2:
                    if (props.mouseBtnPressedCssClasses.btn2) {
                        setMouseBtnPressedExtraCssClass(props.mouseBtnPressedCssClasses.btn2);
                    }
                    break;
            }
        }

        if (props.onMouseDown) {
            props.onMouseDown(e);
        }
    }

    const onMouseUp = (e: MouseEvent) => {
        let mouseDownMillis = 0;

        if (e.button === 0) {
            mouseDownMillis = new Date().getTime();
        }

        if (props.onMouseUp) {
            props.onMouseUp(e);
        }

        if (e.button === 0) {
            if (lastMouseUpMillis > 0 && mouseDownMillis - lastMouseUpMillis <= dblClickMillis) {
                if (props.onDoubleClick) {
                    props.onDoubleClick(e);
                }
            } else {
                setLastMouseUpMillis(mouseDownMillis);
                if (props.onClick) {
                    props.onClick(e);
                }
            }
        } else if (e.button === 1) {
            if (props.onMiddleClick) {
                props.onMiddleClick(e);
            }
        } else if (e.button === 2) {
            if (props.onRightClick) {
                props.onRightClick(e);
            }
        }

        setMouseBtnPressedExtraCssClass(null);
    }

    const domElAttrs = ({ ...props.domElAttrs } ?? {
    }) as DomElAttrs;

    domElAttrs.onMouseUp = onMouseUp;
    domElAttrs.onMouseDown = onMouseDown;
    domElAttrs.className = `${domElAttrs.className ?? ""} ${mouseBtnPressedExtraCssClass ?? ""}`;

    const abstrCmpProps: TrmrkCompProps = {
        domElTagName: props.domElTagName,
        btstrpElType: props.btstrpElType,
        domElAttrs: domElAttrs,
    };

    return (<TrmrComp {...abstrCmpProps}>{ props.children }</TrmrComp>);
};

export default MouseDblClickable;
