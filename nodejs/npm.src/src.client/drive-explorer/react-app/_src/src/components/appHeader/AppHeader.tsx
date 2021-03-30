import React from "react";

import "./AppHeader.scss";
import { AppHeaderProps } from "./AppHeaderProps";
import AppThemePicker from "../appThemePicker/appThemePicker";

const AppHeader = (props: AppHeaderProps) => {
  if (props.devMode) {
    return (
      <header className="trmrk-app-header">
        <AppThemePicker></AppThemePicker>
      </header>
    );            
  } else {
    return (
      <header className="trmrk-app-header">
      </header>
    );  
  }
};

export default AppHeader;
