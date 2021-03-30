import React from "react";
import { ColProps } from 'reactstrap';

import "./DriveItem.scss";

import { DriveItemNameProps } from "./DriveItemProps";
import { MouseDblClickableProps } from "../../jsx-cmp/mouseDblClickable/MouseDblClickableProps";
import { BtstrpElType, DomElAttrs } from "../../jsx-cmp/trmrComp/TrmrCompProps";
import MouseDblClickable from "../../jsx-cmp/mouseDblClickable/MouseDblClickable";
import { cssClss } from "../const";

const DriveItemName = (props: DriveItemNameProps) => {
  const getItemNameCssClasses = () => {
    const cssClassesArr = [cssClss.trmrk.bootstrap.col, "trmrk-item-name"];

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
