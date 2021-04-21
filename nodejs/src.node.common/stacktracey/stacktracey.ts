import path from "path";
import StackTracey from "stacktracey";

import { strContainsAny } from "../../src.common/text/utils.js";
import { normalizePath, joinPath } from "../fileSystem/path.js";

import {
  trimEndReplaceOnce,
  trimStartReplaceOnce,
} from "../../src.common/text/str-replace.js";
import { appConsole } from "../../src.common/logging/appConsole.js";

interface StckTrcyEntryOpts {
  entry: StackTracey.Entry;
  stckTrcyEntry: StckTrcyEntry;
  entryIndex: number;
  entryArr: StackTracey.Entry[];
}

export class StckTrcyExtractor {
  appSrcDirPath: string;
  devStckTrcyItemsPaths: readonly string[];

  constructor(appSrcRelDirPath: string = "./dist") {
    this.appSrcDirPath = this.getAppSrcDirPath(appSrcRelDirPath);

    this.devStckTrcyItemsPaths = this.getDevStckTrcyItemsPaths(
      this.appSrcDirPath
    );
  }

  static readonly FileSchemePrefix = "file://";
  static readonly NodeModulesDirName = "node_modules";
  static readonly StckTrcyPckName = "stacktracey";

  static readonly StckTrcyPckItemsRelPaths = Object.freeze([
    "node_modules/stacktracey/stacktracey.js",
  ]);

  static readonly DevStckTrcyItemsRelPaths = Object.freeze([
    "src.node.common/stacktracey/stacktracey.js",
  ]);

  private static AppSrcDirBasePath = "";
  private static StckTrcyPckItemsPaths: readonly string[];

  public get() {
    const stack = new StackTracey(undefined, 0);
    const allEntries: StckTrcyEntry[] = [];

    stack.items.forEach((entry, idx, arr) => {
      allEntries.push(
        this.getEntry({
          entry: entry,
          entryIndex: idx,
          entryArr: arr,
          stckTrcyEntry: {
            filePath: "",
            relFilePath: "",
            devRelFilePath: "",
            nodeModulesRelFilePath: "",
            nodeModuleName: "",
            entryFileType: StckTrcyEntryFileType.nodeJsInternal,
            stckTrcyEntry: entry,
            stckTrcyEntryIndex: idx,
          },
        })
      );
    });

    const retStack = {
      allEntries: allEntries,
      devSrcEntries: allEntries.filter(
        (entry) => entry.entryFileType === StckTrcyEntryFileType.dev
      ),
      stckTrcyPckgEntries: allEntries.filter(
        (entry) => entry.entryFileType === StckTrcyEntryFileType.stckTrcyPck
      ),
      nodeJsInternalEntries: allEntries.filter(
        (entry) => entry.entryFileType === StckTrcyEntryFileType.nodeJsInternal
      ),
      appSrcDirPath: this.appSrcDirPath,
      appSrcDirBasePath: StckTrcyExtractor.AppSrcDirBasePath,
    } as StckTrcy;

    return retStack;
  }

  getEntry(opts: StckTrcyEntryOpts): StckTrcyEntry {
    if (this.getSrcFileEntry(opts) !== null) {
      this.getDevEntry(opts);
    } else if (this.getNodeModulesEntryOrNull(opts) === null) {
      opts.stckTrcyEntry.entryFileType = StckTrcyEntryFileType.nodeJsInternal;
    }

    return opts.stckTrcyEntry;
  }

  getSrcFileEntry(opts: StckTrcyEntryOpts) {
    let retEntry: StckTrcyEntry | null = null;

    if (opts.entry.file.startsWith(`${StckTrcyExtractor.FileSchemePrefix}/`)) {
      this.fillSrcFileEntryPaths(opts);
      retEntry = opts.stckTrcyEntry;
    }

    return retEntry;
  }

  fillSrcFileEntryPaths(opts: StckTrcyEntryOpts) {
    opts.stckTrcyEntry.filePath = trimStartReplaceOnce(opts.entry.file, {
      replExpr: [{ key: `${StckTrcyExtractor.FileSchemePrefix}/`, value: "" }],
    });

    opts.stckTrcyEntry.relFilePath = trimStartReplaceOnce(
      opts.stckTrcyEntry.filePath,
      {
        replExpr: [
          { key: `${StckTrcyExtractor.AppSrcDirBasePath}/`, value: "" },
        ],
      }
    );
  }

  getNodeModulesEntryOrNull(opts: StckTrcyEntryOpts) {
    let retEntry: StckTrcyEntry | null = null;

    if (
      joinPath([StckTrcyExtractor.AppSrcDirBasePath, opts.entry.fileRelative], {
        pathSeparatorChar: "/",
      }) === opts.entry.file
    ) {
      const nodeModulesRelFilePathParts = opts.entry.fileRelative
        .split("/")
        .slice(1);

      opts.stckTrcyEntry.nodeModulesRelFilePath = nodeModulesRelFilePathParts.join(
        "/"
      );
      opts.stckTrcyEntry.nodeModuleName = nodeModulesRelFilePathParts[0];

      this.fillSrcFileEntryPaths(opts);

      if (
        opts.stckTrcyEntry.nodeModuleName === StckTrcyExtractor.StckTrcyPckName
      ) {
        opts.stckTrcyEntry.entryFileType = StckTrcyEntryFileType.stckTrcyPck;
      } else {
        opts.stckTrcyEntry.entryFileType = StckTrcyEntryFileType.nodeModule;
      }

      retEntry = opts.stckTrcyEntry;
    }

    return retEntry;
  }

  getDevEntry(opts: StckTrcyEntryOpts) {
    opts.stckTrcyEntry.devRelFilePath = trimStartReplaceOnce(
      opts.stckTrcyEntry.filePath,
      {
        replExpr: [{ key: `${this.appSrcDirPath}/`, value: "" }],
      }
    );

    if (
      StckTrcyExtractor.DevStckTrcyItemsRelPaths.find((relFilePath) => {
        const filePath = joinPath([this.appSrcDirPath, relFilePath], {
          pathSeparatorChar: "/",
        });

        const retVal = filePath === opts.stckTrcyEntry.filePath;
        return retVal;
      })
    ) {
      opts.stckTrcyEntry.entryFileType = StckTrcyEntryFileType.devStckTrcy;
    } else {
      opts.stckTrcyEntry.entryFileType = StckTrcyEntryFileType.dev;
    }

    return opts.stckTrcyEntry;
  }

  getAppSrcDirBasePath() {
    let appSrcDirBasePath = StckTrcyExtractor.AppSrcDirBasePath;

    if (!appSrcDirBasePath) {
      const stack = new StackTracey(undefined, 0);

      appSrcDirBasePath = trimEndReplaceOnce(stack.items[0].file, {
        replExpr: [
          {
            key: `/${stack.items[0].fileRelative}`,
            value: "",
          },
        ],
      });

      StckTrcyExtractor.AppSrcDirBasePath = appSrcDirBasePath;

      StckTrcyExtractor.StckTrcyPckItemsPaths = Object.freeze(
        StckTrcyExtractor.StckTrcyPckItemsRelPaths.map((relPath) =>
          [appSrcDirBasePath, relPath].join("/")
        )
      );

      this.logStckTrcyExtractorStaticProps();
    }

    return appSrcDirBasePath;
  }

  getAppSrcDirPath(appSrcRelDirPath: string) {
    const appSrcDirBasePath = this.getAppSrcDirBasePath();

    let appSrcDirPath = joinPath([appSrcDirBasePath, appSrcRelDirPath], {
      pathSeparatorChar: "/",
    });

    appSrcDirPath = normalizePath(appSrcDirPath, {
      pathSeparatorChar: "/",
    });

    return appSrcDirPath;
  }

  getDevStckTrcyItemsPaths(appSrcDirPath: string) {
    const retArr = Object.freeze(
      StckTrcyExtractor.DevStckTrcyItemsRelPaths.map((relFilePath) =>
        path.join(appSrcDirPath, relFilePath)
      )
    );

    return retArr;
  }

  logStckTrcyExtractorStaticProps() {
    appConsole.log(
      "StckTrcyExtractor.AppSrcDirBasePath",
      StckTrcyExtractor.AppSrcDirBasePath
    );

    appConsole.log(
      "StckTrcyExtractor.DevStckTrcyItemsPaths",
      StckTrcyExtractor.StckTrcyPckItemsPaths
    );
  }
}

export interface StckTrcy {
  appSrcDirBasePath: string;
  appSrcDirPath: string;
  allEntries: StckTrcyEntry[];
  devSrcEntries: StckTrcyEntry[];
  stckTrcyPckgEntries: StckTrcyEntry[];
  nodeJsInternalEntries: StckTrcyEntry[];
}

export interface StckTrcyEntry {
  stckTrcyEntry: StackTracey.Entry;
  stckTrcyEntryIndex: number;

  filePath: string;
  relFilePath: string;
  devRelFilePath: string;
  nodeModulesRelFilePath: string;
  nodeModuleName: string;

  entryFileType: StckTrcyEntryFileType;
}

export enum StckTrcyEntryFileType {
  dev = 0,
  devStckTrcy = 1,
  stckTrcyPck = 2,
  nodeModule = 3,
  nodeJsInternal = 4,
}
