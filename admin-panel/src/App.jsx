import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Users from './pages/Users';
import Reservations from './pages/Reservations';
import Orders from './pages/Orders';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App; 