import React, { MouseEvent } from 'react';
import { Row, Col, Label } from 'reactstrap';
import './DriveItem.scss';

import { DriveFolder as DriveFolderVm, DriveItem as DriveItemVm } from '../../app/driveItems/driveItems.types';
import { driveItemToProps } from '../../app/driveItems/driveItems.converters';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFolder, selectFolder, setCurrentFolder, setSelectedFolder } from '../../app/driveItems/driveItems';
import { DriveItemProps, DriveItemIdentity } from './DriveItemProps';
import { cssClss } from '../const';
import DriveFile from './DriveFile';
import DriveItemName from './DriveItemName';

const DriveFolder = (props: DriveItemProps) => {
    const folder = useSelector(selectFolder(props.idntty.itemId)) as DriveFolderVm;
    const dispatch = useDispatch();

    if ([typeof folder.isSelected, typeof folder.isCurrent].indexOf("boolean") >= 0) {
        console.log(" >>>> ", folder.isSelected, folder.isCurrent);
    }

    const onFolderSelected = (idntty: DriveItemIdentity, previewSelection: boolean) => {
        if (previewSelection) {
            dispatch(setSelectedFolder({ rootFolderId: idntty.rootFolderId, folderId: idntty.itemId }));
        } else {
            dispatch(setCurrentFolder({ rootFolderId: idntty.rootFolderId, folderId: idntty.itemId }));
        }

        onItemSelected(idntty, previewSelection);
    }

    const onItemSelected = (idntty: DriveItemIdentity, previewSelection: boolean) => {
        if (props.events.onItemSelected) {
            props.events.onItemSelected(idntty, previewSelection);
        }
    }

    const onItemCtxMenu = (idntty: DriveItemIdentity) => {
        if (props.events.onItemCtxMenu) {
            props.events.onItemCtxMenu(idntty);
        }
    }

    const onItemNameClick = (e: MouseEvent) => {
        onFolderSelected(props.idntty, true);
    }

    const onItemNameDblClick = (e: MouseEvent) => {
        onFolderSelected(props.idntty, false);
    }

    const onItemNameMiddleClick = (e: MouseEvent) => {
        onFolderSelected(props.idntty, true);
    }

    const onItemNameRightClick = (e: MouseEvent) => {
        onItemCtxMenu(props.idntty);
    }

    const onFolderToggled = (idntty: DriveItemIdentity) => {
        if (props.onFolderToggled) {
            props.onFolderToggled(idntty);
        }
    }

    const onToggleClick = (e: MouseEvent) => {
        dispatch(toggleFolder({ folderId: folder.id }));
        onFolderToggled(props.idntty);
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

    const fileToComp = (drItm: DriveItemVm) => {
        const fileProps = driveItemToProps({
            drItm: drItm,
            events: props.events,
            rootFolderId: props.idntty.rootFolderId
        });

        const fileComp = (<DriveFile key={fileProps.idntty.itemId} {...fileProps}></DriveFile>);
        return fileComp;
    }

    const folderToComp = (drItm: DriveItemVm) => {
        const folderProps = driveItemToProps({
            drItm: drItm,
            events: props.events,
            rootFolderId: props.idntty.rootFolderId,
            onFolderToggled: onFolderToggled,
        });

        const folderComp = (<DriveFolder key={folderProps.idntty.itemId} {...folderProps} />);
        return folderComp;
    }

    const getChildrenCol = () => {
        let arr = folder.subFolders?.map(folderToComp) ?? [];
        arr = arr.concat(folder.files?.map(fileToComp) ?? []);

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
            <Row className={`${cssClss.txqk.bootstrap.row} txqk-main-row`}>
                <DriveItemName
                        itemName={folder.name}
                        onClick={onItemNameClick}
                        onDoubleClick={onItemNameDblClick}
                        onMiddleClick={onItemNameMiddleClick}
                        onRightClick={onItemNameRightClick} />
                </Row>
            { getChildrenRow() }
        </Col>);
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
        
        if (folder.isCurrent === true) {
            cssClassArr.push(cssClss.txqk.item.current);
        }

        if (props.cssClass) {
            cssClassArr.push(props.cssClass);
        }

        const cssClassName = cssClassArr.join(" ");
        return cssClassName;
    }

    return (
        <Row className={getCssClassName()}>
            { [getToggleCol(folder.collapsed), getMainCol()] }
        </Row>
    );
};

export default DriveFolder;
