import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from './authApi.service';

interface AuthState {
  loggedIn: boolean;
  accessToken: {
    token: string | null;
  };
  refreshToken: {
    token: string | null;
  };
  currentUser: IUserField | null;
}

const initialState: AuthState = {
  loggedIn: false,
  accessToken: {
    token: null,
  },
  refreshToken: {
    token: null,
  },
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
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
      if (response?.statusCode === 201) {
        console.log('response', response);

        state.loggedIn = true;
        state.accessToken = response?.data.token.accessToken;
        state.refreshToken = response?.data.token.refreshToken;
        state.currentUser = response?.data.user;
      } else {
        state.loggedIn = false;
        state.currentUser = null;
        state.accessToken.token = null;
        state.refreshToken.token = null;
      }
    });
  },
});
export const { logout, assignNewToken, assignNewRefreshToken, setAuthCurrentUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
