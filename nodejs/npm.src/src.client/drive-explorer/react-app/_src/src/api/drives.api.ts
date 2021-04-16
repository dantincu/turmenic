import axios, { AxiosResponse } from "axios";

import { ApiBase } from "../src.node.common.client/axios/api.base";
import {
  ApiResponse,
  ApiError,
} from "../src.node.common.client/axios/api.types";
import { FileSystemRootFolder } from "../src.node.common/app-data/fileSystem.types";
import { DeviceRootDirLocation } from "../src.node.common/app-data/schema/device-dir-locations.schema";
import { AppDrive } from "../src.node.common/app-data/device-app-drives/types";
import { AddAppDrive } from "../src.node.common/app-data/device-app-drives/request.types";

export class DriveApi extends ApiBase {
  constructor(baseUrl?: string) {
    super(baseUrl);
  }

  public async getDeviceRootFolders() {
    const response = await this.executeRequestAsync<
      FileSystemRootFolder[],
      ApiError
    >(async () => {
      const url = this.getUrl("device-root-folders");
      const result: AxiosResponse<FileSystemRootFolder[]> = await axios(url);

      return result;
    });

    return response;
  }

  public async getDeviceAppDrives(refresh: boolean) {
    const response = await this.executeRequestAsync<AppDrive[], any>(
      async () => {
        const url = this.getUrl("device-app-drives");
        const result = await axios(url, {
          params: {
            refresh: refresh,
          },
        });

        return result;
      }
    );

    return response;
  }

  public async addAppDrive(newAppDrive: AddAppDrive) {
    const response = await this.executeRequestAsync<AppDrive, any>(async () => {
      const url = this.getUrl("add-device-app-drive");
      const result = await axios(url, {
        method: "POST",
        data: newAppDrive,
      });

      return result;
    });

    return response;
  }
}

export const driveApi = new DriveApi();
