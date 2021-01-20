const { gql } = require('apollo-server');

module.exports.GqlSchema = gql`
type DeviceDirLocationType {
    uuid: String,
    key: String,
    name: String,
    description: String,
}
  
type DeviceRootDirLocation {
    uuid: String,
    key: String,
    name: String,
    description: String,
    absPath: String,
    isDefault: Boolean,
    locationTypeKey: String,
}

type CloudStorageDeviceDirLocation {
    uuid: String,
    key: String,
    servicePlatformAccountKey: String, ### e.g. google
    cloudStoragePlatformKey: String, ### e.g. dropbox / google-drive
    deviceLocationKey: String ### e.g. dropbox/dan.tincu@gmail.com / google-drive/dan.tincu@gmail.com
}
`;