import React from 'react'
import './Header.css'

const Header = () => {
    const handleBookTable = () => {
        const section = document.getElementById('reservation');
        if(section) section.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Fresh Flavors, Memorable Moments.</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button onClick={handleBookTable}>Book a Table</button>
            </div>
        </div>
    )
}

export default Header
