import { readFileAsync } from "./index.js";

export const loadJsonFromFileAsync = async (
  filePath: string,
  reviver?: (this: any, key: string, value: any) => any
): Promise<any> => {
  const rawdata = await readFileAsync(filePath);
  const jsonData = JSON.parse(rawdata.toString("utf8"), reviver);

  return jsonData;
};

export const loadJsonAsyncInto = async (
  filePath: string,
  obj: any
): Promise<any> => {
  const jsonData = await loadJsonFromFileAsync(filePath);

  if (typeof obj == "object") {
    for (const [key, value] of Object.entries(jsonData)) {
      obj[key] = value;
    }
  }

  return jsonData;
};
