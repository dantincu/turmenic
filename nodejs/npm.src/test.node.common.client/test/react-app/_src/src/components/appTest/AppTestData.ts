import {
  AppMessagesState,
  AppTestMsg,
  AppTestMsgTypes,
  appTestMsgTypesEnumKeys,
} from "../../app/appMessagesSlice";

export interface AppTestMsgProps {
  msg: AppTestMsg;
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
