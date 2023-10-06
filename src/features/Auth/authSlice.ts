import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from './authApi.service';

interface AuthState {
  loggedIn: boolean;
  accessToken: {
    token: string | null;
    exp: any | null;
  };
  refreshToken: {
    token: string | null;
    exp: any | null;
  };
  currentUser: IUserField | null;
}

const initialState: AuthState = {
  loggedIn: false,
  accessToken: Object.freeze({ token: null, exp: null }),
  refreshToken: Object.freeze({ token: null, exp: null }),
  currentUser: null,
};

const authSlice = createSlice({
  name: 'authApi',
  initialState,
  reducers: {
    logout: () => initialState,
    assignNewToken: (state, action) => ({
      ...state,
      loggedIn: true,
      accessToken: action.payload,
    }),
    assignNewRefreshToken: (state, action) => ({
      ...state,
      loggedIn: true,
      refreshToken: action.payload,
    }),
    setAuthCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
  },
  extraReducers: (builder) => {
    // Xử lý logic khi endpoint login account & login Google được fulfilled
    builder.addMatcher(isAnyOf(authApi.endpoints.logInGoogle.matchFulfilled), (state, action) => {
      // Lưu thông tin user vào state khi login
      const response = action.payload;
      // if (response?.statusCode === 200) {
      //   state.loggedIn = true;
      //   state.accessToken = response?.data.accessToken;
      //   state.refreshToken = response?.data.refreshToken;
      //   state.currentUser = response?.data.userData;
      // } else {
      //   state.loggedIn = false;
      //   state.currentUser = null;
      //   state.accessToken = Object.freeze({ token: null, exp: null });
      // }
    });
  },
});
export const { logout, assignNewToken, assignNewRefreshToken, setAuthCurrentUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
