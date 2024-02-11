import {createSlice} from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: '',
    isLoggedIn: false,
  },
  reducers: {
    userAuthenticated: (state, action) => {
      sessionStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...{
          token: action.payload.token,
          isLoggedIn: true,
        },
      };
    },
    logOut: () => {
      sessionStorage.clear();
    },
  },
});

export const {userAuthenticated, logOut} = authenticationSlice.actions;
export default authenticationSlice.reducer;