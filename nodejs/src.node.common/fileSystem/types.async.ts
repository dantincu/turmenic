import {
  PathLike,
  readdir,
  WriteFileOptions,
  writeFile,
  NoParamCallback,
} from "fs";

export const readdirAsync = async (
  path: PathLike,
  options?:
    | { encoding: BufferEncoding | null; withFileTypes?: false }
    | BufferEncoding
    | undefined
    | null
): Promise<string[]> => {
  const promise = new Promise(
    (
      resolve: (result: string[]) => void,
      reject: (err: NodeJS.ErrnoException | null) => void
    ) => {
      try {
        readdir(
          path,
          options ?? {
            encoding: "utf8",
          },
          (err, files) => {
            if (err) {
              reject(err);
            } else {
              resolve(files);
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    }
  );

  return promise;
};

export const readDirIfExists = async (dirPath: string) => {
  let dirEntries: string[] | null = null;

  try {
    dirEntries = await readdirAsync(dirPath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    } else {
    }
  }

  return dirEntries;
};

export const writeFileAsync = (
  path: PathLike | number,
  data: string | NodeJS.ArrayBufferView,
  options?: WriteFileOptions | undefined | null,
  callback?: NoParamCallback | undefined | null
): Promise<void> => {
  const promise = new Promise<void>((resolve, reject) => {
    writeFile(path, data, options ?? null, (err) => {
      if (callback) {
        callback(err);
      }

      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return promise;
};
