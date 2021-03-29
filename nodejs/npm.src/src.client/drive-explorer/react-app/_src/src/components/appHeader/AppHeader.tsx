import React from "react";

import "./AppHeader.scss";
import { AppHeaderProps } from "./AppHeaderProps";
import AppThemePicker from "../appThemePicker/appThemePicker";

const AppHeader = (props: AppHeaderProps) => {
  if (props.devMode) {
    return (
      <header className="trmr-app-header">
        <AppThemePicker></AppThemePicker>
      </header>
    );            
  } else {
    return (
      <header className="trmr-app-header">
      </header>
    );  
  }
};

export default AppHeader;
