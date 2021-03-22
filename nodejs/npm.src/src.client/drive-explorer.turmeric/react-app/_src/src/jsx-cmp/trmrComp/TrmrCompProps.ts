import { MouseEvent } from "react";

export enum DomElTag {
  div,
  span,
  button,
  input,
  label,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  textarea,
}

export enum BtstrpElType {
  Container,
  Row,
  Col,
}

export interface DomElAttrs {
  id?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
}

export interface ButtonDomElAttrs extends DomElAttrs {
  type?: "button" | "submit" | "reset";
  value?: string;
}

export interface InputDomElAttrs extends DomElAttrs {
  type?: string;
  value?: string;
}

export interface TrmrCompProps {
  domElTagName?: DomElTag;
  btstrpElType?: BtstrpElType;
  domElAttrs?: DomElAttrs;
  children?: JSX.Element[] | any;
}

export const DBL_CLICK_DEFAULT_MILLIS = 300;
