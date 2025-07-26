import React from 'react';

const StatCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500 text-sm">{label}</div>
      </div>
    </div>
  );
};

export default StatCard; 