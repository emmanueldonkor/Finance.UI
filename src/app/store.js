import {configureStore} from '@reduxjs/toolkit';
import expensesSlice from './expensesSlice';
import ToastMiddleWare from '../middlewares/ToastMiddleWare';
import authenticationSlice from './authenticationSlice';
export default configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    expensesSlice: expensesSlice,
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleWare)
});
