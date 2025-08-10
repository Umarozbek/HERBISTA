import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'
import { use } from 'react'
import { Fetch } from '../../middleware/Axios'
import { useEffect, useState } from 'react'

const ExploreMenu  = () => {


      const [ foods, setFoods] = useState([])
      const [ selectedCategory, setSelectedCategory] = useState("");
      console.log(selectedCategory);
      const [ filteredFoods, setFilteredFoods] = useState([]);
  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const response = await Fetch.get('menu'); // Adjust the endpoint as needed
        
       console.log(response.data.data);
        setFoods(response.data.data);
      } catch (error) {
        console.error('Error fetching menu list:', error);
      }
    };

    

    fetchMenuList();
  }, []);
    const handleSelectCategory = (category) => {
      setSelectedCategory(category);
      console.log(`Selected category: ${category}`);
      const filtered = foods.filter((food) => food.category === category);
      setFilteredFoods(filtered);
      console.log("filteredFoods", filteredFoods);

    }
  const [ menu_list, setMenuList] = useState([])
  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const response = await Fetch.get('categories'); // Adjust the endpoint as needed
       console.log(response.data.data);
        setMenuList(response.data.data);
      } catch (error) {
        console.error('Error fetching menu list:', error);
      }
    };

    fetchMenuList();
  }, []);
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>handleSelectCategory(item.name) } key={index} className='explore-menu-list-item'>
                      <img src={item.image} className={selectedCategory===item.name?"active":""} alt="" />
                    <p>{item.name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
