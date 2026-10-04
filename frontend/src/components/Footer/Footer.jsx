import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Logo" />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sequi, quibusdam eos dolor omnis ad facilis laborum nisi molestiae
            veniam explicabo quae quas recusandae similique sint! Iste illum
            beatae vitae.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />

            <img src={assets.twitter_icon} alt="Twitter" />

            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>

          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>

            <ul>
              <li>+91 98765 43210</li>
              <li>contact@tomato.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyrigh2024 @Tomato</p>


      </div>

  );
};

export default Footer;
