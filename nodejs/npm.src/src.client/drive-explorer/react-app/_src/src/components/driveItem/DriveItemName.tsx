import React from "react";
import { ColProps } from 'reactstrap';

import "./DriveItem.scss";

import { DriveItemNameProps } from "./DriveItemProps";
import { MouseDblClickableProps } from "../../src.node.common.client/jsx-cmp/mouseDblClickable/MouseDblClickableProps";
import { BtstrpElType, DomElAttrs } from "../../src.node.common.client/jsx-cmp/trmrkComp/TrmrkCompProps";
import MouseDblClickable from "../../src.node.common.client/jsx-cmp/mouseDblClickable/MouseDblClickable";
import { trmrkCssClasses } from "../../src.node.common.client/dom.css-classes";

const DriveItemName = (props: DriveItemNameProps) => {
  const getItemNameCssClasses = () => {
    const cssClassesArr = [trmrkCssClasses.bootstrap.col, "trmrk-item-name"];

    const cssClasses = cssClassesArr.join(" ");
    return cssClasses;
  };

  const domElAttrs = {
    className: getItemNameCssClasses(),
    title: props.itemTooltipText,
  };

  const elProps = {
    btstrpElType: BtstrpElType.Col,
    domElAttrs: domElAttrs,
    onClick: props.onClick,
    onDoubleClick: props.onDoubleClick,
    onMiddleClick: props.onMiddleClick,
    onRightClick: props.onRightClick,
    mouseBtnPressedCssClasses: {
      btn0: "mouseBtn0Pressed",
      btn1: "mouseBtn1Pressed",
      btn2: "mouseBtn2Pressed",
    },
  } as MouseDblClickableProps;

  return <MouseDblClickable {...elProps}>{props.itemName}</MouseDblClickable>;
};

export default DriveItemName;
