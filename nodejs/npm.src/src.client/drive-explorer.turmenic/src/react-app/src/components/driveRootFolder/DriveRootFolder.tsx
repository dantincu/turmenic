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

    const onItemSelected = (itemUuidB64: string, previewSelection: boolean) => {
        if (props.onItemSelected) {
            props.onItemSelected(itemUuidB64, previewSelection);
        }
    }

    const onItemRightClick = (itemUuidB64: string) => {
        if (props.onItemRightClick) {
            props.onItemRightClick(itemUuidB64);
        }
    }

    return (
        <div className="txqk-drive-root-folder">
            <DriveFolder
                onFolderToggled={onFolderToggled}
                onItemSelected={onItemSelected}
                onItemRightClick={onItemRightClick}
                {...props.rootFolder}></DriveFolder>
        </div>
    );
};

export default DriveRootFolder;