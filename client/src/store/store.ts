import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { airportApi } from './reducers/airport/AirportApi';

// import cartReducer from './reducers/CartSlice';
// import productReducer from './reducers/ProductSlice';
// import userReducer from './reducers/UserSlice';

export const rootReducer = combineReducers({
  // teacherReducer,
  // productReducer,
  // cartReducer,
  // userReducer,
  // productReducer
  // checkOutReducer,
  // [groupApi.reducerPath]: groupApi.reducer,
  // [shopApi.reducerPath]: shopApi.reducer,
  // [orderApi.reducerPath]: orderApi.reducer,
  [airportApi.reducerPath]: airportApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: true
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
