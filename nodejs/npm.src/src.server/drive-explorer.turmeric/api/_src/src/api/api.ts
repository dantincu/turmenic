import { handleRoute } from "./api.base.js";
import { DeviceAppRootFolders } from "../fileSystem/deviceRootFolders.js";
import { FileSystem } from "../fileSystem/fileSystem.js";

const deviceAppRootFolders = new DeviceAppRootFolders();
const fileSystem = new FileSystem(deviceAppRootFolders);

export const getDeviceRootFolders = async (refresh: string) => {
  const result = await handleRoute(async () => {
    const rootFolders =
      refresh?.toLowerCase() === true.toString()
        ? await fileSystem.refreshFileSystemRootFolders()
        : await fileSystem.getFileSystemRootFolders();
    return rootFolders;
  });

  return result;
};
