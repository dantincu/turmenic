import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';

import DriveRootFolder from '../../components/driveRootFolder/DriveRootFolder';

import { selectRootFolders } from '../../app/driveItems/driveItems';
import { DriveFolder } from '../../app/driveItems/driveItems.types';
import { toDriveItemProps } from '../../app/driveItems/driveItems.converters';
import { DriveExplorerPageProps } from './DriveExplorerPageProps';

const DriveExplorerPage = (props: DriveExplorerPageProps) => {
    const rootFolders = useSelector(selectRootFolders);

    const getRootFolderComponent = (rootFolder?: DriveFolder) => {
        let retComp = null;
        const rootFolderProps = rootFolder ? toDriveItemProps(rootFolder) : null;

        if (rootFolderProps) {
            retComp = (<DriveRootFolder rootFolder={rootFolderProps}></DriveRootFolder>);
        }

        return retComp;
    }

    return (<main className="txqk-app-main">
                <Container className="txqk-app-cntr">
                    { rootFolders?.map(fd => getRootFolderComponent(fd)) }
                </Container>
            </main>);
};

export default DriveExplorerPage;