import React from 'react';
import {
  LayoutDashboard,
  AppWindow,
  BarChart,
  Layers,
  Puzzle,
  FileText,
  Table,
  Image,
  File,
  Package
} from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required elements for Doughnut chart
Chart.register(ArcElement, Tooltip, Legend);

const menu = [
  { section: 'YOUR COMPANY', items: [{ icon: LayoutDashboard, label: 'Dashboard', active: true }] },
  {
    section: 'OUR FEATURES',
    items: [
      { icon: AppWindow, label: 'Apps' },
      { icon: BarChart, label: 'Charts' },
      { icon: Layers, label: 'Bootstrap' },
      { icon: Puzzle, label: 'Plugins' },
      { icon: Package, label: 'Widget' },
      { icon: FileText, label: 'Forms' },
      { icon: Table, label: 'Table' },
      { icon: Image, label: 'Svg Icons' },
      { icon: File, label: 'Pages' },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="flex-1 py-8 px-4">
        {menu.map((section) => (
          <div key={section.section} className="mb-8">
            <div className="text-xs text-gray-400 font-semibold mb-2">{section.section}</div>
            <ul>
              {section.items.map((item) => (
                <li key={item.label}>
                  <a
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition ${
                      item.active
                        ? 'bg-green-50 text-green-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    href="#"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar; 