

import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses } from '../../services/expenses';
import  "./ExpenseList.css"
import ListRow from './ListRow';

const ExpenseList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; 

  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expensesSlice.expenses);

  useEffect(() => {
    GetExpenses(dispatch);
  }, [dispatch]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentExpenses = expenses.slice(offset, offset + itemsPerPage);

  return (
    <div>
    {currentExpenses.map((expense) => (
      <ListRow expense={expense} key={expense.id} />
    ))}

    {/* Conditionally render pagination only if there are more than one page */}
    {Math.ceil(expenses.length / itemsPerPage) > 1 && (
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        pageCount={Math.ceil(expenses.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousLinkClassName={'pagination-link'}
        nextLinkClassName={'pagination-link'}
        breakClassName={'pagination-break'}
        pageClassName={'pagination-page'}
      />
    )}
  </div>
  );
};

export default ExpenseList;
