import React, { useEffect, useState } from "react";
import YourBalance from "./BalanceSummary";
import AddEntryForm from "./TransactionForm";
import PreviousEntry from "./TransactionTable";
import Select from "react-select";
import Charts from "./ExpenseChart";
import { jsPDF } from "jspdf";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [transactionType, setTransactionType] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("entries");
    if (stored) setEntries(JSON.parse(stored));
    else setEntries([]);
  }, []);

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

  const addEntry = (entry) => {
    const entryWithId = { ...entry, id: uuidv4() };
    const updatedEntries = [...entries, entryWithId];
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

  const fileInputRef = useRef(null);

  const deleteEntry = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("entries", JSON.stringify(updated));
  };

  const selectEntiresType =
    transactionType === "All"
      ? entries
      : entries.filter((entry) => entry.category === transactionType);

  const typesOptions = [
    { value: "All", label: "All Categories" },
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
    <div className="min-h-screen bg-gary-50 flex justify-center p-6 sm:p-6 ">
      <div className="w-full max-w-6xl bg-white shadow-xl   rounded-xl  p-6">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          Codezy Expense Tracker
        </h1>
        <YourBalance entries={entries} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AddEntryForm addEntry={addEntry} />
          <Charts entries={entries} />
        </div>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 w-full">
            <h2 className="text-2xl font-semibold text-gray-800">
              Mini Statements
            </h2>
            <div className="flex items-center gap-4 flex-wrap">
              <Select
                options={typesOptions}
                value={typesOptions.find(
                  (option) => option.value === transactionType
                )}
                onChange={(option) => setTransactionType(option.value)}
                placeholder="Select Category"
                className="w-full text-black sm:w-[200px]"
                styles={{
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999, // Ensure the dropdown appears above other elements
                  }),
                  menuList: (base) => ({
                    ...base,
                    maxHeight: 150,
                    overflowY: "auto", // Limit the height of the dropdown
                  }),
                }}
              />
              <button
                onClick={buttonExport}
                className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Export Entries
              </button>
              <label className="relative inline-block">
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={buttonImport}
                  className="hidden"
                />
                <div className="relative inline-block">
                  <input
                    type="file"
                    accept=".json,application/json"
                    ref={fileInputRef}
                    onChange={buttonImport}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
                  >
                    Import Entries JSON
                  </button>
                </div>

                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 hidden sm:block">
                  Only .json files supported
                </span>
              </label>
            </div>
          </div>
          <PreviousEntry
            entries={selectEntiresType}
            deleteEntry={deleteEntry}
            transactionType={transactionType}
          />
        </div>
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
