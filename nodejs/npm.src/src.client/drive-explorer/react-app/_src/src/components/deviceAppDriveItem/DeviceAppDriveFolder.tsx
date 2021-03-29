import React from "react";
import { useDispatch } from "react-redux";

import DriveFolder from '../driveItem/DriveFolder';
import { DriveFolderProps, DriveFileProps, DriveItemIdentity } from '../driveItem/DriveItemProps';
import { DeviceAppDriveFolderProps } from './deviceAppDriveItemProps';

import {
    selectFolder,
    setCurrentFolder,
    setSelectedFolder,
    selectSubFolders,
    toggleFolder
  } from "../../app/deviceAppDriveItems/deviceAppDriveItems";

import DeviceAppDriveFile from './DeviceAppDriveFile';

const DeviceAppDriveFolder = (props: DeviceAppDriveFolderProps) => {
    const dispatch = useDispatch();

    const onDeviceAppDriveFolderSelected = (
        idntty: DriveItemIdentity,
        previewSelection: boolean
      ) => {
        if (idntty.itemUuid === props.idntty.itemUuid) {
          if (previewSelection) {
            dispatch(setSelectedFolder({ folderUuid: idntty.itemUuid }));
          } else {
            dispatch(setCurrentFolder({ folderUuid: idntty.itemUuid }));
          }  
        }
    
        onDeviceAppDriveItemSelected(idntty, previewSelection);
      };
    
      const onDeviceAppDriveItemSelected = (
        idntty: DriveItemIdentity,
        previewSelection: boolean
      ) => {
        if (props.deviceAppDriveFolderEvents?.onItemSelected) {
          props.deviceAppDriveFolderEvents.onItemSelected(idntty, previewSelection);
        }
      };

      const onFolderToggled = (idntty: DriveItemIdentity) => {
        dispatch(toggleFolder({folderUuid: idntty.itemUuid}));

        if (props.onFolderToggled) {
          props.onFolderToggled(idntty);
        }
      }

      const folderProps = {...props} as DriveFolderProps;
      folderProps.events.onItemSelected = onDeviceAppDriveFolderSelected;

      folderProps.onFolderToggled = onFolderToggled;

      folderProps.storeFolderSelector = selectFolder;
      folderProps.storeSubFoldersSelector = selectSubFolders;

      folderProps.fileCompCreator = (fileProps: DriveFileProps) => (
        <DeviceAppDriveFile key={fileProps.idntty.itemUuid} {...fileProps}></DeviceAppDriveFile>
      );

      folderProps.subFolderCompCreator = (driveProps: DriveFolderProps) => (
        <DeviceAppDriveFolder key={driveProps.idntty.itemUuid} {...driveProps}></DeviceAppDriveFolder>
      );

    return (<DriveFolder {...folderProps}></DriveFolder>);
}

export default DeviceAppDriveFolder;