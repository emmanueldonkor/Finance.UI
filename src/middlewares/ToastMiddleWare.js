import { newExpense,editExpense, deleteExpense, setExpensesError, newExpenseError, editExpenseError, deleteExpenseError } from '../app/expensesSlice';
import {toast} from 'react-toastify';
const ToastMiddleWare = () => next => action =>{
 switch(action.type){
    case newExpense.type:
        toast.success("New Expense Added Successfully!")
        break;
    case editExpense.type:
        toast.success('Expense edited successsfully')
        break;
    case deleteExpense.type:
      toast.success('Expense Deleted Successfully');
      break; 
    case setExpensesError.type:
        toast.error('Error loading expenses');
        break; 
    case newExpenseError.type:
        toast.error('Error adding new expense');
        break;
    case editExpenseError.type:
        toast.error('Error editing expense');
        break;
    case deleteExpenseError.type:
        toast.error('Error deleteing expense')
        break;
    default:
        break;
 }
 return next(action)
}
export default ToastMiddleWare;