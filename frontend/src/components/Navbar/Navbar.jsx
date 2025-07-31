import  { useEffect, useState, useRef } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Navbar = ({ setShowLogin }) => {
const {data,isPending, isAuth} = useSelector((state) => state.user);

  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();
  console.log(isAuth);
  console.log(data);
  
  const logout = () => {
    localStorage.removeItem("token");
    navigate('/')
  }

  useEffect(() => {
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
            <input type="text" placeholder="Search..." autoFocus />
          </div>
        )}
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          {/* <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div> */}
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
