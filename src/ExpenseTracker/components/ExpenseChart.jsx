import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SimplePieChart = ({ entries }) => {
  const income = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const expense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#4ade80", "#f87171"], // green, red
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-center text-gray-700 mb-2">
        Total Money Saved
      </h2>
      <div className="w-[300px] mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default SimplePieChart;
