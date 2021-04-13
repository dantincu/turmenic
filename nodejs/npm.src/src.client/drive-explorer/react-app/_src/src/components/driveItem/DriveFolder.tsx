import React, { MouseEvent } from "react";
import { Row, Col, Label } from "reactstrap";
import "./DriveItem.scss";

import {
  DriveFolder as DriveFolderVm,
  DriveItem as DriveItemVm,
} from "../../src.node.common/app-data/device-app-drives/types";
import { useSelector } from "react-redux";

import { DriveFolderProps, DriveFileProps, DriveItemIdentity } from "./DriveItemProps";
import { trmrkCssClasses } from "../../src.node.common.client/dom.css-classes";
import DriveItemName from "./DriveItemName";

const DriveFolder = (props: DriveFolderProps) => {
  const selectFolder = props.storeFolderSelector;

  const folder = useSelector(
    selectFolder(props.idntty.itemUuid)
  ) as DriveFolderVm;

  const subFolders: DriveFolderVm[] = useSelector(
    props.storeSubFoldersSelector(folder.expanded === true ? props.idntty.itemUuid : null)
  ) ?? [];

  const onItemSelected = (
    idntty: DriveItemIdentity,
    previewSelection: boolean
  ) => {
    if (props.events.onItemSelected) {
      props.events.onItemSelected(idntty, previewSelection);
    }
  };

  const onItemCtxMenu = (idntty: DriveItemIdentity) => {
    if (props.events.onItemCtxMenu) {
      props.events.onItemCtxMenu(idntty);
    }
  };

  const onItemNameClick = (e: MouseEvent) => {
    onItemSelected(props.idntty, true);
  };

  const onItemNameDblClick = (e: MouseEvent) => {
    onItemSelected(props.idntty, false);
  };

  const onItemNameMiddleClick = (e: MouseEvent) => {
    onItemSelected(props.idntty, !e.ctrlKey);
  };

  const onItemNameRightClick = (e: MouseEvent) => {
    onItemCtxMenu(props.idntty);
  };

  const onFolderToggled = (idntty: DriveItemIdentity) => {
    if (props.onFolderToggled) {
      props.onFolderToggled(idntty);
    }
  };

  const onToggleClick = (e: MouseEvent) => {
    onFolderToggled(props.idntty);
  };

  const getToggleCol = (expanded?: boolean) => {
    const togglCssClassArr = [
      trmrkCssClasses.bootstrap.col,
      trmrkCssClasses.toggle.base,
      expanded ?? false
        ? trmrkCssClasses.toggle.expanded
        : trmrkCssClasses.toggle.collapsed,
    ];

    const togglCssClass = togglCssClassArr.join(" ");
    const toggleChar = expanded ?? false ? "\u2014" : "+";

    return (
      <Col xs="xs-1" className={togglCssClass}>
        <Label onClick={onToggleClick}>{toggleChar}</Label>
      </Col>
    );
  };

  const fileToComp = (drItm: DriveItemVm) => {
    const fileProps: DriveFileProps = {
      label: drItm.label,
      events: {
        onItemSelected: props.filesEvents?.onItemSelected,
        onItemCtxMenu: props.filesEvents?.onItemCtxMenu
      },
      idntty: {
        itemUuid: drItm.uuid,
        itemIsFile: true,
        parentFolderUuid: folder.uuid,
        rootFolderUuid: props.idntty.rootFolderUuid
      },
      storeFileSelector: props.storeFileSelector,
    }

    const fileComp = props.fileCompCreator ? props.fileCompCreator(fileProps) : null;
    return fileComp;
  };

  const folderToComp = (drItm: DriveItemVm) => {
    const folderProps = { ...props };
    folderProps.label = drItm.label;
    
    folderProps.events = props.subFoldersEvents ?? {};
    folderProps.events.onItemCtxMenu = props.subFoldersEvents?.onItemCtxMenu;
    folderProps.events.onItemSelected = props.subFoldersEvents?.onItemSelected;

    folderProps.idntty = {
      itemUuid: drItm.uuid,
      itemIsFile: false,
      parentFolderUuid: folder.uuid,
      rootFolderUuid: props.idntty.rootFolderUuid
    }

    folderProps.onFolderToggled = props.onSubFolderToggled;
    const folderComp = props.subFolderCompCreator ? props.subFolderCompCreator(folderProps) : null;

    return folderComp;
  };

  const getChildrenCol = () => {
    let arr = subFolders.map(folderToComp);
    arr = arr.concat(folder.files?.map(fileToComp) ?? []);

    return <Col className={`${trmrkCssClasses.bootstrap.col}`}>{arr}</Col>;
  };

  const getChildrenRow = () => {
    let childrenRow: JSX.Element | null = null;

    if (folder.expanded === true) {
      childrenRow = (
        <Row className={trmrkCssClasses.bootstrap.row}>{getChildrenCol()}</Row>
      );
    }

    return childrenRow;
  };

  const getMainCol = () => {
    return (
      <Col xs="xs-1" className={trmrkCssClasses.bootstrap.col}>
        <Row className={`${trmrkCssClasses.bootstrap.row} trmrk-main-row`}>
          <DriveItemName
            itemName={props.label ?? folder.name}
            itemTooltipText={folder.path ?? ""}
            onClick={onItemNameClick}
            onDoubleClick={onItemNameDblClick}
            onMiddleClick={onItemNameMiddleClick}
            onRightClick={onItemNameRightClick}
          />
        </Row>
        {getChildrenRow()}
      </Col>
    );
  };

  const getCssClassName = () => {
    const cssClassArr = [
      "trmrk-drive-item",
      trmrkCssClasses.bootstrap.row,
      "trmrk-drive-folder",
      "flex-nowrap"
    ];

    if (folder.isSelected === true) {
      cssClassArr.push(trmrkCssClasses.item.selected);
    }

    if (folder.isCurrent === true) {
      cssClassArr.push(trmrkCssClasses.item.current);
    }

    if (props.cssClass) {
      cssClassArr.push(props.cssClass);
    }

    const cssClassName = cssClassArr.join(" ");
    return cssClassName;
  };

  return (
    <Row trmrk-drive-item-uuid={folder.uuid} className={getCssClassName()}>
      {[getToggleCol(folder.expanded), getMainCol()]}
    </Row>
  );
};

export default DriveFolder;
