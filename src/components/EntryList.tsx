import React, { useState } from "react";
import { ExpenseEntry } from "../types";
import "../styles/EntryList.css";

interface EntryListProps {
  entries: ExpenseEntry[];
  onDelete: (id: string) => void;
  onEdit: (updatedEntry: ExpenseEntry) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempDescription, setTempDescription] = useState("");
  const [tempAmount, setTempAmount] = useState("");

  const startEdit = (entry: ExpenseEntry) => {
    setEditingId(entry.id);
    setTempDescription(entry.description);
    setTempAmount(entry.amount.toString());
  };

  const saveEdit = () => {
    if (!editingId) return;

    const updatedEntry = {
      id: editingId,
      type: entries.find((entry) => entry.id === editingId)?.type || "income",
      description: tempDescription,
      amount: parseFloat(tempAmount),
      date: new Date().toISOString(), // Or keep the original date if desired
    };

    console.log("Updated Entry:", updatedEntry); // Debug log

    onEdit(updatedEntry);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempDescription("");
    setTempAmount("");
  };

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          {editingId === entry.id ? (
            <>
              <input
                type="text"
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
              />
              <input
                type="number"
                value={tempAmount}
                onChange={(e) => setTempAmount(e.target.value)}
              />
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <span>
                {entry.type === "income" ? "+" : "-"} ${entry.amount.toFixed(2)}
              </span>
              <span>{entry.description}</span>
              <button onClick={() => startEdit(entry)}>Edit</button>
              <button onClick={() => onDelete(entry.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
