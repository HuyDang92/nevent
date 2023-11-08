import { createSlice } from '@reduxjs/toolkit';
interface BusinessState {
  businessInfo: IBusinessField | null;
}
const initialState: BusinessState = {
  businessInfo: null,
};
const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setBusinessInfo: (state, action) => {
      state.businessInfo = action.payload;
    },
  },
});

export const { setBusinessInfo } = businessSlice.actions;
export default businessSlice.reducer;
