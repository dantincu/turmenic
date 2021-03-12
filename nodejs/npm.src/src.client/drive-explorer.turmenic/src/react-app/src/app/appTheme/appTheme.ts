import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

export const DEFAULT_APP_THEME_ID = "dark";

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
  return value;
};

export const setThemeAsync = (themeId?: string): AppThunk => (dispatch) => {
  dispatch(setTheme(themeId ?? DEFAULT_APP_THEME_ID));
};

export default appThemeSlice.reducer;
