const { gql } = require('apollo-server');

module.exports.GqlSchema = gql`
type DevicePortabilityType {
    uuid: String,
    key: String,
    name: String,
    description: String,
}

type DeviceType {
    uuid: String,
    key: String,
    name: String,
    description: String,
    portabilityTypeKey: String,
}

type DeviceManufacturer {
    uuid: String,
    key: String,
    name: String,
    description: String,
    serviceProviderKey: String,
}

type DeviceSuperGroup {
    uuid: String,
    key: String,
    name: String,
    description: String,
    deviceTypeKey: String,
    devicePortabilityTypeKey: String,
    manufacturerKey: String,
}

type DeviceGroup {
    uuid: String,
    key: String,
    name: String,
    description: String,
    deviceTypeKey: String,
    devicePortabilityTypeKey: String,
    manufacturerKey: String,
    superGroupKey: String,
}

type Device {
    uuid: String,
    key: String,
    name: String,
    description: String,
    deviceTypeKey: String,
    devicePortabilityTypeKey: String,
    manufacturerKey: String,
    groupKey: String,
    superGroupKey: String,
}

type UserDevice {
    uuid: String,
    key: String,
    name: String,
    description: String,
    deviceKey: String,
    deviceTypeKey: String,
    devicePortabilityTypeKey: String,
    deviceSuperGroupKey: String,
    deviceGroupKey: String,
    manufacturerKey: String,
}

type UserDeviceOperatingSystem {
    uuid: String,
    key: String,
    name: String,
    description: String,
    userDeviceKey: String,
    osKey: String,
    osMinorVersionKey: String,
    osName: String,
    isDeviceDefault: String,
    isBootable: Boolean,
    runsInsideOSKey: String,
}
`;