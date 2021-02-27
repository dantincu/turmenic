const { gql } = require('apollo-server');

module.exports.GqlSchema = gql`
# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "rootDirLocs" query returns an array of zero or more RootDirLoc (defined above).

type Query {
    servicePlatforms: [ServicePlatform],
    servicePlatformUserAccounts: [ServicePlatformUserAccount],
    cloudStoragePlatforms: [CloudStoragePlatform],
    deviceDirLocationTypes: [DeviceDirLocationType],
    deviceRootDirLocations: [DeviceRootDirLocation],
    cloudStorageDeviceDirLocations: [CloudStorageDeviceDirLocation],
    operatingSystemSuperGroups: [OperatingSystemSuperGroup],
    operatingSystemGroups: [OperatingSystemGroup],
    operatingSystems: [OperatingSystem],
    operatingSystemMinorVersions: [OperatingSystemMinorVersion],
    devicePortabilityTypes: [DevicePortabilityType],
    deviceTypes: [DeviceType],
    deviceManufacturers: [DeviceManufacturer],
    deviceSuperGroups: [DeviceSuperGroup],
    deviceGroups: [DeviceGroup],
    devices: [Device],
    userDevices: [UserDevice],
    userDeviceOperatingSystems: [UserDeviceOperatingSystem],
}
`;