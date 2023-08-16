import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  accessToken: Object.freeze({ token: null, exp: null }),
  refreshToken: Object.freeze({ token: null, exp: null }),
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    assignNewToken: (state, action) => ({
      ...state,
      accessToken: action.payload,
    }),
    setAuthCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
  },
  extraReducers: (builder) => {},
});
export const { logout, assignNewToken, setAuthCurrentUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
// const { reducer, actions } = authSlice;
// export const { logout, assignNewToken, setAuthCurrentUser } = actions;
// export default reducer;
