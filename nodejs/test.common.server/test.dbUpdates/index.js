import './src.common.server/utils/appSettings/appEnvAutoload.js';
import { dbVersion } from './src.common.server/utils/noSql/nedb/dbVersion.js';

import { runTestUpdate } from './src/tests/nedb/testUpdate.js';

dbVersion.assertDbIsUptodate({ oncomplete: opts => {
        runTestUpdate();
    }
});
