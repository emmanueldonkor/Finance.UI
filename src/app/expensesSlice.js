import {createSlice, createAction} from '@reduxjs/toolkit';

export const setExpensesError = createAction('setExpensesError');
export const newExpenseError = createAction('newExpensesError');
export const deleteExpenseError = createAction('deleteExpenseError');
export const editExpenseError = createAction('editExpenseError');

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
  },
  reducers: {
    setExpenses: (state, action) => {
      const sortedExpenses = [...action.payload].reverse();
      return {...state, expenses: sortedExpenses};
    },
    newExpense: (state, action) => {
      return {...state, expenses: [action.payload, ...state.expenses]};
    },
    editExpense: (state, action) => {
      const updatedExpenses = state.expenses.map(expense =>
        expense.id === action.payload.id
          ? {...expense, ...action.payload}
          : expense
      );
      return {...state, expenses: updatedExpenses};
    },
    deleteExpense: (state, action) => {
      const filteredExpenses = state.expenses.filter(
        expense => expense.id !== action.payload.id
      );
      return {...state, expenses: filteredExpenses};
    }
  }
});

export const {setExpenses, newExpense, editExpense, deleteExpense} = expensesSlice.actions;
export default expensesSlice.reducer; 