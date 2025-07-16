import React from "react";

export default function YourBalance({entries}){

    const income = entries
        .filter((e) => e.type === "income")
        .reduce((acc,curr) => acc + curr.amount, 0);
    
    const expenses = entries
        .filter((e) => e.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const net = income - expenses    

    return(
        <div className="bg-gray-100  p-4 rounded-md mb-6 grid grid-cols-1 md:grid-cols-3 hover:cursor-pointer gap-4 ">
            <div className="text-center transition hover:scale-105 p-4 bg-green-600 shadow rounded ">
                <h3 className="text-white font-bold text-lg">Your Total Income</h3>
                <p className="text-white font-bold text-xl">${income.toFixed(2)}</p>
            </div>
            <div className="text-center transition hover:scale-105 hover:cursor-pointer p-4 bg-red-600 shadow rounded">
                <h3 className="text-white font-bold text-lg">Your Total Expenses</h3>
                <p className="text-white font-bold text-xl">${expenses.toFixed(2)}</p>
            </div>
            <div className="text-center transition hover:scale-105 hover:cursor-pointer p-4 bg-blue-500 shadow rounded">
                <h3 className="text-white font-bold text-xl">Net Balance</h3>
                <p className={`font-bold text-xl ${net>=0?"text-green-400":"text-red-400"}`}>${net.toFixed(2)}</p>
            </div>
        </div>
    );

}