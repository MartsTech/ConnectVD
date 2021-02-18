import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface MeetingState {
  details: boolean;
}

const initialState: MeetingState = {
  details: false,
};

export const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    setDetails: (state, action: { payload: boolean }) => {
      state.details = action.payload;
    },
  },
});

export const { setDetails } = meetingSlice.actions;

export const selectDetails = (state: RootState) => state.meeting.details;

export default meetingSlice.reducer;
