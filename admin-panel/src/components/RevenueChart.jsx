import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Income',
      data: [23, 45, 50, 30, 25, 40, 20],
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: '#3B82F6',
      tension: 0.4,
    },
    {
      label: 'Expense',
      data: [20, 35, 30, 45, 28, 25, 50],
      fill: true,
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: '#EF4444',
      tension: 0.4,
    },
  ],
};
const options = {
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } },
};

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-lg">Revenue</div>
        <div className="flex gap-2">
          <button className="text-green-600 border-b-2 border-green-600 pb-1">Daily</button>
          <button className="text-gray-400">Weekly</button>
          <button className="text-gray-400">Monthly</button>
        </div>
      </div>
      <div className="flex items-center gap-6 mb-4">
        <div className="text-blue-600 font-bold">Income $23,445 <span className="text-green-500 text-sm">+0.4%</span></div>
        <div className="text-red-500 font-bold">Expense $8,345 <span className="text-red-400 text-sm">+0.4%</span></div>
      </div>
      <Line data={data} options={options} height={120} />
    </div>
  );
};

export default RevenueChart; 