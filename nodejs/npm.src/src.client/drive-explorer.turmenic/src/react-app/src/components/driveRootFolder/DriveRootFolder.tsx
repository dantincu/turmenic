import React from 'react';
import './DriveRootFolder.scss';
import DriveItem from '../driveItem/DriveItem';

import { DriveRootFolderProps } from './DriveRootFolderProps';

const DriveRootFolder = (props: DriveRootFolderProps) => {
    return (
        <div className="txqk-drive-root-folder">
            <DriveItem {...props.rootFolder}></DriveItem>
        </div>
    );
};

export default DriveRootFolder;