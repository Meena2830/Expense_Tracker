import React, { useState } from "react";
import { ExpenseEntry } from "../types";
import "../styles/AddEntryForm.css";

interface AddEntryFormProps {
  onAdd: (entry: ExpenseEntry) => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onAdd }) => {
  const [type, setType] = useState<"income" | "expense">("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    const newEntry: ExpenseEntry = {
      id: Date.now().toString(),
      type,
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };
    onAdd(newEntry);
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddEntryForm;
