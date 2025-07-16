import React from "react";

export default function PreviousEntry({entries, deleteEntry}){

    return(
        <div>
            <h2 className="flex justify-center items-center text-xl font-semibold mb-4 text-blue-600 mt-3">Mini Statements</h2>
            {entries.length === 0 ? (
                <p className="text-red-500 italic text-center">No Mini Statements.Add Entries</p>
            ):(
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Date</th>
                                <th className="p-2 border">Description</th>
                                <th className="p-2 border">Category</th>
                                <th className="p-2 border">Amount</th>
                                <th className="p-2 border">Type</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((e) => (
                                <tr key={e.id} className={e.type === "income" ? "text-green-600":"text-red-500"}>
                                    <td className="p-2 border">{e.date}</td>
                                    <td className="p-2 border">{e.description}</td>
                                    <td className="p-2 border">{e.category}</td>
                                    <td className="p-2 border">{e.amount.toFixed(2)}</td>
                                    <td className="p-2 border">{e.type}</td>
                                    <td className="p-2 border">
                                        <button onClick={() => deleteEntry(e.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs">
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