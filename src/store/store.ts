import authSlice from '~/features/Auth/authSlice';
import ticketSlice from '~/features/Auth/ticketSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '~/features/Auth/authApi.service';
import { rtkQueryErrorLogger } from './middleware';
import { eventApi } from '~/features/Event/eventApi.service';
import { categoryApi } from '~/features/Category/categoryApi.service';
import paymentSlice from '~/features/Payment/paymentSlice';
import { bankApi } from '~/features/Payment/bankApi.service';
import { uploadApi } from '~/features/Upload/uploadApi.service';
import { businessApi } from '~/features/Business/business.service';
import businessSlice from '~/features/Business/businessSlice';
import otpSlice from '~/features/OTP/otpSlice';
import { paymentApi } from '~/features/Payment/paymentApi.service';
import { locationApi } from '~/features/location/location.service';
import { otpApi } from '~/features/OTP/otpApi.service';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'payment', 'ticket', 'otp'],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  [bankApi.reducerPath]: bankApi.reducer,
  [businessApi.reducerPath]: businessApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [otpApi.reducerPath]: otpApi.reducer,
  auth: authSlice,
  payment: paymentSlice,
  ticket: ticketSlice,
  business: businessSlice,
  otp: otpSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      categoryApi.middleware,
      eventApi.middleware,
      uploadApi.middleware,
      bankApi.middleware,
      businessApi.middleware,
      paymentApi.middleware,
      locationApi.middleware,
      otpApi.middleware,
      rtkQueryErrorLogger,
    ),

  devTools: import.meta.env.MODE !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
