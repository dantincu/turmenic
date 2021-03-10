import React from 'react';
import './DriveExplorer.scss';
import FolderItem from '../folderItem/FolderItem';

const DriveExplorer = (props: any) => {
    return (
        <div className="txqk-drive-explorer">
            <ul className="txqk-folder-list">
                <li><FolderItem text="ASDFASDFASDF"></FolderItem></li>
                <li><FolderItem collapsed={false} text="asdfasdfasdf"></FolderItem></li>
                <li><FolderItem text="ASDFASDFSADFASD"></FolderItem></li>
            </ul>
        </div>
    );
};

export default DriveExplorer;