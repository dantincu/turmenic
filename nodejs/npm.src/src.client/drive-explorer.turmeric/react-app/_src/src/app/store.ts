import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appThemeReducer from "./appTheme/appTheme";
import { deviceAppDrivesReducer } from "./deviceAppDriveItems/deviceAppDriveItems";

export const store = configureStore({
  reducer: {
    appTheme: appThemeReducer,
    deviceAppDrives: deviceAppDrivesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
