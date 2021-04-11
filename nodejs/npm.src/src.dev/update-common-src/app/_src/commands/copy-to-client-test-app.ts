import path from "path";

import { turmerikRepoPaths } from "../src/appSettings/updateTurmerikCommonSrc/moduleConfig.js";
import { CopySourceFolders } from "../src/source-code/copy-source-code.js";
import { CopySourceFoldersOpts } from "../src/source-code/source-code.js";

import { applyCmdLineArgsToOpts } from "../src/source-code/cmd-line-args.js";
import { FolderTsPrograms } from "..//src/ms-ts-compiler-api/tsProgram.js";

const copySourceFolders = new CopySourceFolders(
  applyCmdLineArgsToOpts({
    tsPrograms: new FolderTsPrograms(),
    srcDirBasePath: turmerikRepoPaths.basePath,
    destDirBasePath: turmerikRepoPaths.clientTestAppSrcPath,
    srcDirNames: turmerikRepoPaths.commonclientFolderNames,
    ignoreConflicts: false,
  } as CopySourceFoldersOpts)
);

await copySourceFolders.copyFolders();
