import fs from "fs";
import util from "util";
import fsExtra from "fs-extra";

export const readFileAsync = util.promisify(fs.readFile);
export const writeFileAsync = util.promisify(fs.writeFile);
export const getEntryStatsAsync = util.promisify(fs.stat);
export const mkdirAsync = util.promisify(fs.mkdir);
export const rmdirAsync = util.promisify(fs.rmdir);
export const readdirAsync = util.promisify(fs.readdir);
export const copyAsync = util.promisify(fsExtra.copy);
export const removeDirAsync = util.promisify(fsExtra.remove);
export const emptyDirAsync = util.promisify(fsExtra.emptyDir);
export const removeFileAsync = util.promisify(fs.rm);

export const getFileLastModifiedTime = async (filePath: string) => {
  const fileStats = await getEntryStatsAsync(filePath);
  return fileStats.mtime;
};

export const createDirIfNotExisting = async (dirPath: string) => {
  try {
    await mkdirAsync(dirPath);
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
};

export const readFileIfExists = async (filePath: string) => {
  let content: string | null = null;

  try {
    content = (await readFileAsync(filePath)).toString("utf8") ?? "";
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  return content;
};

export const isDirEntry = async (dirPath: string) => {
  const dirStats = await getEntryStatsAsync(dirPath);
  const isDir = dirStats.isDirectory();

  return isDir;
};

export const removeDirWithContentAsync = async (dirPath: string) => {
  await emptyDirAsync(dirPath);
  await rmdirAsync(dirPath);
};

export const removeEntryAsync = async (entryPath: string) => {
  const isDir = await isDirEntry(entryPath);

  if (isDir) {
    await removeDirWithContentAsync(entryPath);
  } else {
    await removeFileAsync(entryPath);
  }
};
