import path from "path";

import { trimEndReplaceOnce } from "../../src.common/text/str-replace.js";
import { strReplaceAll } from "../../src.common/text/utils.js";

export interface NormalizePathOpts {
  pathSeparatorChar?: string | null | undefined;
}

export const rebasePath = (
  srcPath: string,
  srcBasePath: string,
  destBasePath: string
) => {
  const relPath = getRelPath(srcPath, srcBasePath);
  const destPath = path.join(destBasePath, relPath);

  return destPath;
};

export const getRelPath = (fsPath: string, basePath: string) => {
  fsPath = path.normalize(fsPath);
  basePath = path.normalize(basePath);

  let retPath = fsPath;

  if (retPath.startsWith(basePath)) {
    retPath = retPath.substring(basePath.length);

    if ((retPath.startsWith("/") || retPath.startsWith("\\")) === false) {
      throw new Error(`File path ${fsPath} is not a subpath of ${basePath}`);
    }

    retPath = retPath.substring(1);

    if (retPath.startsWith("/") || retPath.startsWith("\\")) {
      throw new Error(`Invalid path ${fsPath} as a subpath of ${basePath}`);
    }
  } else {
    throw new Error(`File path ${fsPath} is not a subpath of ${basePath}`);
  }

  return retPath;
};

export const joinPath = (
  pathParts: string[],
  opts?: NormalizePathOpts | null | undefined
) => {
  opts = opts ?? {};
  let retPath = path.join(...pathParts);

  if (opts.pathSeparatorChar) {
    retPath = strReplaceAll(retPath, /[\/\\]/g, opts.pathSeparatorChar);
  }

  return retPath;
};

export const normalizePath = (
  pathArg: string,
  opts?: NormalizePathOpts | null | undefined
) => {
  opts = opts ?? {};

  pathArg = path.normalize(pathArg);

  pathArg = trimEndReplaceOnce(pathArg, {
    trimWhiteSpace: true,
    replExpr: [
      { key: ".", value: "" },
      { key: "/", value: "" },
      { key: "\\", value: "" },
    ],
  });

  if (opts.pathSeparatorChar) {
    pathArg = strReplaceAll(pathArg, /[\/\\]/g, opts.pathSeparatorChar);
  }

  return pathArg;
};
