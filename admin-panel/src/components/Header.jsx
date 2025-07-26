import React from 'react';
import { Menu, Search, Moon, Bell, Mail, Calendar, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-500 cursor-pointer" />
        <div>
          <div className="font-bold text-xl text-green-600">Herbista</div>
          <div className="text-xs text-gray-400 -mt-1">Restaurant Admin</div>
        </div>
      </div>
      <div className="font-semibold text-lg hidden md:block">Dashboard</div>
      <div className="flex-1 mx-8 max-w-md">
        <div className="relative">
          <input
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Search here..."
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Moon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
        <Mail className="w-5 h-5 text-gray-500 cursor-pointer" />
        <Calendar className="w-5 h-5 text-gray-500 cursor-pointer" />
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="w-9 h-9 rounded-full border-2 border-green-500"
        />
      </div>
    </header>
  );
};

export default Header; 