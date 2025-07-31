import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import { Fetch } from './middleware/Axios'
import axios from 'axios'

const App = () => {
 
  useEffect(() => {
  const getme = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      });
      console.log('User data fetched successfully:', response);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };
  getme();
  },[]);
  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/checkout' element={<PlaceOrder />}/>
          <Route path='/login' element={<LoginPopup setShowLogin={setShowLogin} />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          <Route path='/myorders' element={<MyOrders />}/>
          <Route path='/verify' element={<Verify />}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
