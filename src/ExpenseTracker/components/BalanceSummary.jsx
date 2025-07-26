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
        <div className="  grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
            <div className="transition hover:scale-[1.02] text-center p-3 cursor-pointer  rounded-xl min-h-[130px] w-full bg-green-500 text-white shadow-lg ">
                <h3 className="text-white mt-4 font-bold text-xl">Your Total Income</h3>
                <p className="text-white font-bold text-3xl">${income.toFixed(2)}</p>
            </div>
            <div className="text-center transition hover:scale-105 hover:cursor-pointer p-4 min-h-[130px] w-full bg-red-500 shadow-lg rounded-lg">
                <h3 className="text-white font-bold mt-4  text-xl">Your Total Expenses</h3>
                <p className="text-white font-bold text-3xl">${expenses.toFixed(2)}</p>
            </div>
            <div className="text-center transition hover:scale-105 min-h-[130px] w-full hover:cursor-pointer p-4 bg-blue-500 shadow rounded-xl">
                <h3 className="text-white font-bold text-xl mt-4 ">Net Balance</h3>
                <p className={`font-bold text-3xl ${net>=0?"text-green-400":"text-red-400"}`}>${net.toFixed(2)}</p>
            </div>
        </div>
    );

}