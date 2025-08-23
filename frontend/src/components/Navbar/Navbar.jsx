import  { useEffect, useState, useRef } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fetch } from '../../middleware/Axios'

const Navbar = ({ setShowLogin }) => {
  const {isPending, isAuth} = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [menu, setMenu] = useState("home");
  const [cart, setCart] = useState([]);  
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = (await Fetch.get('/menu')).data;
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchAllProducts();

    // ✅ localStorage o‘zgarsa cartni yangilash
    const syncCart = () => {
      const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCart(stored);
    };
    window.addEventListener("storage", syncCart);
    syncCart();

    return () => window.removeEventListener("storage", syncCart);
  }, []);

  const addToCart = (item) => {
    let newCart = [...cart];
    const foundIndex = newCart.findIndex(c => c.id === item._id);
    if (foundIndex !== -1) {
      newCart[foundIndex].quantity += 1;
    } else {
      newCart.push({ id: item._id, name: item.name, image: item.image, price: item.price, quantity: 1 });
    }
    setCart(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  const removeFromCart = (item) => {
    let newCart = [...cart];
    const foundIndex = newCart.findIndex(c => c.id === item._id);
    if (foundIndex !== -1) {
      if (newCart[foundIndex].quantity > 1) {
        newCart[foundIndex].quantity -= 1;
      } else {
        newCart.splice(foundIndex, 1);
      }
      setCart(newCart);
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    }
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }


  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = (await Fetch.get('/menu')).data;
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchAllProducts();
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    function handleEsc(event) {
      if (event.key === 'Escape') setShowSearch(false);
    }
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showSearch]);

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='navbar'>
      <Link to='/' className='navbar-brand'>HERBESTA</Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>mobile app</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" style={{cursor:'pointer'}} onClick={() => setShowSearch(v => !v)} />
         {showSearch && (
        <div className="navbar-search-bar" ref={searchRef}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <div>
              {filteredItems.map((item, index) => {
                const found = cart.find(c => c.id === item._id);
                const itemCount = found ? found.quantity : 0;

                return (
                  <div key={index} className="search-item">
                    <div className="search-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <p>{item.price}$</p>
                    </div>

                    {item.status === "active" ? (
                      itemCount === 0 ? (
                          <img
                          className='add'
                          onClick={() => addToCart(item)}
                          src={assets.add_icon_white}
                          alt=""
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor:"white", borderRadius:"50px", padding:"6px" }}>
                          <img 
                            src={assets.remove_icon_red} 
                            onClick={() => removeFromCart(item)} 
                            alt="" 
                          />
                          <p style={{ color: 'black' }}>{itemCount}</p>
                          <img 
                            src={assets.add_icon_green} 
                            onClick={() => addToCart(item)} 
                            alt="" 
                          />
                        </div>
                      )
                    ) : (
                    <div className="navbar-item-status">
                      <p style={{ color: item.status === 'sold out' ? 'white' : 'black', backgroundColor: item.status === 'sold out' ? '#FF4C24' : 'yellow' }}>{item.status}</p>
                    </div>
                  )}
                  </div>
                );
              })}
              {
                filteredItems.length === 0 && <p style={{ padding: '10px', color: 'gray' }}>No items found</p>
              }
            </div>
          )}
        </div>
      )}
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
       
        </Link>
        {!isAuth ? <button disabled={isPending}  onClick={() => setShowLogin(true)}>{isPending ? "Loading..." : "Sign in"}</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
