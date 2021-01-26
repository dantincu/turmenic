import './src.common.server/utils/appSettings/appEnvAutoload.js';
import { AppDbVersionUpdater } from './src/utils/noSql/nedb/dbUpdater.js';

const appDbVersionUpdater = new AppDbVersionUpdater();
appDbVersionUpdater.assureDbIsUpToDate({});
