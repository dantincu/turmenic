import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import AppPage from '../../AppPage';
import AppDriveComp from '../../../components/appDrive/AppDrive';
import DeviceAppDriveFolder from '../../../components/deviceAppDriveItem/DeviceAppDriveFolder';

import { selectAppSession } from "../../../app/deviceAppDriveItems/deviceAppDriveItems";

import { AppDrive } from '../../../src.node.common/app-data/device-app-drives/types';
import { AppDrivesExplorerProps } from './AppDrivesExplorerProps';
import { DriveFolderProps, DriveItemIdentity } from '../../../components/driveItem/DriveItemProps';

import { updateParentWidth } from '../../../src.node.common.client/dom';

const AppDrivesExplorer = (props: AppDrivesExplorerProps) => {
    const appSession = useSelector(selectAppSession(props.sessionUuid));
    const [updateDom, setUpdateDom] = useState<DriveItemIdentity | null>(null);

    useEffect(() => {
        if (updateDom) {
            updateParentWidth({
                itemUuid: updateDom.itemUuid,
                rootFolderUuid: updateDom.rootFolderUuid
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

    return (<div className="trmrk-app-session-drives">{ appSession?.appDrives.map(fd => getRootFolderComponent(fd)) }</div>);
};

export default AppDrivesExplorer;
