import { 
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useMemo } from 'react';

export default function Charts({ entries }) {
  const { TotalData, categoryExpenseData, OverallData} = useMemo(() =>{
    const income = entries.filter((e) => e.type ==="income").reduce((sum, e) => sum + e.amount, 0);
    const expenses = entries.filter((e) => e.type ==="expense").reduce((sum, e ) => sum + e.amount, 0);

    const TotalData = [
      {name: "Income", value: income , fill: "#4ade80"},
      {name: "Expenses", value: expenses, fill: "#f87171"}
    ];

    const categoryExpenseMap = entries
      .filter((e) => e.type === "expense")
      .reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {});
      
      const categoryExpenseData = Object.entries(categoryExpenseMap).map(([category, amount]) => ({
         category,
         amount,
  }));
  const OverallDataMap = entries.reduce((acc, entry) => {
    const month = entry.date.substring(0,7);
    if(!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }
    if (entry.type === "income") {
      acc[month].income += entry.amount;
    }
    else acc[month].expense += entry.amount;
    return acc;
  }, {});
  const OverallData = Object.entries(OverallDataMap).map(([month, data]) => ({
    month,
    income: data.income,
    expense: data.expense
  }))
  .sort((a,b) => a.month.localeCompare(b.month));


  return { TotalData, categoryExpenseData, OverallData };
  }, [entries]);

return(
      <div className="grid grid-cols-1  gap-6 mt-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-center mb-4">Financial Breakdown</h2>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">

          <PieChart width={500} height={300}>
            <Pie
              data={TotalData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              stroke="#fff"
              />
            <Tooltip />
            <Legend />
          </PieChart>
              </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
        <h2 className="text-lg font-semibold text-center mb-4">Spending by Type</h2>
        <div className='w-full h-[300px]'>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={categoryExpenseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
);
}