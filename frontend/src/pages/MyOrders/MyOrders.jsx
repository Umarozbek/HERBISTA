import {  useEffect, useState } from 'react'
import './MyOrders.css'
import { assets } from '../../assets/assets';
import { Fetch } from '../../middleware/Axios';
import { useSelector } from 'react-redux';
const MyOrders = () => {

  const [orders,setOrders] =  useState([]);
  const [toggle,setToggle] =  useState(null);
  const {data, isPending,isError} = useSelector((state) => state.user);
  useEffect(() => {
    const fetchOrders = async (e) => {
      e.preventDefault();
      try {
         const response = await Fetch.get("orders");
    setOrders(response.data.data)
      } catch (error) {
        console.error(error);
      }
  }
  fetchOrders();
  }, [])
  
  const myOrders = orders.filter((order) => order.user._id === data._id);

  if (isPending) {
    return <div>Loading...</div>;
    }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {myOrders.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                  
                })}</p>
                <p>{order.total}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                {
                  toggle === index ? <button onClick={() => setToggle(null)}>Hide Order</button> : <button onClick={() => setToggle(index)}>Track Order</button>
                }
                {
                  toggle === index && <div>
                    {order.items.map(
                      (item, index) => (
                        <div key={index} className='my-orders-order-item'>
                          <p>{item.name}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: {item.price}.00</p>
                        </div>
                      )
                    )}
                  </div>
                }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
