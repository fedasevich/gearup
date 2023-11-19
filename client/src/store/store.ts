import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './api';
import searchReducer from './reducers/SearchSlice';
import { airportApi } from './reducers/airport/AirportApi';
import { flightApi } from './reducers/flight/FlightApi';
import userReducer from './reducers/user/UserSlice';

const authPersistConfig = {
  key: 'userReducer',
  storage,
  blacklist: ['user']
};

export const rootReducer = combineReducers({
  // teacherReducer,
  // productReducer,
  // cartReducer,
  // userReducer,
  // productReducer
  // checkOutReducer,
  // eslint-disable-next-line no-use-before-define
  userReducer: persistReducer(authPersistConfig, userReducer),
  searchReducer,
  // [groupApi.reducerPath]: groupApi.reducer,
  // [shopApi.reducerPath]: shopApi.reducer,
  // [orderApi.reducerPath]: orderApi.reducer,
  [airportApi.reducerPath]: airportApi.reducer,
  [flightApi.reducerPath]: flightApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }).concat(api.middleware),
    devTools: true
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
