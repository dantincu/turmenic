import React from "react";
import { useDispatch } from "react-redux";

import DriveFile from '../driveItem/DriveFile';
import { DriveItemIdentity } from '../driveItem/DriveItemProps';
import { DeviceAppDriveFileProps } from './deviceAppDriveItemProps';

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
        if (idntty.itemUuid === props.idntty.itemUuid) {
          if (previewSelection) {
            dispatch(
              setSelectedFile({
                folderUuid: idntty.parentFolderUuid as string,
                fileUuid: idntty.itemUuid,
              })
            );
          } else {
            dispatch(
              setCurrentFile({
                folderUuid: idntty.parentFolderUuid as string,
                fileUuid: idntty.itemUuid,
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