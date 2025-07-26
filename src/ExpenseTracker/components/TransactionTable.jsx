import React from "react";

export default function PreviousEntry({entries, deleteEntry}){

    return(
        <div className="mb-6 pt-3 border border-gray-300 rounded-lg">
            <h2 className="text-center  text-xl font-semibold mb-4 text-black mt-3">Mini Statements</h2>
            {entries.length === 0 ? (
                <p className="text-gray-400 italic text-center mb-5">No Mini Statements.Add Entries</p>
            ):(
                <div className="overflow-x-auto p-5 ">
                    <table className="min-w-full text-sm  border border-blue-400 ">
                        <thead className="bg-white">
                            <tr className="border-gray-200">
                                <th className="p-2 border border-gray-300 font-semibold text-gray-400" >Date</th>
                                <th className="p-2 border border-gray-300 font-semibold text-gray-400">Description</th>
                                <th className="p-2 border border-gray-300 font-semibold text-gray-400">Category</th>
                                <th className="p-2 border border-gray-300 font-semibold text-gray-400">Amount</th>
                                <th className="p-2 border border-gray-300 font-semibold text-gray-400">Type</th>
                                <th className="p-2 border border-gray-300 font-semibold text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((e) => (
                                <tr key={e.id} className={e.type === "income" ? "text-green-600":"text-red-500"}>
                                    <td className="p-2 border border-gray-300 font-normal">{e.date}</td>
                                    <td className="p-2 border border-gray-300 font-normal">{e.description}</td>
                                    <td className="p-2 border border-gray-300 font-normal">{e.category}</td>
                                    <td className="p-2 border border-gray-300 font-normal">{e.amount.toFixed(2)}</td>
                                    <td className="p-2 border border-gray-300 font-normal">{e.type}</td>
                                    <td className="p-2 border border-gray-300 font-normal">
                                        <button onClick={() => deleteEntry(e.id)}
                                            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

}