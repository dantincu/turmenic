import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useLocation,
  } from "react-router-dom";

import ThemePicker from '../themePicker/ThemePicker';
import { AppTheme, setTheme, selectTheme, defaultAppTheme } from '../../app/appTheme/appTheme';

import { urlQueryParams } from '../components';
import { replaceClassList } from '../../src.common.browser/dom';

import { AppThemePickerProps } from './appThemePickerProps';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const AppThemePicker = (props: AppThemePickerProps) => {
    const queryParams = useQuery();
    const queryParamsThemeId = queryParams.get(urlQueryParams.themeId)

    const currentTheme = useSelector(selectTheme);
    const currentAppTheme = currentTheme ?? defaultAppTheme;

    const dispatch = useDispatch();

    if (!currentTheme && queryParamsThemeId) {
        dispatch(setTheme(queryParamsThemeId));
    }

    const onThemePicked = (themeId: string) => {
        dispatch(setTheme(themeId));
    }

    const applyThemeCssClass = (appTheme: AppTheme) => {
        const themeCssClass = `txqk-theme-${appTheme.id}`;

        if (document.body.classList.contains(themeCssClass) !== true) {
            replaceClassList(document.body.classList, ["txqk"], themeCssClass);
        }
    }

    useEffect(() => {
        applyThemeCssClass(currentAppTheme);
    });

    return (<ThemePicker
        currentThemeId={currentAppTheme.id}
        onThemePicked={onThemePicked}></ThemePicker>);
};

export default AppThemePicker;