import authSlice from '~/features/Auth/authSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '~/features/Auth/authApi.service';
import { rtkQueryErrorLogger } from './middleware';
import { eventApi } from '~/features/Event/eventApi.service';
import { categoryApi } from '~/features/Category/categoryApi.service';
import { uploadApi } from '~/features/Upload/uploadApi.service';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  auth: authSlice,
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
      rtkQueryErrorLogger,
    ),

  devTools: import.meta.env.MODE !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
