import {
  envConfig,
  envBaseDir,
} from "../../src.node.common/appSettings/envConfig.js";
import { AppLocalFileDataSource } from "../data/json/local-file-app-data/data-source.js";
import { AppLocalFileUpdateManager } from "../data/json/update/local-file-app-data/manager.js";

const appEnv = await envConfig.appEnv.instance();
const appLocalFileDataSource = new AppLocalFileDataSource(appEnv);

export const assureUpToDate = async () => {
  let isUpToDate = await appLocalFileDataSource.IsUpToDate();
  if (isUpToDate !== true) {
    isUpToDate = await performUpdate();
    // isUpToDate = isUpToDate && (await appLocalFileDataSource.IsUpToDate());
  }

  if (isUpToDate !== true) {
    throw new Error("Database is not up to date and could not be updated");
  }
};

const performUpdate = async () => {
  const updateManager = new AppLocalFileUpdateManager(
    appEnv,
    appLocalFileDataSource
  );

  const updateResult = await updateManager.ExecuteUpdate();
  return updateResult.isUpToDate;
};
