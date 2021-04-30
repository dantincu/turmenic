import { nameof } from "ts-simple-nameof";

import { addFileNameSuffix } from "../fileName.js";
import { normJoinPath } from "../path.js";
import { createDirPathRec } from "../dir-hierarchy.js";
import { assureEnoent } from "../fileSystem.js";

export interface TempEntryNameOpts {
  entryName?: string | null | undefined;
  getEntryName?: ((entryName: string) => string) | null | undefined;
  entryNamePrefix?: string | null | undefined;
  entryNameSuffix?: string | null | undefined;
  entryNameSeparator?: string | null | undefined;
}

export interface SafeUpdateOpts {
  parentDirPath: string;
  entryName: string;
  updateFunc: (nextEntryPath: string) => Promise<boolean>;
  assureParentDirPath?: boolean | null | undefined;
  nextEntryName?: TempEntryNameOpts | null | undefined;
  prevEntryName?: TempEntryNameOpts | null | undefined;
}

export interface SafeUpdateNormOpts {
  entryPath: string;
  nextEntryPath: string;
  prevEntryPath: string;
}

const normalizeTempEntryNameOpts = (
  entryName: string,
  defaultSuffix: string,
  opts?: TempEntryNameOpts | null | undefined
) => {
  opts = opts ?? {
    entryNameSuffix: defaultSuffix,
  };

  opts.entryNameSeparator = opts.entryNameSeparator || "-";

  if (!opts.entryName) {
    if (opts.getEntryName) {
      opts.entryName = opts.getEntryName(entryName);
    } else if (opts.entryNameSuffix) {
      opts.entryName = addFileNameSuffix(
        entryName,
        opts.entryNameSuffix,
        opts.entryNameSeparator
      );
    } else if (opts.entryNamePrefix) {
      opts.entryName = [opts.entryNamePrefix, entryName].join(
        opts.entryNameSeparator
      );
    }
  }

  return opts;
};

const validateSafeUpdateOptsReqProp = (
  opts: SafeUpdateOpts,
  prop: (o: SafeUpdateOpts) => any
) => {
  const propName = nameof(prop);
  const propVal = opts[propName];

  if (!propVal && typeof propVal !== "boolean") {
    throw new Error(`Invalid safe update opts: prop ${propName} is required!`);
  }
};

const validateAllSafeUpdateOptsProp = (opts: SafeUpdateOpts) => {
  const propArr: ((o: SafeUpdateOpts) => any)[] = [
    (opts) => opts.parentDirPath,
    (opts) => opts.entryName,
    (opts) => opts.updateFunc,
  ];

  propArr.forEach((prop) => {
    validateSafeUpdateOptsReqProp(opts, prop);
  });
};

export const getDefaultTempEntryNameOpts = (suffix: string) => {
  const opts: TempEntryNameOpts = {
    entryNameSuffix: suffix,
    entryNameSeparator: "-",
  };

  return opts;
};

export const validateNormalizeSafeUpdateOpts = (opts: SafeUpdateOpts) => {
  validateAllSafeUpdateOptsProp(opts);

  opts.nextEntryName = normalizeTempEntryNameOpts(
    opts.entryName,
    "next",
    opts.nextEntryName
  );
  opts.prevEntryName = normalizeTempEntryNameOpts(
    opts.entryName,
    "prev",
    opts.prevEntryName
  );

  const normOpts: SafeUpdateNormOpts = {
    entryPath: normJoinPath([opts.parentDirPath, opts.entryName]),
    nextEntryPath: normJoinPath([
      opts.parentDirPath,
      opts.nextEntryName?.entryName as string,
    ]),
    prevEntryPath: normJoinPath([
      opts.parentDirPath,
      opts.prevEntryName?.entryName as string,
    ]),
  };

  return normOpts;
};

export const prepareSafeUpdate = async (opts: SafeUpdateOpts) => {
  const normOpts = validateNormalizeSafeUpdateOpts(opts);

  if (opts.assureParentDirPath) {
    await createDirPathRec(opts.parentDirPath);
  }

  await assureEnoent(normOpts.prevEntryPath);
  await assureEnoent(normOpts.nextEntryPath);

  return normOpts;
};
