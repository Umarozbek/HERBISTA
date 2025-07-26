import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <div className="footer-brand">HERBESTA</div>
            {/* <img src={assets.logo} alt="" /> */}
            <p>HERBESTA is dedicated to bringing you the freshest ingredients, delicious meals, and a memorable dining experience. We blend tradition and innovation to serve food that delights every palate. Thank you for making us part of your table!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+82-10-84-60-77-72</li>
                <li>umarozbe@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © HERBESTA - All Right Reserved.</p>
    </div>
  )
}

export default Footer
