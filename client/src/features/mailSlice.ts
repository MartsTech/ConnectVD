import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type MailContent = {
  id: string;
  title: string;
  subject: string;
  description: string;
  time: string;
};

interface MailState {
  selectedMail: MailContent | null;
}

const initialState: MailState = {
  selectedMail: null,
};

export const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    selectMail: (state, action: { payload: MailContent }) => {
      state.selectedMail = action.payload;
    },
  },
});

export const { selectMail } = mailSlice.actions;

export const selectOpenMail = (state: RootState) => state.mail.selectedMail;

export default mailSlice.reducer;
