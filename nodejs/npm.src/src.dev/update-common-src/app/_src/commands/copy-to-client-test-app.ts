import path from "path";

import { turmerikRepoPaths } from "../src/appSettings/updateTurmerikCommonSrc/moduleConfig.js";
import {
  CopySourceFolders,
  applyCmdLineArgsToOpts,
} from "../src/source-code/copy-source-code.js";

const copySourceFolders = new CopySourceFolders(
  applyCmdLineArgsToOpts({
    srcDirBasePath: turmerikRepoPaths.basePath,
    destDirBasePath: turmerikRepoPaths.clientTestAppSrcPath,
    srcDirNames: turmerikRepoPaths.commonclientFolderNames,
    ignoreConflicts: false,
  })
);

await copySourceFolders.copyFolders();
