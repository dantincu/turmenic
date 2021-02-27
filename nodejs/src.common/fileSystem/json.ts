import fs from "fs";

export const loadJsonFromFile = (
  filePath: string,
  reviver?: (this: any, key: string, value: any) => any
): any => {
  const rawdata = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawdata.toString("utf8"), reviver);

  return jsonData;
};

export const loadJsonInto = (filePath: string, obj: any) => {
  const jsonData = loadJsonFromFile(filePath);

  if (typeof obj == "object") {
    for (const [key, value] of Object.entries(jsonData)) {
      obj[key] = value;
    }
  }

  return jsonData;
};
