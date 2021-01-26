import './src.common.server/utils/appSettings/appEnvAutoload.js';
import { dbVersion } from './src.common.server/utils/noSql/nedb/dbVersion.js';
dbVersion.assertDbIsUptodate({ oncomplete: true });
