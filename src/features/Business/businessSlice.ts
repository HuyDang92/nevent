import { createSlice } from '@reduxjs/toolkit';
interface BusinessState {
  businessInfo: IBusinessField | null;
  eventInfo: IEventInfo | null;
  eventTime: IAddTimeline | null;
  ticketList: TicketListInfo[];
  eventSetting: IEventSettings | null;
  paymentInfo: IPaymentInfo | null;
}
const initialState: BusinessState = {
  businessInfo: null,
  eventInfo: null,
  eventTime: null,
  ticketList: [],
  eventSetting: null,
  paymentInfo: null,
};
const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setBusinessInfo: (state, action) => {
      state.businessInfo = action.payload;
    },
    setEventInfo: (state, action) => {
      state.eventInfo = action.payload;
    },
    setEventTime: (state, action) => {
      state.eventTime = action.payload;
    },
    setTicketList: (state, action) => {
      state.ticketList = [...state.ticketList, action.payload];
    },
    setEventSetting: (state, action) => {
      state.eventSetting = action.payload;
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
    },
  },
});

export const { setBusinessInfo, setEventInfo, setEventTime, setTicketList, setEventSetting, setPaymentInfo } =
  businessSlice.actions;
export default businessSlice.reducer;
