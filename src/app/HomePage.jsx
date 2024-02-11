
import ExpenseList from "./components/expenseList";
import ExpenseForm from "./components/ExpenseForm";
import StatisticsPage from "./components/StatisticsPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './homepage.css';

export default function HomePage() {
  return (
    <div className="app-container">
      <div className="form-container">
        <ToastContainer />
        <ExpenseForm />
        <hr />
        <ExpenseList />
      </div>
      <div className='statistics-container'>
         <StatisticsPage />
         </div>
    </div>
  );
}

