import './ExploreMenu.css'
import { Fetch } from '../../middleware/Axios'
import { useEffect, useState } from 'react'

const ExploreMenu  = () => {
  const [ foods, setFoods] = useState([])
  const [ selectedCategory, setSelectedCategory] = useState("");
  const [toggle, setToggle] = useState(false);
  const [ filteredFoods, setFilteredFoods] = useState([]);
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
    setSelectedCategory(category);
    const filtered = foods.filter((food) => food.category === category);
    setFilteredFoods(filtered);
    setToggle(true);
  }
  const handleRemoveToggle = () => {
    setToggle(false);
    setSelectedCategory("");
  }
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
      {toggle && (
        <div className="explore-menu-foods">
          <p onClick={handleRemoveToggle} className='remove-toggle'>X</p>
          {filteredFoods.map((food, index) => (
            <a href={`/food/${food._id}`} key={index} className="explore-menu-food-item">
              <img src={food.image} alt={food.name}  />
              <h2>{food.name}</h2>
              <p>{food.description}</p>
              <span>${food.price}</span>
            </a>
          ))}
        </div>
      )}
      <hr />
    </div>
  )
}

export default ExploreMenu
