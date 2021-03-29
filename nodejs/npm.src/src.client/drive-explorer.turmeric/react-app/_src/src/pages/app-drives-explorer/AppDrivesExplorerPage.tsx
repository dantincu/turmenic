import React from 'react';
import { useSelector } from 'react-redux';

import AppPage from '../AppPage';
import DriveRootFolder from '../../components/driveRootFolder/DriveRootFolder';
import DeviceAppDriveFolder from '../../components/deviceAppDriveItem/DeviceAppDriveFolder';

import { selectSessionAppDrives } from "../../app/deviceAppDriveItems/deviceAppDriveItems";

import { AppDrive } from '../../js.common/src.node.common/app-data/device-app-drives/types';
import { AppDrivesExplorerPageProps } from './AppDrivesExplorerPageProps';
import { DriveFolderProps } from '../../components/driveItem/DriveItemProps';

const AppDrivesExplorerPage = (props: AppDrivesExplorerPageProps) => {
    const appDrives = useSelector(selectSessionAppDrives);

    const rootFolderComponentCreator = (rootFolder: DriveFolderProps) => {
        return (<DeviceAppDriveFolder {...rootFolder}></DeviceAppDriveFolder>);
    }

    const getRootFolderComponent = (appDrive: AppDrive) => {
        const rootFolderProps = {
            idntty: {
                itemUuid: appDrive.rootFolder.uuid,
                itemIsFile: false,
                rootFolderUuid: appDrive.rootFolder.uuid,
            },
            events: {
            },
            label: appDrive.label,
        } as DriveFolderProps;

        const retComp = (<DriveRootFolder
            uuid={appDrive.uuid}
            key={rootFolderProps.idntty.itemUuid}
            label={appDrive.label}
            rootFolder={rootFolderProps}
            rootFolderCompCreator={rootFolderComponentCreator} />);

        return retComp;
    }

    return (<AppPage>{ appDrives.map(fd => getRootFolderComponent(fd)) }</AppPage>);
};

export default AppDrivesExplorerPage;
