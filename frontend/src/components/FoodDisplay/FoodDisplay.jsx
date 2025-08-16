import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { Fetch } from '../../middleware/Axios'
import { useEffect, useState } from 'react'

const FoodDisplay = ({category}) => {
const [ foods, setFoods] = useState([])
  
    useEffect(() => {
      const fetchMenuList = async () => {
        try {
          const response = await Fetch.get('menu'); 
          setFoods(response.data.data);
        } catch (error) {
          console.error('Error fetching menu list:', error);
        }
      };
      fetchMenuList();
    }, []);



  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {foods.map((item)=>{
          if (category==="All" || category===item.category) {
            return <FoodItem key={item._id} status={item.status} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/>
          }
        })} 
       </div>
    </div>
  )
}

export default FoodDisplay
