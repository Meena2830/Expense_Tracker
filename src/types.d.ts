export interface ExpenseEntry {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
}
