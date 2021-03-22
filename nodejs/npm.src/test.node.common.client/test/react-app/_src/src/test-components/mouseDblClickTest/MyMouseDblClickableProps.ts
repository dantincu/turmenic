import { MouseDblClickableProps } from "../../jsx-cmp/mouseDblClickable/MouseDblClickableProps";

export interface MyMouseDblClickableProps extends MouseDblClickableProps {
  onDelayedClick?: () => void;
}
