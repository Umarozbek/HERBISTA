import './ExploreMenu.css'
import { Fetch } from '../../middleware/Axios'
import { useEffect, useState } from 'react'

const ExploreMenu  = ({category, setCategory}) => {
  const [ foods, setFoods] = useState([])
  const [ menu_list, setMenuList] = useState([])

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

  

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const response = await Fetch.get('categories');
        setMenuList(response.data.data);
      } catch (error) {
        console.error('Error fetching menu list:', error);
      }
    };
    
    fetchMenuList();
  }, []);

  const handleSelectCategory = (category) => {
    setCategory(category);
  }
  const handleRemoveToggle = () => {
    setCategory("All");
  }
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={category !== item.name ? ()=>handleSelectCategory(item.name) : handleRemoveToggle} key={index} className='explore-menu-list-item'>
                      <img src={item.image} className={category===item.name?"active":""} alt="" />
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
