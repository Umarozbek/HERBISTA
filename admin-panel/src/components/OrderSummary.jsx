import React from 'react';
import { Doughnut } from 'react-chartjs-2';
const express = require('express');
const cors = require('cors');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/orders', ordersRouter);

app.listen(5000, () => console.log('Server running on port 5000'));
const data = {
  labels: ['On Delivery', 'Delivered', 'Canceled'],
  datasets: [
    {
      data: [6245, 2355, 9456],
      backgroundColor: ['#3B82F6', '#22C55E', '#F59E0B'],
      borderWidth: 0,
    },
  ],
};

const OrderSummary = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-lg">Order Summary</div>
        <select className="border rounded px-2 py-1 text-sm">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="text-gray-500 text-sm mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </div>
      <div className="flex items-center gap-8">
        <Doughnut data={data} width={120} height={120} />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            <span>On Delivery</span>
            <span className="ml-auto font-bold">$6,245</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            <span>Delivered</span>
            <span className="ml-auto font-bold">$2,355</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-400 inline-block"></span>
            <span>Canceled</span>
            <span className="ml-auto font-bold">$9,456</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 