import { createSlice } from '@reduxjs/toolkit';

interface IUserInfor {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface PaymentState {
  idEvent: string;
  userInfor: IUserInfor | null;
  ticket: ITicket[];
  purchase: {
    paid: boolean;
    purchaseMethod: string;
  };
  discount: number;
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
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    addUserInfor: (state, action) => {
      state.userInfor = action.payload;
    },
  },
});
export const { addUserInfor } = paymentSlice.actions;
export default paymentSlice.reducer;
