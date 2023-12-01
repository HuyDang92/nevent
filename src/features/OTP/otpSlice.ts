import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  code: null,
  secret: null,
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    addCode: (state, action) => {
      state.code = action.payload;
    },
    addSecret: (state, action) => {
      state.secret = action.payload;
    },
  },
});
export const { addCode, addSecret } = otpSlice.actions;
const otpReducer = otpSlice.reducer;
export default otpReducer;
