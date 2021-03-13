import React from 'react';
import { useSelector } from 'react-redux';

import AppPage from '../AppPage';
import DriveRootFolder from '../../components/driveRootFolder/DriveRootFolder';

import { selectAppDrives } from '../../app/driveItems/driveItems';
import { DriveFolder } from '../../app/driveItems/driveItems.types';
import { toDriveItemProps } from '../../app/driveItems/driveItems.converters';
import { DriveExplorerPageProps } from './DriveExplorerPageProps';

const DriveExplorerPage = (props: DriveExplorerPageProps) => {
    const appDrives = useSelector(selectAppDrives);

    const onFolderToggled = (folderUxIntId: number) => {
        if (props.onFolderToggled) {
            props.onFolderToggled(folderUxIntId);
        }
    }

    const getRootFolderComponent = (rootFolder?: DriveFolder) => {
        let retComp = null;
        const rootFolderProps = rootFolder ? toDriveItemProps(rootFolder) : null;

        if (rootFolderProps) {
            retComp = (<DriveRootFolder key={rootFolderProps.itemUxIntId} onFolderToggled={onFolderToggled} rootFolder={rootFolderProps}></DriveRootFolder>);
        }

        return retComp;
    }

    return (<AppPage>{ appDrives.map(fd => getRootFolderComponent(fd.rootFolder)) }</AppPage>);
};

export default DriveExplorerPage;