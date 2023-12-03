import { createSlice } from '@reduxjs/toolkit';

interface IUserInfor {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface INewTicket extends ITicket {
  orderQuantity: number;
}

interface PaymentState {
  idEvent: string;
  userInfor: IUserInfor | null;
  ticket: INewTicket[];
  purchase: {
    paid: boolean;
    purchaseMethod: string;
  };
  discount: number;
  method: string | null;
}

const initialState: PaymentState = {
  idEvent: '',
  userInfor: null,
  ticket: [],
  purchase: {
    paid: false,
    purchaseMethod: '',
  },
  discount: 0,
  method: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    refreshPayment: (state, action) => {
      state.idEvent = action.payload;
      state.ticket = [];
    },
    addUserInfor: (state, action) => {
      state.userInfor = action.payload;
    },
    addMethod: (state, action) => {
      state.method = action.payload;
    },
    inscreaseTicket: (state, action) => {
      if (state.ticket.find((ticket) => ticket._id === action.payload._id)) {
        const index = state.ticket.findIndex((ticket) => ticket._id === action.payload._id);
        state.ticket[index].orderQuantity += 1;
      } else {
        const newTicket = { ...action.payload };
        newTicket.orderQuantity = 1;
        state.ticket.push(newTicket);
      }
    },
    descreaseTicket: (state, action) => {
      if (state.ticket.find((ticket) => ticket._id === action.payload._id)) {
        const index = state.ticket.findIndex((ticket) => ticket._id === action.payload._id);
        if (state.ticket[index].orderQuantity > 1) {
          state.ticket[index].orderQuantity -= 1;
        } else {
          state.ticket.splice(index, 1);
        }
      }
    },
  },
});
export const { addUserInfor, inscreaseTicket, descreaseTicket, refreshPayment, addMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
