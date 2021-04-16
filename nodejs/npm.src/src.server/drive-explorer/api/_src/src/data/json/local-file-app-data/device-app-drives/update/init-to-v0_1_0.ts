import { EnvConfig } from "../../../../../../src.node.common/appSettings/envConfig.js";
import { DataSourceUpdateOptions } from "../../../../../../src.node.common/data/json/update/update.js";
import { DataSourceUpdateBase } from "../../../../../../src.node.common/data/json/update/data-source.js";

import {
  DataSourceMetadata,
  BLANK_VERSION_VALUE,
} from "../../../../../../src.node.common/data/json/data-collection.js";
import { UpdateEngineBase } from "../../../../../../src.node.common/data/json/update/engine.js";

import {
  AppDrive,
  AppSession,
} from "../../../../../../src.node.common/app-data/device-app-drives/types.js";

import { DeviceAppDrivesDataSource } from "../data-source.js";
import { AppMetadataLocalFileCollection } from "../../local-file-app-data.js";
import { AppDriveCollection, AppSessionCollection } from "../device-app-drives.js";

export class DeviceAppDrives_Init_To_V_0_1_0_UpdateOptions extends DataSourceUpdateOptions<
  AppMetadataLocalFileCollection,
  DeviceAppDrivesDataSource
> {
  constructor(dataSource: DeviceAppDrivesDataSource, requiredVersion: string) {
    super(dataSource, requiredVersion);
  }
}

export class DeviceAppDrives_Init_To_V_0_1_0_Update extends DataSourceUpdateBase<
  AppMetadataLocalFileCollection,
  DeviceAppDrivesDataSource
> {
  constructor(dataSource: DeviceAppDrivesDataSource, requiredVersion: string) {
    super(
      new DeviceAppDrives_Init_To_V_0_1_0_UpdateOptions(
        dataSource,
        requiredVersion
      )
    );
  }

  getAllEngines(): UpdateEngineBase<
    AppMetadataLocalFileCollection,
    DeviceAppDrivesDataSource
  >[] {
    const allEngines: UpdateEngineBase<
      AppMetadataLocalFileCollection,
      DeviceAppDrivesDataSource
    >[] = [new DeviceAppDrives_Init_To_V_0_1_0_UpdateEngine(this.dataSource)];

    return allEngines;
  }
}

export class DeviceAppDrives_Init_To_V_0_1_0_UpdateEngine extends UpdateEngineBase<
  AppMetadataLocalFileCollection,
  DeviceAppDrivesDataSource
> {
  constructor(dataSource: DeviceAppDrivesDataSource) {
    super(dataSource);
  }

  getFromVersion(): string {
    const fromVersion = BLANK_VERSION_VALUE;
    return fromVersion;
  }

  getToVersion(): string {
    const toVersion = "0.1.0";
    return toVersion;
  }

  async run(): Promise<boolean> {
    this.dataSource.allAppDrivesCollection.currentData = [];
    this.dataSource.appSessionsCollection.currentData = [];

    this.dataSource.metadataCollection.currentData = [
      <DataSourceMetadata>{
        dataSourceVersion: this.toVersion,
      },
    ];

    return true;
  }
}
