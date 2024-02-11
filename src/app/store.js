import {configureStore} from '@reduxjs/toolkit';
import expensesSlice from './expensesSlice';
import statisticsSlice from './statisticsSlice';
import ToastMiddleWare from '../middlewares/ToastMiddleWare';
import authenticationSlice from './authenticationSlice';
export default configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    expensesSlice: expensesSlice,
    statisticsSlice: statisticsSlice
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleWare)
});
