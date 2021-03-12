import React, { useState } from 'react';
import { Row, Col, Label } from 'reactstrap';
import './DriveItem.scss';

import { DriveItemProps } from './DriveItemProps';
import { cssClss } from '../components';

const DriveItem = (props: DriveItemProps) => {
    const [collapsed, setCollapsed] = useState(props.collapsed ?? true);

    const onToggleClick = () => {
        setCollapsed(!collapsed);

        if (props.onToggled) {
            props.onToggled(!collapsed);
        }
    }

    const getToggleCol = (collapsed: boolean) => {
        const togglCssClassArr = [
            cssClss.txqk.bootstrap.col,
            cssClss.txqk.toggle.base,
            collapsed ? cssClss.txqk.toggle.collapsed : cssClss.txqk.toggle.expanded];

        const togglCssClass = togglCssClassArr.join(" ");
        const toggleChar = collapsed ? "+" : "-";

        return (<Col className={togglCssClass}><Label onClick={onToggleClick}>{ toggleChar }</Label></Col>);
    }

    const getChildItems = (childItems?: DriveItemProps[]) => {
        const arr = childItems?.map(item => (<DriveItem {...item}></DriveItem>)) ?? [];
        return arr;
    }

    const getChildrenCol = (props: DriveItemProps) => {
        let arr = getChildItems(props.subFolders);
        arr = arr.concat(getChildItems(props.files));

        return <Col className={`${cssClss.txqk.bootstrap.col}`}>{ arr }</Col>;
    }

    const getNameCol = (props: DriveItemProps) => {
        return (<Col className={`${cssClss.txqk.bootstrap.col} txqk-item-name`}>
            <Row className={cssClss.txqk.bootstrap.row}><Col className={cssClss.txqk.bootstrap.col}>{ props.name }</Col></Row>
            <Row className={cssClss.txqk.bootstrap.row}>{ getChildrenCol(props) }</Row>
        </Col>);
    }

    const getCols = (props: DriveItemProps) => {
        let arr: JSX.Element[] = [];

        if (props.isFolder) {
            arr = arr.concat(getToggleCol(collapsed));
        }
        
        arr = arr.concat(getNameCol(props));
        return arr;
    }

    const getCssClassName = (props: DriveItemProps) => {
        const cssClassArr = [
            "txqk-drive-item",
            cssClss.txqk.bootstrap.row,
            props.isFolder ? "txqk-drive-folder" : "txqk-drive-file"
        ];

        if (props.cssClass) {
            cssClassArr.push(props.cssClass);
        }

        const cssClassName = cssClassArr.join(" ");
        return cssClassName;
    }

    return (
        <Row className={getCssClassName(props)}>
            { getCols(props) }
        </Row>
    );
};

export default DriveItem;
