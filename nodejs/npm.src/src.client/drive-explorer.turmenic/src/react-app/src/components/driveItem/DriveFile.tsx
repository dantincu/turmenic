import React from 'react';
import { Row, Col } from 'reactstrap';
import './DriveItem.scss';

import { useSelector } from 'react-redux';
import { selectFile } from '../../app/driveItems/driveItems';
import { DriveFile as DriveFileVm } from '../../app/driveItems/driveItems.types';
import { DriveItemProps } from './DriveItemProps';
import { cssClss } from '../components';

const DriveFile = (props: DriveItemProps) => {
    const file = useSelector(selectFile(props.parentFolderUuidB64 as string, props.itemUuidB64)) as DriveFileVm;

    const getNameCol = () => {
        return (<Col className={cssClss.txqk.bootstrap.col}>
            <Row className={cssClss.txqk.bootstrap.row}><Col className={`${cssClss.txqk.bootstrap.col} txqk-item-name`}>{ file.name }</Col></Row>
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
