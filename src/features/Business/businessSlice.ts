import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from '../Auth/authApi.service';
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
    resetForm: (state) => {
      (state.eventInfo = null), (state.eventTime = null), (state.ticketList = []);
    },

    setEventInfo: (state, action) => {
      state.eventInfo = action.payload;
    },
    setEventTime: (state, action) => {
      state.eventTime = action.payload;
    },
    setTicketInfo: (state, action) => {
      state.ticketList = action.payload;
    },
    addTicket: (state, action) => {
      state.ticketList = [...state.ticketList, action.payload];
    },
    removeTicket: (state, action) => {
      state.ticketList = [...state.ticketList.filter((ticket: TicketListInfo) => ticket.type !== action.payload.type)];
    },
    editTicket: (state, action) => {
      state.ticketList = [...state.ticketList.filter((ticket: TicketListInfo) => ticket._id !== action.payload._id)];
      state.ticketList = [...state.ticketList, action.payload];
    },
    setEventSetting: (state, action) => {
      state.eventSetting = action.payload;
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   // Xử lý logic khi endpoint login account & login Google được fulfilled
  //   builder.addMatcher(isAnyOf(authApi.endpoints.logInGoogle.matchFulfilled), (state, action) => {
  //     // Lưu thông tin user vào state khi login
  //     const response = action.payload;
  //     console.log(response?.data);
  //     if (response?.statusCode === 201) {
  //       state.businessInfo = response?.data?.businessProfile;
  //     } else {
  //       state.businessInfo = null;
  //     }
  //   });
  // },
});

export const {
  setEventInfo,
  setEventTime,
  setTicketInfo,
  addTicket,
  removeTicket,
  setEventSetting,
  setPaymentInfo,
  editTicket,
  resetForm,
} = businessSlice.actions;
export default businessSlice.reducer;
