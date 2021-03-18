import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import appThemeReducer from "./appTheme/appTheme";
import { deviceAppDrivesReducer } from "./driveItems/driveItems";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
