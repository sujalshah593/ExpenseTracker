
# 🧾 Codezy Expense Tracker

A responsive and interactive personal finance tracker built with **React** and **Tailwind CSS**, designed to help users manage income and expenses efficiently.

Live Link : 

---

## 📌 Features

✅ Add income and expense transactions  
✅ View live balance summary (Income, Expenses, Net)  
✅ Filter transactions by category  
✅ Data visualization with pie chart (Income & Expense distribution)  
✅ Stylish category dropdown using `react-select`  
✅ Sound feedback on adding entries  
✅ Export transactions to **JSON** or **PDF**  
✅ Import transactions from a `.json` file  
✅ Dark/light mode ready (optional enhancement)  

---

## 🖼️ UI Preview
| Balance Summary | Add Entry Form | Transactions Table |
|-----------------|----------------|---------------------|
| ✅ Responsive UI | ✅ React Select | ✅ Delete & Filter   |

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS  
- **State Management:** useState, useEffect  
- **Charts:** pie chart via `react-chartjs-2` or alternative  
- **Sound:** `react-sound`, `useSound`  
- **PDF Export:** `jspdf`  

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── BalanceSummary.jsx
│   ├── TransactionForm.jsx
│   ├── TransactionTable.jsx
│   ├── TransactionChart.jsx
│    ├── Home.jsx
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/codezy-expense-tracker.git
cd codezy-expense-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App
```bash
npm start
```

---

## 📦 Dependencies

```bash
npm install react-select jspdf react-chartjs-2 chart.js use-sound
```

---

## 🧪 Sample Data for Import
```json
[
  {
    "id": 1,
    "date": "2025-07-15",
    "description": "Netflix Subscription",
    "category": "Subscriptions",
    "amount": 499,
    "type": "expense"
  },
  {
    "id": 2,
    "date": "2025-07-16",
    "description": "Freelance Project",
    "category": "Freelance",
    "amount": 12000,
    "type": "income"
  }
]
```

---

## 📤 Export Formats

- `transactions.json`
- `transactions.pdf` (includes ID, Date, Description, Category, Amount, Type)

---

## 🔊 Sound Integration

Uses `useSound` to play a success sound when a transaction is added.

---

## 🙌 Credits

- UI Framework: Tailwind CSS  
- Sound Effects: [Reactsounds.com](https://www.reactsounds.com)  
- Chart Library: [Chart.js](https://www.chartjs.org/)  

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
