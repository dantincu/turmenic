import { readFileAsync, writeFileAsync, readFileIfExists } from "./index.js";

export const loadJsonFromFileAsync = async (
  filePath: string,
  reviver?: (this: any, key: string, value: any) => any
): Promise<any> => {
  const rawdata = await readFileAsync(filePath);
  const jsonData = JSON.parse(rawdata.toString("utf8"), reviver);

  return jsonData;
};

export const loadJsonFromFileOrDefault = async (
  filePath: string,
  defaultValue?: any,
  reviver?: (this: any, key: string, value: any) => any
): Promise<any> => {
  const textData = await readFileIfExists(filePath);
  const jsonData = textData ? JSON.parse(textData, reviver) : defaultValue;

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

export const saveJsonToFileAsync = async (obj: any, filePath: string) => {
  const json = JSON.stringify(obj);

  await writeFileAsync(filePath, json);
};
