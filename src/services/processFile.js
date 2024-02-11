export function processExpenses(expenses) {
    const processedExpenses = expenses.reduce((result, expense) => {
    const key = expense.description;
    const value = expense.amount;
  
      if (!result[key]) {
        result[key] = 0;
      }
      result[key] += value;
      return result;
    }, {});
    const keyValuePairs = Object.entries(processedExpenses).map(([key, value]) => ({
      key,
      value,
    }));
    return keyValuePairs;
  }
  
  
  