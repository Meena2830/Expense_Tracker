import React from "react";
import { ExpenseEntry } from "../types";
import "../styles/Summary.css";

interface SummaryProps {
  entries: ExpenseEntry[];
}

const Summary: React.FC<SummaryProps> = ({ entries }) => {
  const income = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const expense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);
  const balance = income - expense;

  return (
    <div className="summary-container">
      <h3>Summary</h3>
      <div className="summary-item ">
        <p className="income">Income: ${income.toFixed(2)}</p>
        <p className="expense">Expense: ${expense.toFixed(2)}</p>
        <p className="balance">Balance: ${balance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Summary;
