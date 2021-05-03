import { appConsole } from "../../../../src.common/logging/appConsole.js";

const func1 = (x: number) => {
  appConsole.log("func1", x);
};

const func2 = (x: number, y: number) => {
  appConsole.log("func2", x, y);
};

const func3 = (x: number) => {
  appConsole.log("func3", x);
};

export const runTest = async () => {
  const f1 = func1;
  const f2 = (x, y) => f1(x);
  const f3 = (x) => f2(x, 9);

  f3(3);
};

await runTest();
