const { gql } = require('apollo-server');

module.exports.GqlSchema = gql`
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
# This "RootDirLoc" type defines the queryable fields for every root directory locations in our data source.

type ServicePlatform { ### Google, Yahoo, Microsoft, Dropbox, iCloud, Vivaldi (Mail & Browser), Facebook
    uuid: String, ### Guid generated with powershell
    key: String, ### unique short & rememberable string identifier
    name: String, ### Display name
    description: String, ### Informative description
    hasOwnMailbox: Boolean, ### false for Facebook & Dropbox, the rest of service platforms listed here all offer mailboxes
    hasCloudStorage: Boolean, ### false for Yahoo, Facebook & Vivaldi Browser & Mail.
    mainDomain: String, ### google.com for Google, microsoft.com for Microsoft etc
}
  
type ServicePlatformUserAccount {
    uuid: String,
    key: String,
    name: String,
    description: String,
    username: String,
    email: String,
    servicePlatformKey: String,
}
  
type CloudStoragePlatform { ### Google Drive, One Drive, Dropbox, iCloud
    uuid: String,
    key: String,
    name: String,
    description: String,
    servicePlatformKey: String,
}
`;