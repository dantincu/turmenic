import { MouseEvent } from "react";

import { TrmrCompProps } from "../trmrComp/TrmrCompProps";

export interface MouseBtnPressedCssClasses {
  btn0?: string;
  btn1?: string;
  btn2?: string;
}

export interface MouseDblClickableProps extends TrmrCompProps {
  onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
  dblClickMillis?: number;
  onDoubleClick?: (e: MouseEvent) => void;
  onMiddleClick?: (e: MouseEvent) => void;
  onRightClick?: (e: MouseEvent) => void;
  mouseBtnPressedCssClasses?: MouseBtnPressedCssClasses;
}
