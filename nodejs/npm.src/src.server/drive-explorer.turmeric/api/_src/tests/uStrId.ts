import { uStrId } from "../src.node.common/data/uStrId.js";

export const genBase64Charset = () => {
  const charsArr: string[] = [];

  for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
    charsArr.push(String.fromCharCode(i));
  }

  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    charsArr.push(String.fromCharCode(i));
  }

  for (let i = "0".charCodeAt(0); i <= "9".charCodeAt(0); i++) {
    charsArr.push(String.fromCharCode(i));
  }

  charsArr.push("+");
  charsArr.push("/");

  const charset = charsArr.join("");
  return charset;
};

const runTest = (count: number) => {
  const startTime = new Date();
  // const arr: string[] = [];

  for (let i = 0; i < count; i++) {
    // arr.push(uStrId());
    uStrId();
  }

  const endTime = new Date();

  // console.log("RESULT DATA", arr);

  console.log(
    `MILLIS ELAPSED FOR ${count}: ${endTime.getTime() - startTime.getTime()}`
  );

  /* console.log();
  console.log(" >>>> ");
  console.log();
  console.log(`STARTING TEST FOR ${count} IDS`);
  console.log("START TIME", startTime);
  console.log("END TIME", endTime);
  console.log("MILLIS ELAPSED", endTime.getTime() - startTime.getTime());
  console.log();
  console.log(" >>>> ");
  console.log(); */
};

runTest(250);
runTest(500);
runTest(1000);
runTest(2500);
runTest(5000);
runTest(10000);

/*
SAMPLE OUTPUT:
MILLIS ELAPSED FOR 250: 5
MILLIS ELAPSED FOR 500: 3
MILLIS ELAPSED FOR 1000: 8
MILLIS ELAPSED FOR 2500: 12
MILLIS ELAPSED FOR 5000: 31
MILLIS ELAPSED FOR 10000: 36


MILLIS ELAPSED FOR 250: 6
MILLIS ELAPSED FOR 500: 3
MILLIS ELAPSED FOR 1000: 8
MILLIS ELAPSED FOR 2500: 12
MILLIS ELAPSED FOR 5000: 27
MILLIS ELAPSED FOR 10000: 33


MILLIS ELAPSED FOR 250: 6
MILLIS ELAPSED FOR 500: 3
MILLIS ELAPSED FOR 1000: 8
MILLIS ELAPSED FOR 2500: 12
MILLIS ELAPSED FOR 5000: 24
MILLIS ELAPSED FOR 10000: 50


MILLIS ELAPSED FOR 250: 6
MILLIS ELAPSED FOR 500: 3
MILLIS ELAPSED FOR 1000: 8
MILLIS ELAPSED FOR 2500: 14
MILLIS ELAPSED FOR 5000: 25
MILLIS ELAPSED FOR 10000: 33
*/
