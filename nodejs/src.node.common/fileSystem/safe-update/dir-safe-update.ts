import { createDirPathRec } from "../dir-hierarchy.js";
import { renameAsync, copyAsync, rmAsync } from "../types.js";

import {
  readDirIfExists,
  removeDirIfExists,
  removeFileIfExists,
  removeDirWithContentAsync,
  tryRemoveDirWithContentAsync,
} from "../fileSystem.js";

import { copyDirAsync } from "../dir-hierarchy.js";

import {
  SafeUpdateOpts,
  TempEntryNameOpts,
  validateNormalizeSafeUpdateOpts,
  prepareSafeUpdate,
} from "./safe-update.base.js";

export const makeDirSafeUpdate = async (opts: SafeUpdateOpts) => {
  const normOpts = await prepareSafeUpdate(opts);

  if (normOpts.entryPathExists) {
    await copyDirAsync(normOpts.entryPath, normOpts.prevEntryPath);
  }

  await createDirPathRec(normOpts.nextEntryPath);
  const retVal = await opts.updateFunc(normOpts.nextEntryPath);

  if (retVal) {
    if (normOpts.entryPathExists) {
      await removeDirWithContentAsync(normOpts.entryPath);
    }

    await renameAsync(normOpts.nextEntryPath, normOpts.entryPath);

    if (normOpts.entryPathExists) {
      await removeDirWithContentAsync(normOpts.prevEntryPath);
    }
  }

  return retVal;
};
