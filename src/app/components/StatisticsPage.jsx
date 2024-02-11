
import { useEffect,useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses } from '../../services/expenses';
import { processExpenses } from '../../services/processFile';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  animation: false, // Disable animation
};

export default function StatisticsPage() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expensesSlice.expenses);
  const [total, setTotal] = useState(0);
  const [doughnut, setDoughnut] = useState({
    labels: [],
    data: [],
  });
  
  useEffect(() => {
    const fetchData = async () => {
      await GetExpenses(dispatch);
    };

    fetchData();
  }, [dispatch]);

  // Using useMemo to memoize the result of processExpenses
  const newExpense = useMemo(() => processExpenses(expenses), [expenses]);
  
   useMemo(()=> setTotal(expenses.reduce((acc, expense)=>{
    return acc + expense.amount
  },0)), [expenses])


  useEffect(() => {
    setDoughnut({
      labels: newExpense.map((x) => x.key),
      data: newExpense.map((x) => x.value),
    });
  }, [newExpense]);

  const data = {
    labels: doughnut.labels,
    datasets: [
      {
        data: doughnut.data,
        backgroundColor: [
          '#007bff',
          '#FF0000',
          '#FFD700',
          '#28a745',
          '#FF00FF',
          '#ff9900',
          '#00FFFF',
          '#d69ae5',
          '#FF8F66',
          '00FF00',
        ],
      },
    ],
  };

  return (
    <div
      hidden={!newExpense || !newExpense.length}
      style={{
        maxWidth: '30rem',
        maxHeight: '30rem',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <h4 style={{ marginTop: '10px' }}>Expenses Per Category</h4>
      <Doughnut data={data} options={options} />
      <h4 >Total:€{total.toFixed(2)}</h4>
    </div>
  );
}
