import React from 'react';
import { Label } from 'reactstrap';
import './DriveExplorer.scss';
import FolderItem from './FolderItem';
import { FolderItemProps } from './FolderItem';

const DriveExplorer = (props: any) => {
    return (
        <ul className="txqk-folder-list">
            <li><FolderItem text="ASDFASDFASDF"></FolderItem></li>
            <li><FolderItem collapsed={false} text="asdfasdfasdf"></FolderItem></li>
            <li><FolderItem text="ASDFASDFSADFASD"></FolderItem></li>
        </ul>
    );
};

export default DriveExplorer;