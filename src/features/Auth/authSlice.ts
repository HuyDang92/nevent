import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from './authApi.service';

interface AuthState {
  loggedIn: boolean;
  typeLogin: string;
  accessToken: {
    token: string | null;
  };
  refreshToken: {
    token: string | null;
  };
  currentUser: IUserField | null;
  businessInfo: IBusinessField | null;
  notification: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
  typeLogin: 'google',
  accessToken: {
    token: null,
  },
  refreshToken: {
    token: null,
  },
  currentUser: null,
  businessInfo: null,
  notification: false,
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
    setAuthCurrentUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setBusinessProfile: (state, action) => {
      state.businessInfo = action.payload ? action.payload : null;
    },
    setTypeLoggin: (state, action) => {
      state.typeLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Xử lý logic khi endpoint login account & login Google được fulfilled
    builder.addMatcher(isAnyOf(authApi.endpoints.logInGoogle.matchFulfilled), (state, action) => {
      // Lưu thông tin user vào state khi login
      const response = action.payload;
      if (response?.statusCode === 201) {
        state.loggedIn = true;
        state.accessToken = response?.data.token.accessToken;
        state.refreshToken = response?.data.token.refreshToken;
        state.currentUser = response?.data.user;
        state.businessInfo = response?.data?.businessProfile;
        if (response?.data?.user?.role?.name === 'business') {
          window.location.href = '/organization/event-list';
        }
      } else {
        state.loggedIn = false;
        state.currentUser = null;
        state.accessToken.token = null;
        state.refreshToken.token = null;
        state.businessInfo = null;
      }
    });
  },
});
export const {
  logout,
  assignNewToken,
  assignNewRefreshToken,
  setAuthCurrentUser,
  setNotification,
  setBusinessProfile,
  setTypeLoggin,
} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
