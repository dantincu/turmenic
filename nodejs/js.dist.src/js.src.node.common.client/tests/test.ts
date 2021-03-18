import { getEnumStrKeys } from "../src.common/utils/enums.js";

enum MyTestEnum1 {
  x1,
  x2,
  x3,
}

enum MyTestEnum2 {
  x1 = "x01",
  x2 = "x02",
  x3 = "x03",
}

console.log(getEnumStrKeys(MyTestEnum1));
console.log(getEnumStrKeys(MyTestEnum2));
