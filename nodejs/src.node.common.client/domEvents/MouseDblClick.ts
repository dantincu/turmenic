import { Subject } from "rxjs";

export class MouseDblClick {
  mouseDblClickMillis: number;
  mouseDownTimeMillis: number;

  singleClickSubject: Subject<void>;
  doubleClickSubject: Subject<void>;

  singleClickTimeout: NodeJS.Timeout | null;

  constructor(mouseDblClickMillis?: number) {
    this.mouseDblClickMillis = mouseDblClickMillis ?? 300;
    this.mouseDownTimeMillis = 0;

    this.singleClickSubject = new Subject<void>();
    this.doubleClickSubject = new Subject<void>();

    this.singleClickTimeout = null;
  }

  onMouseDown() {
    const mouseDownTimeMillis = new Date().getTime();

    if (
      this.mouseDownTimeMillis > 0 &&
      mouseDownTimeMillis - this.mouseDownTimeMillis <= this.mouseDblClickMillis
    ) {
      if (this.singleClickTimeout) {
        clearTimeout(this.singleClickTimeout);
      }

      this.mouseDownTimeMillis = 0;
      this.doubleClickSubject.next();
    } else {
      this.mouseDownTimeMillis = mouseDownTimeMillis;

      this.singleClickTimeout = setTimeout(() => {
        this.mouseDownTimeMillis = 0;

        this.singleClickSubject.next();
      }, this.mouseDblClickMillis);
    }
  }
}
