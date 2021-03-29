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
        if (idntty.itemId === props.idntty.itemId) {
          if (previewSelection) {
            dispatch(setSelectedFolder({ folderId: idntty.itemId }));
          } else {
            dispatch(setCurrentFolder({ folderId: idntty.itemId }));
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
        dispatch(toggleFolder({folderId: idntty.itemId}));

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
        <DeviceAppDriveFile key={fileProps.idntty.itemId} {...fileProps}></DeviceAppDriveFile>
      );

      folderProps.subFolderCompCreator = (driveProps: DriveFolderProps) => (
        <DeviceAppDriveFolder key={driveProps.idntty.itemId} {...driveProps}></DeviceAppDriveFolder>
      );

    return (<DriveFolder {...folderProps}></DriveFolder>);
}

export default DeviceAppDriveFolder;