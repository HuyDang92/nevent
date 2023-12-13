import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  code: null,
  secret: null,
  signUpInfo: null,
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
    addSignUpInfo: (state, action) => {
      state.signUpInfo = action.payload;
    },
  },
});
export const { addCode, addSecret, addSignUpInfo } = otpSlice.actions;
const otpReducer = otpSlice.reducer;
export default otpReducer;
