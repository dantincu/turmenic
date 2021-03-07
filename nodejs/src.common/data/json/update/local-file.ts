import path from "path";

import {
  EnvConfig,
  envBaseDir,
} from "../../../../src.common/appSettings/envConfig.js";

import {
  readdirAsync,
  mkdirAsync,
  copyAsync,
  removeEntryAsync,
} from "../../../../src.common/fileSystem/index.js";

import { DataCollectionBase, DataSourceBase } from "../data-collection.js";
import { compareVersions } from "../../../text/pckg.js";
import { UpdateEngineBase } from "./engine.js";

import { DataSourceUpdateOptions } from "./index.js";

import { DataSourceMetadata } from "../data-collection.js";

import { DataSourceUpdateBase } from "./data-source.js";

import {
  LocalFileCollectionBase,
  LocalFileDataSourceBase,
  LocalFileDataSourceOptions,
} from "../local-file.js";

export abstract class LocalFileDataSourceUpdateBase<
  TDataSource extends LocalFileDataSourceBase,
  TMetadataCollection extends LocalFileCollectionBase<
    DataSourceMetadata,
    DataSourceMetadata
  >
> extends DataSourceUpdateBase<TMetadataCollection> {
  envConfig: EnvConfig;
  localFileDataSource: TDataSource;
  dataSourceDirRelPath: string;
  dataSourceDirPath: string;
  updateTime: Date;
  dataDirEntries: string[];

  constructor(opts: DataSourceUpdateOptions<TMetadataCollection>) {
    super(opts);

    this.envConfig = this.dataSource.envConfig;
    this.localFileDataSource = <TDataSource>this.dataSource;

    this.dataSourceDirRelPath = this.localFileDataSource.dataSourceDirRelPath;
    this.dataSourceDirPath = this.envConfig.getEnvRelPath(envBaseDir.data);
    this.updateTime = new Date();
    this.dataDirEntries = [];
  }

  async onBeforeLoadAllData(): Promise<void> {}
  async onAfterLoadAllData(): Promise<void> {}

  async onBeforeSaveAllData(): Promise<void> {
    await this.backupDataDir();
    await this.emptyDataDir();
  }

  async onAfterSaveAllData(): Promise<void> {}

  async emptyDataDir() {
    await this.deleteEntries(this.dataDirEntries);
  }

  async backupDataDir() {
    this.dataDirEntries = await readdirAsync(this.dataSourceDirPath);
    const backupDirPath = await this.createBackupDir(this.updateTime);
    await this.backupEntries(this.dataDirEntries, backupDirPath);
  }

  async deleteEntries(entries: string[]) {
    for (let i = 0; i < entries.length; i++) {
      await this.deleteEntry(entries[i]);
    }
  }

  async backupEntries(entries: string[], backupDirPath: string) {
    for (let i = 0; i < entries.length; i++) {
      await this.copyEntry(entries[i], backupDirPath);
    }
  }

  async copyEntry(entryPath: string, backupDirPath: string) {
    const fileName = path.basename(entryPath);
    const destFilePath = path.join(backupDirPath, fileName);

    await copyAsync(entryPath, destFilePath);
  }

  async deleteEntry(entryPath: string) {
    await removeEntryAsync(entryPath);
  }

  async createBackupDir(updateTime: Date) {
    const backupDirPath = this.getBackupDirPath(updateTime);
    await mkdirAsync(backupDirPath);

    return backupDirPath;
  }

  getBackupDirPath(updateTime: Date) {
    const backupDirName = this.getBackupDirName(updateTime);
    const backupDirPath = path.join(this.dataSourceDirPath, backupDirName);

    return backupDirPath;
  }

  getBackupDirName(updateTime: Date) {
    const backupDirName = `__BCKP__${updateTime.getTime()}__`;
    return backupDirName;
  }
}
