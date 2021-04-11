import { MouseDblClickableProps } from "../../src.node.common.client/jsx-cmp/mouseDblClickable/MouseDblClickableProps";

export interface MyMouseDblClickableProps extends MouseDblClickableProps {
  onDelayedClick?: () => void;
}
