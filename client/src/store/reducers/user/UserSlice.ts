import { User } from '@/libs/types/User/User.type';
import { UserCurrency } from '@/libs/types/User/UserCurrency.type';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

interface UserCurrencyWithRate {
  currency: UserCurrency;
  rate: number;
}

type UserState = {
  user: User | null;
  userCurrency: UserCurrencyWithRate;
};

const initialState: UserState = {
  user: null,
  userCurrency: { currency: '$', rate: 1 }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      const user = jwt_decode<User>(token);
      state.user = user;
      localStorage.setItem('token', token);
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
    setUserCurrency: (state, action: PayloadAction<UserCurrencyWithRate>) => {
      state.userCurrency = action.payload;
    }
  }
});

export const { setCredentials, logOut, setUserCurrency } = userSlice.actions;

export default userSlice.reducer;
