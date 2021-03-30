import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import AppPage from '../AppPage';
import AppDriveComp from '../../components/appDrive/AppDrive';
import DeviceAppDriveFolder from '../../components/deviceAppDriveItem/DeviceAppDriveFolder';

import { selectSessionAppDrives } from "../../app/deviceAppDriveItems/deviceAppDriveItems";

import { AppDrive } from '../../js.common/src.node.common/app-data/device-app-drives/types';
import { AppDrivesExplorerPageProps } from './AppDrivesExplorerPageProps';
import { DriveFolderProps, DriveItemIdentity } from '../../components/driveItem/DriveItemProps';

import { updateParentWidth } from '../../js.common/dist/src.node.common.client/dom';

const AppDrivesExplorerPage = (props: AppDrivesExplorerPageProps) => {
    const appDrives = useSelector(selectSessionAppDrives);
    const [updateDom, setUpdateDom] = useState<DriveItemIdentity | null>(null);

    useEffect(() => {
        if (updateDom) {
            updateParentWidth({
                uuid: updateDom.itemUuid,
                parentUuid: updateDom.rootFolderUuid
            })
            setUpdateDom(null);    
        }
    })

    const onFolderToggled = (idntty: DriveItemIdentity) => {
        setUpdateDom(idntty);
    }

    const onItemSelected = (idntty: DriveItemIdentity, previewSelection: boolean) => {
        setUpdateDom(idntty);
    }

    const deviceAppDriveFolderEvents = {
        onItemSelected: onItemSelected,
        onFolderToggled: onFolderToggled
    };

    const rootFolderComponentCreator = (rootFolder: DriveFolderProps) => {
        return (<DeviceAppDriveFolder deviceAppDriveFolderEvents={deviceAppDriveFolderEvents} {...rootFolder}></DeviceAppDriveFolder>);
    }

    const getRootFolderComponent = (appDrive: AppDrive) => {
        const rootFolderProps = {
            idntty: {
                itemUuid: appDrive.rootFolder.uuid,
                itemIsFile: false,
                rootFolderUuid: appDrive.rootFolder.uuid,
            },
            events: {
                onItemSelected: onItemSelected
            },
            label: appDrive.rootFolder.label,
            cssClass: "trmrk-drive-root",
            onFolderToggled: onFolderToggled,
            onSubFolderToggled: onFolderToggled,
            filesEvents: {
                onItemSelected: onItemSelected
            },
            subFoldersEvents: {
                onItemSelected: onItemSelected
            }
        } as DriveFolderProps;

        const retComp = (<AppDriveComp
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
