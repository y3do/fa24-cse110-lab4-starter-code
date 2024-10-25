import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const remaining = budget - totalExpenses;

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.

    if (remaining < 0) {
      window.alert("You have exceeded your budget!");
    }

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
