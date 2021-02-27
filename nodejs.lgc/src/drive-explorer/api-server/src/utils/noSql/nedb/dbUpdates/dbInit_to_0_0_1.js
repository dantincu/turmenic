import { dbContainer } from '../../../../../src.common.server/utils/noSql/nedb/dbContainer.js';
import { cfg } from '../../../../../src.common.server/utils/appSettings/moduleConfig.js';
import { DbInit } from '../../../../../src.common.server/utils/noSql/nedb/dbUpdates/dbInit.js';

export class AppDbInit_to_0_0_1 extends DbInit {
    constructor(opts) {
        super(opts);
    }

    performDbInit(dbCtr, dbMetadataDb) {
        let servicePlatformsDb = dbCtr.loadDatabase({ dbName: "servicePlatforms" });
        let servicePlatformUserAccountsDb = dbCtr.loadDatabase({ dbName: "servicePlatformUserAccounts" });
        let cloudStoragePlatformsDb = dbCtr.loadDatabase({ dbName: "cloudStoragePlatforms" });

        let operatingSystemSuperGroupsDb = dbCtr.loadDatabase({ dbName: "operatingSystemSuperGroups" });
        let operatingSystemGroupsDb = dbCtr.loadDatabase({ dbName: "operatingSystemGroups" });
        let operatingSystemsDb = dbCtr.loadDatabase({ dbName: "operatingSystems" });
        let operatingSystemMinorVersionsDb = dbCtr.loadDatabase({ dbName: "operatingSystemMinorVersions" });

        let devicePortabilityTypesDb = dbCtr.loadDatabase({ dbName: "devicePortabilityTypes" });
        let deviceTypes = dbCtr.loadDatabase({ dbName: "deviceTypes" });
        let deviceManufacturersDb = dbCtr.loadDatabase({ dbName: "deviceManufacturers" });
        let deviceSuperGroupsDb = dbCtr.loadDatabase({ dbName: "deviceSuperGroups" });
        let deviceGroupsDb = dbCtr.loadDatabase({ dbName: "deviceGroups" });

        let devicesDb = dbCtr.loadDatabase({ dbName: "devices" });
        let userDevicesDb = dbCtr.loadDatabase({ dbName: "userDevices" });
        let userDeviceOperatingSystemsDb = dbCtr.loadDatabase({ dbName: "userDeviceOperatingSystems" });

        let deviceDirLocationTypesDb = dbCtr.loadDatabase({ dbName: "deviceDirLocationTypes" });
        let deviceRootDirLocationsDb = dbCtr.loadDatabase({ dbName: "deviceRootDirLocations" });
        let cloudStorageDeviceDirLocationsDb = dbCtr.loadDatabase({ dbName: "cloudStorageDeviceDirLocations" });
    }
}