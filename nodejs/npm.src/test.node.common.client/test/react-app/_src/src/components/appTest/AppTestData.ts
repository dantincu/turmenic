import { getEnumStrKeys } from "../../js.common/dist/src.common/utils/enums.js";

export enum AppTestMsgTypes {
  t1 = 1,
  t2 = 2,
  t3 = 3,
  t4 = 4,
  t5 = 5,
  t6 = 6,
}

export const appTestMsgTypesEnumKeys = Object.freeze(
  getEnumStrKeys(AppTestMsgTypes)
);

export interface AppTestMsg {
  intIdx?: number;
  text: string;
}

export interface AppTestMsgProps {
  msg: AppTestMsg;
  msgType: AppTestMsgTypes;
}

export interface AppTestComponentProps {
  onAppMessage: (msg: AppTestMsg) => void;
}

export class AppTestRoute {
  public readonly routePathBase: string;

  constructor() {
    this.routePathBase = "/app-test";
  }

  public getRoutePath(relPath: string) {
    const routePath = `${this.routePathBase}/${relPath}`;
    return routePath;
  }
}

export const appTestRoute = new AppTestRoute();
