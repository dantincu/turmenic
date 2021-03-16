import React from 'react';
import './DriveRootFolder.scss';
import DriveFolder from '../driveItem/DriveFolder';

import { DriveRootFolderProps } from './DriveRootFolderProps';

const DriveRootFolder = (props: DriveRootFolderProps) => {
    const onFolderToggled = (folderUuidB64: string) => {
        if (props.onFolderToggled) {
            props.onFolderToggled(folderUuidB64);
        }
    }

    return (
        <div className="txqk-drive-root-folder">
            <DriveFolder key={props.rootFolder.itemUuidB64} onFolderToggled={onFolderToggled} {...props.rootFolder}></DriveFolder>
        </div>
    );
};

export default DriveRootFolder;