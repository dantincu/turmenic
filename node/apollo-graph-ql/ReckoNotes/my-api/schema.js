const { gql } = require('apollo-server');
const { concatSchemaFromFiles } = require("./schema-helper.js");

let schemaString = concatSchemaFromFiles([
  './schema/service-providers.schema.js',
  './schema/device-dir-locations.schema.js',
  './schema/operating-systems.schema.js',
  './schema/devices.schema.js',
  './schema/query.schema.js',
]);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

module.exports.GqlSchema = gql(schemaString);
