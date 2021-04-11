import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

import { getEnumStrKeys } from "../../src.common/utils/enums";
import { intIdGenerator } from "../../src.common/data/intIdGenerator";

export enum AppTestMsgTypes {
  t1 = 1,
  t2 = 2,
  t3 = 3,
  t4 = 4,
  t5 = 5,
  t6 = 6,
}

export const appTestMsgTypesEnumKeys = Object.freeze(
  getEnumStrKeys(AppTestMsgTypes)
);

export interface AppTestMsg {
  intIdx?: number;
  msgText: string;
  msgType?: AppTestMsgTypes;
}

export interface AppMessagesState {
  msgArr: AppTestMsg[];
}

const initialState = {
  msgArr: [],
} as AppMessagesState;

export const appMessagesSlice = createSlice({
  name: "appMessages",
  initialState,
  reducers: {
    pushMsg: (state, action: PayloadAction<AppTestMsg>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const msg = { ...action.payload };

      msg.intIdx = msg.intIdx ?? intIdGenerator.getNextId();

      const msgArr = state.msgArr.slice(0, state.msgArr.length);
      msgArr.splice(0, 0, msg);

      msgArr.forEach((val, idx, arr) => {
        val.msgType = (appTestMsgTypesEnumKeys[
          (arr.length - 1 - idx) % appTestMsgTypesEnumKeys.length
        ] as unknown) as AppTestMsgTypes;
      });

      state.msgArr = msgArr;
    },
  },
});

export const { pushMsg } = appMessagesSlice.actions;

export const selectMsgArr = (state: RootState) => state.appMessages.msgArr;

export default appMessagesSlice.reducer;
