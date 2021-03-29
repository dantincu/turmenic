import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appThemeReducer from "./appTheme/appTheme";
import { deviceAppDriveSessionsReducer } from "./deviceAppDriveItems/deviceAppDriveItems";

export const store = configureStore({
  reducer: {
    appTheme: appThemeReducer,
    deviceAppDriveSessions: deviceAppDriveSessionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
