import { CopySourceFoldersOpts } from "./source-code.js";
import { PLATFORM_NEW_LINE } from "../../src.node.common/text/new-line.js";

export interface CopySourceFoldersCmdLineArgs {
  ignoreConflicts: boolean;
}

export const getCmdLineArgs = () => {
  const rawArgs = process.argv.slice(2);

  const args = {
    ignoreConflicts: rawArgs.indexOf("--igCf") >= 0,
  } as CopySourceFoldersCmdLineArgs;

  return args;
};

export const applyCmdLineArgsToOpts = (opts: CopySourceFoldersOpts) => {
  const args = getCmdLineArgs();

  opts.ignoreConflicts = args.ignoreConflicts;
  opts.newLineStr = opts.newLineStr ?? PLATFORM_NEW_LINE;
  return opts;
};
