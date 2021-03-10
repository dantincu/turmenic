import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import './styles/App.scss';

import DriveExplorer from './components/driveExplorer/DriveExplorer';
import ThemePicker from './components/themePicker/ThemePicker';
import { AppTheme, setThemeAsync, selectTheme, defaultAppTheme } from './features/appTheme/appTheme';
import { replaceClassList } from './utils/dom';

const App = () => {
    const currentAppTheme = useSelector(selectTheme) ?? defaultAppTheme;
    const [ appThemeId, setAppThemeId ] = useState<string | null>(null);

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

    return (
        <div className="txqk-app">
            <header className="txqk-app-header"></header>
            <main className="txqk-app-main">
                <Container className="txqk-app-cntr">
                    <ThemePicker
                        currentThemeId={currentAppTheme.id}
                        onThemePicked={onThemePicked}></ThemePicker>
                    <DriveExplorer></DriveExplorer>
                </Container>
            </main>
            <footer className="txqk-app-footer"></footer>
        </div>
    );
};

export default App;