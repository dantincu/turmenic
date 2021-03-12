import React from 'react';

import './AppHeader.scss';
import { AppHeaderProps } from './AppHeaderProps';
import AppThemePicker from '../appThemePicker/appThemePicker';

const AppHeader = (props: AppHeaderProps) => {
    return (<header className="txqk-app-header">
                <AppThemePicker></AppThemePicker>
            </header>);
};

export default AppHeader;