const {
    servicePlatforms,
    cloudStoragePlatforms,
    deviceDirLocationTypes,
    operatingSystemSuperGroups,
    operatingSystemGroups,
    operatingSystems,
    operatingSystemMinorVersions,
    devicePortabilityTypes,
    deviceTypes,
    deviceManufacturers,
    deviceSuperGroups,
    deviceGroups,
    devices
} = require('./data/app-data');

const {
    servicePlatformUserAccounts,
    userDevices,
    userDeviceOperatingSystems
} = require('./data/user-data');

const {
    deviceRootDirLocations,
    cloudStorageDeviceDirLocations
} = require('./data/device-data');

module.exports.DataResolvers = {
    Query: {
        servicePlatforms: () => servicePlatforms,
        servicePlatformUserAccounts: () => servicePlatformUserAccounts,
        cloudStoragePlatforms: () => cloudStoragePlatforms,
        deviceDirLocationTypes: () => deviceDirLocationTypes,
        deviceRootDirLocations: () => deviceRootDirLocations,
        cloudStorageDeviceDirLocations: () => cloudStorageDeviceDirLocations,
        operatingSystemSuperGroups: () => operatingSystemSuperGroups,
        operatingSystemGroups: () => operatingSystemGroups,
        operatingSystems: () => operatingSystems,
        operatingSystemMinorVersions: () => operatingSystemMinorVersions,
        devicePortabilityTypes: () => devicePortabilityTypes,
        deviceTypes: () => deviceTypes,
        deviceManufacturers: () => deviceManufacturers,
        deviceSuperGroups: () => deviceSuperGroups,
        deviceGroups: () => deviceGroups,
        devices: () => devices,
        userDevices: () => userDevices,
        userDeviceOperatingSystems: () => userDeviceOperatingSystems,
    },
};
