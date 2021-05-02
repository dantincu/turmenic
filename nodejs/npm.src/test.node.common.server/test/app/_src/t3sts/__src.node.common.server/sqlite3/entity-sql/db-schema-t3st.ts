import {
  envBaseDir,
  envConfig,
} from "../../../../src.node.common/appSettings/envConfig.js";

import {
  DbSchema,
  DbSchemaExtractor,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-schema.js";
import { runTest } from "../../../memoize-test.js";

const dbSchemaExtractor = new DbSchemaExtractor(
  await envConfig.appEnv.instance()
);

const runTest1 = async () => {
  await dbSchemaExtractor.dumpDbSchema();
};

const runTest2 = async () => {
  await dbSchemaExtractor.assureDbSchemaIsValid();
};

await runTest1();

await runTest2();
