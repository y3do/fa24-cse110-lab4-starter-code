import { Expense } from "../../types/types";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);


  // Exercise: Remove expense from expenses context array
  const handleDeleteExpense = (expenseToDelete: Expense) => {
    // target curr exp
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseToDelete.id
    );
    setExpenses(updatedExpenses); // new arr
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
