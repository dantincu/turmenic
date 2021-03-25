import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppPage from '../AppPage';
import DriveRootFolder from '../../components/driveRootFolder/DriveRootFolder';
import { DriveRootFolderProps } from '../../components/driveRootFolder/DriveRootFolderProps';
import DeviceAppDriveFolder from '../../components/deviceAppDriveItem/DeviceAppDriveFolder';

import {
    selectFolder,
    selectSessionAppDrives,
    selectFile,
    toggleFolder
  } from "../../app/deviceAppDriveItems/deviceAppDriveItems";

import { DriveFolder, AppDrive } from '../../app/deviceAppDriveItems/deviceAppDriveItems.types';
import { AppDrivesExplorerPageProps } from './AppDrivesExplorerPageProps';
import { DriveItemProps, DriveFolderProps } from '../../components/driveItem/DriveItemProps';

const AppDrivesExplorerPage = (props: AppDrivesExplorerPageProps) => {
    const appDrives = useSelector(selectSessionAppDrives);

    const rootFolderComponentCreator = (rootFolder: DriveFolderProps) => {
        return (<DeviceAppDriveFolder {...rootFolder}></DeviceAppDriveFolder>);
    }

    const getRootFolderComponent = (appDrive: AppDrive) => {
        const rootFolderProps = {
            idntty: {
                itemId: appDrive.rootFolder.id,
                itemIsFile: false,
                rootFolderId: appDrive.rootFolder.id,
            },
            events: {
            },
            label: appDrive.label,
        } as DriveFolderProps;

        const retComp = (<DriveRootFolder
            uuidB64={appDrive.uuidB64}
            key={rootFolderProps.idntty.itemId}
            label={appDrive.label}
            rootFolder={rootFolderProps}
            rootFolderCompCreator={rootFolderComponentCreator} />);

        return retComp;
    }

    return (<AppPage>{ appDrives.map(fd => getRootFolderComponent(fd)) }</AppPage>);
};

export default AppDrivesExplorerPage;
