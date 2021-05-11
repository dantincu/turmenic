import fs from "fs";
import path from "path";

import { envConfig, envBaseDir } from "../appSettings/envConfig.js";

import { strReplaceAll } from "../../src.common/text/utils.js";
import { createDirPathRec } from "../fileSystem/dir-hierarchy.js";
import { writeFileAsync } from "../fileSystem/types.async.js";

const appEnv = await envConfig.appEnv.instance();

export interface RedirectStdStreamsOpts {
  outputDirRelPath: string;
}

const createOutputDirPath = async (opts: RedirectStdStreamsOpts) => {
  const outputDirPath = appEnv.getEnvRelPath(
    envBaseDir.data,
    opts.outputDirRelPath,
    "process.streams"
  );

  await createDirPathRec(outputDirPath);
  return outputDirPath;
};

const createOutputFilePath = async (
  outputDirPath: string,
  name: string,
  date: Date
) => {
  const millis = date.getTime();
  const dateStr = strReplaceAll(date.toJSON(), ":", "_");

  const fileName = `std.${name}-${dateStr}-${millis}.txt`;
  const filePath = path.join(outputDirPath, fileName);

  await writeFileAsync(filePath, "");
  return filePath;
};

export const redirectStdStreams = async (opts: RedirectStdStreamsOpts) => {
  const date = new Date();
  const outputDirPath = await createOutputDirPath(opts);

  const outputFilePath = await createOutputFilePath(outputDirPath, "out", date);
  const errorFilePath = await createOutputFilePath(outputDirPath, "err", date);

  const outAccess = fs.createWriteStream(outputFilePath);
  const errAccess = fs.createWriteStream(errorFilePath);

  /*
  // Extended base methods
        write(buffer: Uint8Array | string, cb?: (err?: Error) => void): boolean;
        write(str: Uint8Array | string, encoding?: BufferEncoding, cb?: (err?: Error) => void): boolean;
  */

  process.stdout.write = outAccess.write.bind(outAccess) as {
    (
      buffer: string | Uint8Array,
      cb?: ((err?: Error | undefined) => void) | undefined
    ): boolean;
    (
      str: string | Uint8Array,
      encoding?: BufferEncoding | undefined,
      cb?: ((err?: Error | undefined) => void) | undefined
    ): boolean;
  };

  process.stderr.write = errAccess.write.bind(errAccess) as {
    (
      buffer: string | Uint8Array,
      cb?: ((err?: Error | undefined) => void) | undefined
    ): boolean;
    (
      str: string | Uint8Array,
      encoding?: BufferEncoding | undefined,
      cb?: ((err?: Error | undefined) => void) | undefined
    ): boolean;
  };
};
