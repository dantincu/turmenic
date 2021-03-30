import React, { useEffect } from "react";
import "./AppDrive.scss";

import { AppDriveProps } from "./AppDriveProps";

const AppDrive = (props: AppDriveProps) => {
  return (
    <div className="trmrk-app-drive">
      {props.rootFolderCompCreator(props.rootFolder)}
    </div>
  );
};

export default AppDrive;
