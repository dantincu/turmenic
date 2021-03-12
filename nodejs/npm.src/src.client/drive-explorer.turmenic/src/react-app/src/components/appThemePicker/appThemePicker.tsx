import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import {
    useLocation,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

import ThemePicker from '../themePicker/ThemePicker';
import { AppTheme, setThemeAsync, selectTheme, defaultAppTheme } from '../../app/appTheme/appTheme';

import { urlQueryParams } from '../components';
import { replaceClassList } from '../../utils/dom';

import { AppThemePickerProps } from './appThemePickerProps';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const AppThemePicker = (props: AppThemePickerProps) => {
    const queryParams = useQuery();
    const queryParamsThemeId = queryParams.get(urlQueryParams.themeId)

    const currentAppTheme = useSelector(selectTheme) ?? defaultAppTheme;
    const [ appThemeId, setAppThemeId ] = useState<string | null>(null);

    const dispatch = useDispatch();

    if (!appThemeId) {
        if (queryParamsThemeId) {
            setAppThemeId(queryParamsThemeId);
        }
    } else {
        if (currentAppTheme.id !== appThemeId) {
            dispatch(setThemeAsync(appThemeId));
        }
    }

    const onThemePicked = (themeId: string) => {
        setAppThemeId(themeId);
    }

    const applyThemeCssClass = (appTheme: AppTheme) => {
        replaceClassList(document.body.classList, ["txqk"], `txqk-theme-${appTheme.id}`);
    }

    useEffect(() => {
        if (appThemeId) {
            if (appThemeId !== currentAppTheme.id) {
                setAppThemeId(currentAppTheme.id);
            }
        } else if (queryParamsThemeId) {
            setAppThemeId(queryParamsThemeId);
        }

        applyThemeCssClass(currentAppTheme);
    });

    return (<ThemePicker
        currentThemeId={currentAppTheme.id}
        onThemePicked={onThemePicked}></ThemePicker>);
};

export default AppThemePicker;