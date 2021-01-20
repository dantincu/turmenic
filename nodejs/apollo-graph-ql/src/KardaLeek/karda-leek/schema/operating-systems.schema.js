const { gql } = require('apollo-server');

module.exports.GqlSchema = gql`
type OperatingSystemSuperGroup {
    uuid: String,
    key: String,
    name: String,
    description: String,
}

type OperatingSystemGroup {
    uuid: String,
    key: String,
    name: String,
    description: String,
    superGroupKey: String,
    isMobile: Boolean,
}

type OperatingSystem {
    uuid: String,
    key: String,
    name: String,
    description: String,
    groupKey: String,
    superGroupKey: String,
}

type OperatingSystemMinorVersion {
    uuid: String,
    key: String,
    name: String,
    description: String,
    osKey: String,
}
`;