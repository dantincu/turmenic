import React from 'react';
import './DriveRootFolder.scss';
import DriveFolder from '../driveItem/DriveFolder';

import { DriveRootFolderProps } from './DriveRootFolderProps';

const DriveRootFolder = (props: DriveRootFolderProps) => {
    const onFolderToggled = (folderUxIntId: number) => {
        if (props.onFolderToggled) {
            props.onFolderToggled(folderUxIntId);
        }
    }

    return (
        <div className="txqk-drive-root-folder">
            <DriveFolder key={props.rootFolder.itemUxIntId} onFolderToggled={onFolderToggled} {...props.rootFolder}></DriveFolder>
        </div>
    );
};

export default DriveRootFolder;