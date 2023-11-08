import { User } from '#/libs/types/User/User.type';
import { UserCurrency } from '#/libs/types/User/UserCurrency.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  user: User;
};

const initialState: State = {
  user: { isAuth: false, userCurrency: '₴' }
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logOut: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserCurrency: (state, action: PayloadAction<UserCurrency>) => {
      state.user.userCurrency = action.payload;
    }
  }
});

export const { login, logOut, setUserCurrency } = userSlice.actions;
export default userSlice.reducer;
