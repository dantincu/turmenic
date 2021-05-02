import { createDirPathRec } from "../dir-hierarchy.js";
import { renameAsync, copyAsync, rmAsync } from "../types.js";

import {
  readDirIfExists,
  removeFileIfExists,
  readFileIfExists,
} from "../fileSystem.js";

import { removeFileAsync } from "../types.js";

import {
  SafeUpdateOpts,
  TempEntryNameOpts,
  validateNormalizeSafeUpdateOpts,
  prepareSafeUpdate,
} from "./safe-update.base.js";

export const makeFileSafeUpdate = async (opts: SafeUpdateOpts) => {
  const normOpts = await prepareSafeUpdate(opts);

  if (normOpts.entryPathExists) {
    await copyAsync(normOpts.entryPath, normOpts.prevEntryPath);
  }

  const retVal = await opts.updateFunc(normOpts.nextEntryPath);

  if (retVal) {
    if (normOpts.entryPathExists) {
      await removeFileAsync(normOpts.entryPath);
    }

    await renameAsync(normOpts.nextEntryPath, normOpts.entryPath);

    if (normOpts.entryPathExists) {
      await rmAsync(normOpts.prevEntryPath);
    }
  }

  return retVal;
};
