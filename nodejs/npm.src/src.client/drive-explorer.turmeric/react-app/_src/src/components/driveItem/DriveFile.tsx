import React, { MouseEvent } from 'react';
import { Row, Col } from 'reactstrap';
import './DriveItem.scss';

import { useSelector, useDispatch } from 'react-redux';
import { selectFile, setCurrentFile, setSelectedFile } from '../../app/driveItems/driveItems';
import { DriveFile as DriveFileVm } from '../../app/driveItems/driveItems.types';
import { DriveItemProps, DriveItemIdentity } from './DriveItemProps';
import { cssClss } from '../const';
import DriveItemName from './DriveItemName';

const DriveFile = (props: DriveItemProps) => {
    const dispatch = useDispatch();
    const file = useSelector(selectFile(props.idntty.parentFolderId as number, props.idntty.itemId)) as DriveFileVm;

    const onFileSelected = (idntty: DriveItemIdentity, previewSelection: boolean) => {
        if (previewSelection) {
            dispatch(setSelectedFile({ rootFolderId: idntty.rootFolderId, folderId: idntty.parentFolderId, fileId: idntty.itemId }));
        } else {
            dispatch(setCurrentFile({ rootFolderId: idntty.rootFolderId, folderId: idntty.parentFolderId, fileId: idntty.itemId }));
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
        onFileSelected(props.idntty, true);
    }

    const onItemNameDblClick = (e: MouseEvent) => {
        onFileSelected(props.idntty, false);
    }

    const onItemNameMiddleClick = (e: MouseEvent) => {
        onFileSelected(props.idntty, true);
    }

    const onItemNameRightClick = (e: MouseEvent) => {
        onItemCtxMenu(props.idntty);
    }

    const getNameCol = () => {
        return (<Col className={cssClss.txqk.bootstrap.col}>
            <Row className={`${cssClss.txqk.bootstrap.row} txqk-main-row`}>
                <DriveItemName
                    itemName={file.name}
                    onClick={onItemNameClick}
                    onDoubleClick={onItemNameDblClick}
                    onMiddleClick={onItemNameMiddleClick}
                    onRightClick={onItemNameRightClick} />
            </Row>
        </Col>);
    }

    const getCols = () => {
        let arr: JSX.Element[] = [];
        
        arr = arr.concat(getNameCol());
        return arr;
    }

    const getCssClassName = () => {
        const cssClassArr = [
            "txqk-drive-item",
            cssClss.txqk.bootstrap.row,
            "txqk-drive-file"
        ];

        if (file.isSelected === true) {
            cssClassArr.push(cssClss.txqk.item.selected);
        }
        
        if (file.isCurrent === true) {
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
            { getCols() }
        </Row>
    );
};

export default DriveFile;
