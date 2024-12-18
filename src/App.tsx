import React, { useState, useEffect } from "react";
import AddEntryForm from "./components/AddEntryForm";
import EntryList from "./components/EntryList";
import Summary from "./components/Summary";
import ExpenseChart from "./components/ExpenseChart";
import { ExpenseEntry } from "./types";
import "./App.css";
const App: React.FC = () => {
  const storedEntries = localStorage.getItem("entries");
  const initialEntries = storedEntries ? JSON.parse(storedEntries) : [];

  const [entries, setEntries] = useState<ExpenseEntry[]>(initialEntries);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (entry: ExpenseEntry) => {
    setEntries((prev) => [...prev, entry]);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleEditEntry = (updatedEntry: ExpenseEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
  };

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      <div className="entry-container">
        <AddEntryForm onAdd={handleAddEntry} />
        <Summary entries={entries} />
      </div>
      <div className=" chart_list-container">
        <ExpenseChart entries={entries} />
        <EntryList
          entries={entries}
          onDelete={handleDeleteEntry}
          onEdit={handleEditEntry}
        />
      </div>
    </div>
  );
};

export default App;
