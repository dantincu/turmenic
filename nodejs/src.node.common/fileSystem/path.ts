import path from "path";

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
