
import {
  setExpenses,
  deleteExpense,
  newExpense,
  editExpense,
  setExpensesError,
  deleteExpenseError,
  newExpenseError,
  editExpenseError
} from '../app/expensesSlice';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:`${import.meta.env.REACT_APP_BASE_URL}/Expenses`,
});

axiosInstance.interceptors.request.use(config => {
config.headers = {authorization: `Bearer ${sessionStorage.getItem('token')}`};
return config;
});

export const GetExpenses = async dispatch => {
  try {
    //api call
    const {data} = await axiosInstance.get();
    dispatch(setExpenses(data));
  } catch {
    dispatch(setExpensesError());
  }
};

export const NewExpense = async (dispatch, expense) => {
  try {
    //api call
    const {data} = await axiosInstance.post('', expense);
    dispatch(newExpense(data));
  } catch {
    dispatch(newExpenseError());
  }
};

export const EditExpense = async (dispatch, expense) => {
  try {
    await axiosInstance.put(`/${expense.id}`, expense);
    dispatch(editExpense(expense));
  } catch {
    dispatch(editExpenseError());
  }
};

export const DeleteExpense = async (dispatch, expense) => {
  try {
    await axiosInstance.delete(`/${expense.id}`);
    dispatch(deleteExpense(expense));
  } catch {
    dispatch(deleteExpenseError());
  }
};

