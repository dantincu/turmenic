import React from 'react';
import { Label } from 'reactstrap';
import './FolderItem.scss';

export interface FolderItemProps {
    text?: string;
    collapsed?: boolean;
}

const FolderItem = (props: FolderItemProps) => {
    const collapsed = props.collapsed ?? true;
    const collapsedChar = collapsed ? "+" : "-";
    const collapsedCssClass = collapsed ? "txqk-toggle txqk-toggle-collapsed" : "txqk-toggle txqk-toggle-expanded";

    console.log(collapsed, collapsedChar, collapsedCssClass);

    return (
        <div className="txqk-folder-item">
            <Label>{ props.text }</Label>
            <span className={collapsedCssClass}>{ collapsedChar }</span>
        </div>
    );
};

export default FolderItem;