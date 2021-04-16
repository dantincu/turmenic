import React, { MouseEvent } from "react";
import { Row, Col } from "reactstrap";
import "./DriveItem.scss";

import { useSelector, useDispatch } from "react-redux";
import { DriveFile as DriveFileVm } from "../../src.node.common/app-data/device-app-drives/types";
import { DriveFileProps, DriveItemIdentity } from "./DriveItemProps";
import { trmrkCssClasses } from "../../src.node.common.client/dom.css-classes";
import DriveItemName from "./DriveItemName";

const DriveFile = (props: DriveFileProps) => {
  const dispatch = useDispatch();
  const selectFile = props.storeFileSelector;
  const file = useSelector(
    selectFile(props.idntty.parentFolderUuid as string, props.idntty.itemUuid)
  ) as DriveFileVm;

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

  const getNameCol = () => {
    return (
      <Col className={trmrkCssClasses.bootstrap.col}>
        <Row className={`${trmrkCssClasses.bootstrap.row} trmrk-main-row`}>
          <DriveItemName
            itemName={props.label ?? file.name}
            itemTooltipText={file.path ?? ""}
            onClick={onItemNameClick}
            onDoubleClick={onItemNameDblClick}
            onMiddleClick={onItemNameMiddleClick}
            onRightClick={onItemNameRightClick}
          />
        </Row>
      </Col>
    );
  };

  const getCols = () => {
    let arr: JSX.Element[] = [];

    arr = arr.concat(getNameCol());
    return arr;
  };

  const getCssClassName = () => {
    const cssClassArr = [
      "trmrk-drive-item",
      trmrkCssClasses.bootstrap.row,
      "trmrk-drive-file",
    ];

    if (file.isSelected === true) {
      cssClassArr.push(trmrkCssClasses.item.selected);
    }

    if (file.isCurrent === true) {
      cssClassArr.push(trmrkCssClasses.item.current);
    }

    if (props.cssClass) {
      cssClassArr.push(props.cssClass);
    }

    const cssClassName = cssClassArr.join(" ");
    return cssClassName;
  };

  return <Row trmrk-drive-item-uuid={file.uuid} className={getCssClassName()}>{getCols()}</Row>;
};

export default DriveFile;
