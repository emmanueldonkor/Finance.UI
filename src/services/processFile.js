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
  //DONT EVER STORE YOUR SECRETs IN PRODUCTION.I DID THIS FOR SOME SECURITY TESTING PURPOSE BECAUSE IT IS A HOBBY PROJECT I'M TESTING
  //IN PRODUCTION USE ENVIRONMENTAL VARIABLE OR ANOTHER SECURED WAY OF STORING SECRETS
  export const CLIENT_ID ='409424832131-r320u1i1t91brqhmuemnk02mtfbk6bn3.apps.googleusercontent.com' 
  
  