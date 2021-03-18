import React, { MouseEvent } from 'react';
import { Row, Col, Label } from 'reactstrap';
import './DriveItem.scss';

import { DriveFolder as DriveFolderVm, DriveFile as DriveFileVm } from '../../app/driveItems/driveItems.types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFolder, selectFolder, setCurrentFile, setCurrentFolder, setSelectedFile, setSelectedFolder } from '../../app/driveItems/driveItems';
import { toDriveItemProps } from '../../app/driveItems/driveItems.converters';
import { DriveItemProps } from './DriveItemProps';
import { cssClss } from '../const';
import DriveFile from './DriveFile';
import { MouseDblClick } from '../../js.common/dist/src.node.common.client/domEvents/MouseDblClick';

const DriveFolder = (props: DriveItemProps) => {
    const folder = useSelector(selectFolder(props.itemUuidB64)) as DriveFolderVm;
    const dispatch = useDispatch();

    const componentEvents = {
        itemNameMouseDblClick: new MouseDblClick()
    }

    componentEvents.itemNameMouseDblClick.singleClickSubject.subscribe(() => {
        if (props.onItemSelected) {
            props.onItemSelected(props.itemUuidB64, true);
        }
    });

    componentEvents.itemNameMouseDblClick.doubleClickSubject.subscribe(() => {
        if (props.onItemSelected) {
            props.onItemSelected(props.itemUuidB64, false);
        }
    });

    const onItemNameMouseDown = (e: MouseEvent) => {
        if (e.button === 0) {
            componentEvents.itemNameMouseDblClick.onMouseDown();
        } else if(e.button === 1) {
            if (props.onItemSelected) {
                props.onItemSelected(props.itemUuidB64, false);
            }
        } else if (e.button === 2) {
            if (props.onItemRightClick) {
                props.onItemRightClick(props.itemUuidB64);
            }
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

    const onFolderToggled = (folderUuidB64: string) => {
        if (props.onFolderToggled) {
            props.onFolderToggled(folderUuidB64);
        }
    }

    const onToggleClick = (e: MouseEvent) => {
        dispatch(toggleFolder({ folderUuidB64: folder.uuidB64 }));
        onFolderToggled(folder.uuidB64);
    }

    const getToggleCol = (collapsed?: boolean) => {
        const togglCssClassArr = [
            cssClss.txqk.bootstrap.col,
            cssClss.txqk.toggle.base,
            (collapsed ?? true) ? cssClss.txqk.toggle.collapsed : cssClss.txqk.toggle.expanded];

        const togglCssClass = togglCssClassArr.join(" ");
        const toggleChar = (collapsed ?? true) ? "+" : '\u2014';

        return (<Col className={togglCssClass}><Label onClick={onToggleClick}>{ toggleChar }</Label></Col>);
    }

    const getFiles = (files?: DriveFileVm[]) => {
        const arr = files?.map(item => (<DriveFile key={item.uuidB64} {...toDriveItemProps(item)}></DriveFile>)) ?? [];
        return arr;
    }

    const getSubFolders = (subFolders?: DriveFolderVm[]) => {
        const arr = subFolders?.map(item => (<DriveFolder onFolderToggled={onFolderToggled} onItemSelected={onItemSelected} onItemRightClick={onItemRightClick} key={item.uuidB64} {...toDriveItemProps(item)}></DriveFolder>)) ?? [];
        return arr;
    }

    const getChildrenCol = () => {
        let arr = getSubFolders(folder.subFolders);
        arr = arr.concat(getFiles(folder.files));

        return <Col className={`${cssClss.txqk.bootstrap.col}`}>{ arr }</Col>;
    }

    const getChildrenRow = () => {
        let childrenRow: JSX.Element | null = null;

        if (folder.collapsed === false) {
            childrenRow = (<Row className={cssClss.txqk.bootstrap.row}>{ getChildrenCol() }</Row>);
        }

        return childrenRow;
    }

    const getMainCol = () => {
        return (<Col className={cssClss.txqk.bootstrap.col}>
            <Row className={`${cssClss.txqk.bootstrap.row} txqk-main-row`}><Col onMouseDown={onItemNameMouseDown} className={`${cssClss.txqk.bootstrap.col} txqk-item-name`}>{ folder.name }</Col></Row>
            { getChildrenRow() }
        </Col>);
    }

    const getCols = () => {
        let arr: JSX.Element[] = [getToggleCol(folder.collapsed), getMainCol()];
        return arr;
    }

    const getCssClassName = () => {
        const cssClassArr = [
            "txqk-drive-item",
            cssClss.txqk.bootstrap.row,
            "txqk-drive-folder"
        ];

        if (folder.isSelected === true) {
            cssClassArr.push(cssClss.txqk.item.selected);
        }

        if (props.cssClass) {
            cssClassArr.push(props.cssClass);
        }

        const cssClassName = cssClassArr.join(" ");
        return cssClassName;
    }

    return (
        <Row className={getCssClassName()}>
            { getCols() }
        </Row>
    );
};

export default DriveFolder;
