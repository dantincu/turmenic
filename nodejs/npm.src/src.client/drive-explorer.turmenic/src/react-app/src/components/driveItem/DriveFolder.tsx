import React from 'react';
import { Row, Col, Label } from 'reactstrap';
import './DriveItem.scss';

import { DriveFolder as DriveFolderVm, DriveFile as DriveFileVm } from '../../app/driveItems/driveItems.types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFolder, selectFolder } from '../../app/driveItems/driveItems';
import { toDriveItemProps } from '../../app/driveItems/driveItems.converters';
import { DriveItemProps } from './DriveItemProps';
import { cssClss } from '../components';
import DriveFile from './DriveFile';

const DriveFolder = (props: DriveItemProps) => {
    const folder = useSelector(selectFolder(props.itemUxIntId)) as DriveFolderVm;
    const dispatch = useDispatch();

    const onFolderToggled = (folderUxIntId: number) => {
        if (props.onFolderToggled) {
            props.onFolderToggled(folderUxIntId);
        }
    }

    const onToggleClick = () => {
        dispatch(toggleFolder({ folderUxIntId: folder.uxIntId }));
        onFolderToggled(folder.uxIntId);
    }

    const getToggleCol = (collapsed?: boolean) => {
        const togglCssClassArr = [
            cssClss.txqk.bootstrap.col,
            cssClss.txqk.toggle.base,
            (collapsed ?? true) ? cssClss.txqk.toggle.collapsed : cssClss.txqk.toggle.expanded];

        const togglCssClass = togglCssClassArr.join(" ");
        const toggleChar = (collapsed ?? true) ? "+" : "-";

        return (<Col className={togglCssClass}><Label onClick={onToggleClick}>{ toggleChar }</Label></Col>);
    }

    const getFiles = (files?: DriveFileVm[]) => {
        const arr = files?.map(item => (<DriveFile {...toDriveItemProps(item)}></DriveFile>)) ?? [];
        return arr;
    }

    const getSubFolders = (subFolders?: DriveFolderVm[]) => {
        const arr = subFolders?.map(item => (<DriveFolder onFolderToggled={onFolderToggled} key={item.uxIntId} {...toDriveItemProps(item)}></DriveFolder>)) ?? [];
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
            <Row className={cssClss.txqk.bootstrap.row}><Col className={`${cssClss.txqk.bootstrap.col} txqk-item-name`}>{ folder.name }</Col></Row>
            { getChildrenRow() }
        </Col>);
    }

    const getCols = () => {
        let arr: JSX.Element[] = [];

        arr = arr.concat(getToggleCol(folder.collapsed));
        arr = arr.concat(getMainCol());

        return arr;
    }

    const getCssClassName = () => {
        const cssClassArr = [
            "txqk-drive-item",
            cssClss.txqk.bootstrap.row,
            "txqk-drive-folder"
        ];

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
