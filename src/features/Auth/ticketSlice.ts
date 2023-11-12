import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  ticketByEvent: [],
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    addTicketByEvent: (state, action) => {
      state.ticketByEvent = [];
      state.ticketByEvent.push(action.payload);
    },
  },
});
export const { addTicketByEvent } = ticketSlice.actions;
const ticketReducer = ticketSlice.reducer;
export default ticketReducer;
