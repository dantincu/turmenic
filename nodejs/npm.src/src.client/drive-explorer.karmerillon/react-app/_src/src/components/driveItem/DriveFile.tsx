import React, { MouseEvent } from 'react';
import { Row, Col } from 'reactstrap';
import './DriveItem.scss';

import { useSelector } from 'react-redux';
import { selectFile, setCurrentFile, setCurrentFolder, setSelectedFile, setSelectedFolder } from '../../app/driveItems/driveItems';
import { DriveFile as DriveFileVm } from '../../app/driveItems/driveItems.types';
import { DriveItemProps } from './DriveItemProps';
import { cssClss } from '../const';
import { MouseDblClick } from '../../js.common/dist/src.node.common.client/domEvents/MouseDblClick';

const DriveFile = (props: DriveItemProps) => {
    const file = useSelector(selectFile(props.parentFolderUuidB64 as string, props.itemUuidB64)) as DriveFileVm;

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

    const getNameCol = () => {
        return (<Col className={cssClss.txqk.bootstrap.col}>
            <Row className={`${cssClss.txqk.bootstrap.row} txqk-main-row`}><Col onMouseDown={onItemNameMouseDown} className={`${cssClss.txqk.bootstrap.col} txqk-item-name`}>{ file.name }</Col></Row>
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
