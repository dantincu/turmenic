// import { getCurrentAppTheme } from "../../features/appTheme/appTheme";
import { resolveRelPath } from "../../utils/imports";

/*
export const THEME_QUERY_STRING_KEY = "app_theme";
export const themeFileName = `theme.css`;

export const getThemeDirRelPath = (themeId: string) => {
  const themeDirRelPath = `themes/theme-${themeId}`;
  return themeDirRelPath;
};

export const getComponentThemeFilePath = (
  themeId: string,
  componentRelPath: string,
  componentBasePath: string
) => {
  const themeDirRelPath = getThemeDirRelPath(themeId);
  const componentThemeFilePath = resolveRelPath(
    "./src",
    componentBasePath,
    componentRelPath,
    themeDirRelPath,
    themeFileName
  );

  return componentThemeFilePath;
};

export const importComponentTheme = (
  themeId: string,
  componentRelPath: string,
  componentBasePath: string
) => {
  const componentThemeFilePath = getComponentThemeFilePath(
    themeId,
    componentRelPath,
    componentBasePath
  );

  import(componentThemeFilePath);
};

export const importComponentCurrentAppTheme = (
  componentRelPath: string,
  componentBasePath: string = "components"
) => {
  const currentAppTheme = getCurrentAppTheme().then((appTheme) => {
    return importComponentTheme(
      appTheme.id,
      componentRelPath,
      componentBasePath
    );
  });
};
*/
