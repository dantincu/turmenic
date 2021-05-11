import {
  envBaseDir,
  envConfig,
} from "../../../../../../../src.node.common/appSettings/envConfig.js";

import {
  DbSchema,
  DbSchemaValidator,
} from "../../../../db-schema-validator.js";

const appEnv = await envConfig.appEnv.instance();

const dbSchemaExtractor = new DbSchemaValidator({
  dbBaseDirPath: appEnv.getEnvRelPath(envBaseDir.data, "sqlite3"),
});

const runTest1 = async () => {
  await dbSchemaExtractor.dumpDbSchema();
};

const runTest2 = async () => {
  await dbSchemaExtractor.assureDbSchemaIsValid();
};

await runTest1();
await runTest2();
