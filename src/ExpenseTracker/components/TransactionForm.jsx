import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { useSound } from "react-sounds";

export default function AddEntryForm({ addEntry }) {
  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
    type: "income",
  });

  const {play}  = useSound('ui/success_blip' , {preload:true});

  const typesOptions = [
    {value: "Food", label : "Food"},
    {value: "Transportation", label : "Transportation"},
    {value: "Entertainment", label : "Entertainment"},
    {value: "Utilities", label : "Utilities"},
    {value: "Rent", label : "Rent"},
    {value: "Salary", label : "Salary"},
    {value: "Freelance", label : "Freelance"},
    {value: "Supplies", label : "Supplies"},
    {value: "Bank Charges", label : "Bank Charges"},
    {value: "Car Maintenance", label : "Car Maintenance"},
    {value: "Dining out", label : "Dining out"},
    {value: "Shopping", label : "Shopping"},
    {value: "Subscriptions", label : "Subscriptions"},
    {value: "Gifts", label : "Gifts"},
    {value: "Health Care", label : "Health Care"},
    {value: "Other", label : "Other"},
  ]

  const [error, setError] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setForm((f) => ({ ...f, date: `${yyyy}-${mm}-${dd}` }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, description, category, amount, type } = form;

    if (!description) {
      setError("Description is required.");
    } else if (!category) {
      setError("Please select a category.");
    } else if (isNaN(amount) || amount <= 0) {
      setError("Enter a valid positive amount.");
    }

    addEntry({
      id: Date.now(),
      date,
      description,
      category,
      amount: parseFloat(amount),
      type,
    });

    play();

    setForm((f) => ({
      ...f,
      description: "",
      category: "",
      amount: "",
      type: "income",
    }));
  };

  return (
    <div className="mb-6 p-4 shadow-lg   rounded-lg">
      <h2 className="text-xl p-3 text-center font-semibold  ">
        Add New Transaction
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-7 text-black w-full">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border w-full p-2 rounded text-black  border-gray-500"
        />
        <input
          type="text"
          name="description"
          placeholder="Description..."
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded text-black border-gray-500"
        />
        <Select 
            options={typesOptions}
            value={typesOptions.find((opt)=>opt.value === form.category)}
            onChange={(selected) => setForm((prev) => ({...prev, category:selected.value}))}
            placeholder="Select Category"
            className="text-black w-full"
            styles={{
                menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                }),
                menuList: (base) => ({
                    ...base,
                    maxHeight: 150,
                    overflowY   : "auto",
                })
            }}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border w-full p-2 rounded border-gray-500 text-black"
        />
        <div className="flex gap-4 items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="type"
              value="expense"
              checked={form.type === "expense"}
              onChange={handleChange}
              className="mr-2 cursor-pointer"
            />
            Expense
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="type"
              value="income"
              checked={form.type === "income"}
              onChange={handleChange}
              className="mr-2 cursor-pointer"
            />
            Income
          </label>
        </div>
        <button
          type="submit"
          onClick={play}
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700 font-bold hover:cursor-pointer"
        >
          Add Transaction
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
