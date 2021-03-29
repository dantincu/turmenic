import React from "react";
import "./DriveRootFolder.scss";

import { DriveRootFolderProps } from "./DriveRootFolderProps";

const DriveRootFolder = (props: DriveRootFolderProps) => {
  return (
    <div className="trmr-drive-root-folder">
      {props.rootFolderCompCreator(props.rootFolder)}
    </div>
  );
};

export default DriveRootFolder;
