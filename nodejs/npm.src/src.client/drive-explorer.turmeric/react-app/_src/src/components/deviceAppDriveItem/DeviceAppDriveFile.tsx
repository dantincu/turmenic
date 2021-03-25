import React, { MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import DriveFile from '../driveItem/DriveFile';
import { DriveFileProps, DriveItemIdentity } from '../driveItem/DriveItemProps';
import { DeviceAppDriveFileProps, DeviceAppDriveFolderProps } from './deviceAppDriveItemProps';

import {
    selectFile,
    setCurrentFile,
    setSelectedFile,
  } from "../../app/deviceAppDriveItems/deviceAppDriveItems";

const DeviceAppDriveFile = (props: DeviceAppDriveFileProps) => {
    const dispatch = useDispatch();

    const onDeviceAppDriveFileSelected = (
        idntty: DriveItemIdentity,
        previewSelection: boolean
      ) => {
        if (idntty.itemId === props.idntty.itemId) {
          if (previewSelection) {
            dispatch(
              setSelectedFile({
                folderId: idntty.parentFolderId as number,
                fileId: idntty.itemId,
              })
            );
          } else {
            dispatch(
              setCurrentFile({
                folderId: idntty.parentFolderId as number,
                fileId: idntty.itemId,
              })
            );
          }
        }
    
        onDeviceAppDriveItemSelected(idntty, previewSelection);
      };
    
      const onDeviceAppDriveItemSelected = (
        idntty: DriveItemIdentity,
        previewSelection: boolean
      ) => {
        if (props.deviceAppDriveFileEvents?.onItemSelected) {
          props.deviceAppDriveFileEvents.onItemSelected(idntty, previewSelection);
        }
      };

    const fileProps = {...props};
    fileProps.events.onItemSelected = onDeviceAppDriveFileSelected;
    fileProps.storeFileSelector = selectFile;

    return (<DriveFile {...fileProps}></DriveFile>);
}

export default DeviceAppDriveFile;