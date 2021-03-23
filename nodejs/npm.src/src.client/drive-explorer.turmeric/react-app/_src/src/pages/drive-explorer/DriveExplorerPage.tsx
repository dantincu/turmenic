import React from 'react';
import { useSelector } from 'react-redux';

import AppPage from '../AppPage';
import DriveRootFolder from '../../components/driveRootFolder/DriveRootFolder';
import { driveItemToProps } from '../../app/driveItems/driveItems.converters';

import { selectAppDrives } from '../../app/driveItems/driveItems';
import { DriveFolder } from '../../app/driveItems/driveItems.types';
import { DriveExplorerPageProps } from './DriveExplorerPageProps';

const DriveExplorerPage = (props: DriveExplorerPageProps) => {
    const appDrives = useSelector(selectAppDrives);

    const getRootFolderComponent = (rootFolder: DriveFolder) => {
        const rootFolderProps = driveItemToProps({
            drItm: rootFolder,
            events: props.events ?? {},
            onFolderToggled: props.onFolderToggled,
            rootFolderId: rootFolder.id
        });

        const retComp = (<DriveRootFolder
            key={rootFolderProps.idntty.itemId}
            rootFolder={rootFolderProps} />);

        return retComp;
    }

    return (<AppPage>{ appDrives.map(fd => getRootFolderComponent(fd.rootFolder)) }</AppPage>);
};

export default DriveExplorerPage;
