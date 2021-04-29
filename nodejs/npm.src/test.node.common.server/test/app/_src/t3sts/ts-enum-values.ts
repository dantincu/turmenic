import { appConsole } from "../src.common/logging/appConsole.js";

enum E {
  e1 = "e1",
  e2 = "e2",
  e3 = "e3",
  e4 = "e4",
}

const runTest = () => {
  appConsole.log(Object.values(E));
};

runTest();
