import React from 'react';
import './DriveRootFolder.scss';
import DriveFolder from '../driveItem/DriveFolder';

import { DriveRootFolderProps } from './DriveRootFolderProps';

const DriveRootFolder = (props: DriveRootFolderProps) => {
    return (
        <div className="txqk-drive-root-folder">
            <DriveFolder {...props.rootFolder}></DriveFolder>
        </div>
    );
};

export default DriveRootFolder;