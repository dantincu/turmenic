import { appConsole } from "../../src.common/logging/appConsole.js";

import {
  StckTrcy,
  StckTrcyEntryFileType,
  StckTrcyEntry,
  StckTrcyExtractor,
} from "../../src.node.common/stacktracey/stacktracey.js";

export const runTest = async () => {
  const extractor = new StckTrcyExtractor({});
  const stckTrcy = extractor.get({});

  appConsole.log("stckTrcy", stckTrcy);
  appConsole.log(
    " ==== >>>> \\\\\\\\ |||| //// <<<< ==== >>>> \\\\\\\\ |||| //// <<<< ==== "
  );

  /* stckTrcy.allEntries.forEach((entry) => {
    appConsole.log(entry.stckTrcyEntry);
  }); */
};

await runTest();
