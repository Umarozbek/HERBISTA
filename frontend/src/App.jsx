import  { useEffect, useState } from 'react'
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
import {getUserError,getUserPending,getUserSuccess} from "./toolkit/UserSlicer"
import { useDispatch } from 'react-redux'
import {Fetch} from "./middleware/Axios"
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(getUserPending());
        const response = (await Fetch.get("users/me")).data;
        
        if (response.data) {
          dispatch(getUserSuccess(response.data));
        } else {
          dispatch(getUserError("No user data available"));
        }
      } catch (error) {
        console.log(error);
        
        dispatch(getUserError(error.response?.data || "Unknown Token"));
      }
    }
    getMyData();
  }, [dispatch]);
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
