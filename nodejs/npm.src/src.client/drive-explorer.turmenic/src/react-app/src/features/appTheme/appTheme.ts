import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

export const DEFAULT_APP_THEME_ID = "light";

export interface AppTheme {
  id: string;
  name: string;
}

interface AppThemeState {
  value?: AppTheme;
}

export const appThemes: Readonly<AppTheme[]> = Object.freeze(
  [
    { id: "light", name: "Light" },
    { id: "dark", name: "Dark" },
  ].map((appTheme) => Object.freeze(appTheme))
);

export const defaultAppTheme: AppTheme = appThemes.find(
  (theme) => theme.id === DEFAULT_APP_THEME_ID
) as AppTheme;

const initialState: AppThemeState = {};

export const appThemeSlice = createSlice({
  name: "appTheme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      let themeId = action.payload;
      let appTheme = appThemes.find((theme) => theme.id === themeId);
      appTheme =
        appTheme ??
        appThemes.find((theme) => theme.id === DEFAULT_APP_THEME_ID);

      state.value = appTheme;
    },
  },
});

export const { setTheme } = appThemeSlice.actions;
export const selectTheme = (state: RootState) => {
  const value = state.appTheme?.value;
  console.log("selectTheme", value);
  return value;
};

export const setThemeAsync = (themeId?: string): AppThunk => (dispatch) => {
  console.log("setThemeAsync", themeId);
  dispatch(setTheme(themeId ?? DEFAULT_APP_THEME_ID));
};

/*
interface AppThemeResolver {
  resolver: ((appTheme: AppTheme) => void) | null;
}

const appThemeResolver = <AppThemeResolver>{
  resolver: null,
};

const appThemeState: AppThemeState = {};

export const getCurrentAppThemeValue = () => {
  const currentAppTheme: AppTheme | null = appThemeState.value ?? null;
  return currentAppTheme;
};

const setThemeValue = (themeId: string) => {
  let appTheme = appThemes.find((theme) => theme.id === themeId);
  appTheme =
    appTheme ?? appThemes.find((theme) => theme.id === DEFAULT_APP_THEME_ID);

  appThemeState.value = appTheme;
};

export const setCurrentAppTheme = (themeId: string | null) => {
  setThemeValue(themeId ?? DEFAULT_APP_THEME_ID);

  if (appThemeResolver.resolver) {
    const currentAppTheme: AppTheme = <AppTheme>getCurrentAppThemeValue();
    appThemeResolver.resolver(currentAppTheme);
    appThemeResolver.resolver = null;
  }
};

export const getCurrentAppTheme = (): Promise<AppTheme> => {
  const promise = new Promise<AppTheme>((resolve, reject) => {
    const currentAppTheme = getCurrentAppThemeValue();

    if (currentAppTheme) {
      resolve(currentAppTheme);
    } else {
      appThemeResolver.resolver = resolve;
    }
  });

  return promise;
};
*/

export default appThemeSlice.reducer;
