import React, { useEffect, useState } from "react";
import YourBalance from "./BalanceSummary";
import AddEntryForm from "./TransactionForm";
import PreviousEntry from "./TransactionTable";
import Select from "react-select";
import SimplePieChart from "./ExpenseChart";
import { jsPDF } from "jspdf";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [transactionType, setTransactionType] = useState("All");

  const buttonExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Entires Report", 20, 20);
    let y = 30;
    entries.forEach((entry, index) => {
      doc.setFontSize(12);
      doc.text(
        `id:${index + 1}. date:${entry.date}, description:${
          entry.description
        }, category:${entry.category}, Amount:${entry.amount}, Type:${
          entry.type
        }`,
        20,
        y
      );
      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save("entries.pdf");
  };

  const buttonImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const check = new FileReader();
    check.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          setEntries(importedData);
          localStorage.setItem("entries", JSON.stringify(importedData));
          alert("Entries import successfully");
        } else {
          alert("Invalid file format");
        }
      } catch (err) {
        alert("Error Try Again");
      }
    };
    check.readAsText(file);
  };

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries((prev) => [...prev, entry]);
  };

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const selectEntiresType =
    transactionType === "All"
      ? entries
      : entries.filter((entry) => entry.category === transactionType);

  const typesOptions = [
    { value: "Food", label: "Food" },
    { value: "Transportation", label: "Transportation" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Utilities", label: "Utilities" },
    { value: "Rent", label: "Rent" },
    { value: "Salary", label: "Salary" },
    { value: "Freelance", label: "Freelance" },
    { value: "Supplies", label: "Supplies" },
    { value: "Bank Charges", label: "Bank Charges" },
    { value: "Car Maintenance", label: "Car Maintenance" },
    { value: "Dining out", label: "Dining out" },
    { value: "Shopping", label: "Shopping" },
    { value: "Subscriptions", label: "Subscriptions" },
    { value: "Gifts", label: "Gifts" },
    { value: "Health Care", label: "Health Care" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-white flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white border-gray-500 border rounded-xl shadow-md p-6">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 text-transparent bg-clip-text">
          Codezy Expense Tracker
        </h1>
        <YourBalance entries={entries} />
        <AddEntryForm addEntry={addEntry} />
        <Select
          options={typesOptions}
          value={typesOptions.find((opt) => opt.value === transactionType)}
          onChange={(selected) =>
            setTransactionType((prev) => ({
              ...prev,
              category: selected.value,
            }))
          }
          placeholder="Category"
          className="text-black"
          styles={{
            menu: (base) => ({
              ...base,
              zIndex: 9999,
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: 150,
              overflowY: "auto",
            }),
          }}
        />
        <PreviousEntry entries={selectEntiresType} deleteEntry={deleteEntry} />
        <div className="gap-5 flex flex-wrap justify-center items-center mt-5">
          <button
            onClick={buttonExport}
            className=" bg-red-600 px-3 py-2 rounded-xl text-white font-semibold hover:bg-red-700 hover:cursor-pointer "
          >
            Export Entries
          </button>
          <div className="relative flex flex-col items-center">
            <label className="relative group cursor-pointer">
              <input
                type="file"
                accept=".json,application/json"
                onChange={buttonImport}
                className="bg-blue-600 px-3 w-54 py-2 rounded-xl text-white font-semibold hover:bg-blue-700 cursor-pointer"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                Only .json files supported
              </span>
            </label>
            <span className="text-xs text-gray-600 mt-1 md:hidden">
              Only .json files supported
            </span>
          </div>
        </div>
        <SimplePieChart entries={entries} />
      </div>
    </div>
  );
}

// <select
//   name="category"
//   value={setTransactionType}
//   onChange={(e) => setTransactionType(e.target.value)}
//   className="border mb-3 bg-green-600 text-white border-gray-400 p-3 rounded-lg "
// ></select>
