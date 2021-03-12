import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import './styles/App.scss';

import DriveRootFolder from './components/driveRootFolder/DriveRootFolder';
import { DriveRootFolderProps } from './components/driveRootFolder/DriveRootFolderProps';
import ThemePicker from './components/themePicker/ThemePicker';
import { AppTheme, setThemeAsync, selectTheme, defaultAppTheme } from './app/appTheme/appTheme';
import { replaceClassList } from './utils/dom';
import { appDrivesSlice, moveFile, moveFolder, renameFile, renameFolder, selectRootFolder } from './app/driveItems/driveItems';
import { AppDriveData, DriveItem, DriveFolder, DriveFile } from './app/driveItems/driveItems.types';
import { toDriveItemProps } from './app/driveItems/driveItems.converters';

const App = () => {
    const currentAppTheme = useSelector(selectTheme) ?? defaultAppTheme;
    const [ appThemeId, setAppThemeId ] = useState<string | null>(null);

    const rootFolder = useSelector(selectRootFolder);

    const setCurrentAppTheme = (themeId?: string) => {
        setAppThemeId(themeId ?? null);
        dispatch(setThemeAsync(themeId));
    }

    const dispatch = useDispatch();

    const onThemePicked = (themeId: string) => {
        setCurrentAppTheme(themeId);
    }

    const applyThemeCssClass = (appTheme: AppTheme) => {
        replaceClassList(document.body.classList, ["txqk"], `txqk-theme-${appTheme.id}`);
    }

    useEffect(() => {
        if (appThemeId !== currentAppTheme.id) {
            setCurrentAppTheme(currentAppTheme.id);
        }

        applyThemeCssClass(currentAppTheme);
    });

    const getRootFolderComponent = (rootFolder?: DriveFolder) => {
        let retComp = null;
        const rootFolderProps = rootFolder ? toDriveItemProps(rootFolder) : null;

        if (rootFolderProps) {
            retComp = (<DriveRootFolder rootFolder={rootFolderProps}></DriveRootFolder>);
        }

        return retComp;
    }

    return (
        <div className="txqk-app">
            <header className="txqk-app-header">
            <ThemePicker
                        currentThemeId={currentAppTheme.id}
                        onThemePicked={onThemePicked}></ThemePicker>
            </header>
            <main className="txqk-app-main">
                <Container className="txqk-app-cntr">
                    
                    { getRootFolderComponent(rootFolder) }
                </Container>
            </main>
            <footer className="txqk-app-footer"></footer>
        </div>
    );
};

export default App;