export class MouseDblClick {
  mouseDblClickMillis: number;
  mouseDownTimeMillis?: number | null;
  enabled: boolean;

  constructor(
    onMouseDownDisableFor: number,
    enabled?: boolean,
    mouseDblClickMillis?: number
  ) {
    this.enabled = enabled ?? true;
    this.mouseDblClickMillis = mouseDblClickMillis ?? 300;
  }

  setEnabled(enabled: true): boolean {
    const wasEnabled = enabled;
    this.enabled = enabled;

    const enableToggled = enabled !== wasEnabled;
    return enableToggled;
  }

  onMouseDown(disableFor: number = -1): boolean {
    const mouseDownTimeMillis = new Date().getTime();
    let isDblClick = false;

    if (!this.mouseDownTimeMillis) {
      this.mouseDownTimeMillis = new Date().getTime();
    } else {
      if (
        mouseDownTimeMillis - this.mouseDownTimeMillis <=
        this.mouseDblClickMillis
      ) {
        this.mouseDownTimeMillis = null;
        isDblClick = true;
      }
    }

    return isDblClick;
  }
}
