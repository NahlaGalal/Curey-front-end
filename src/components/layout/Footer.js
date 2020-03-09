import React from "react";
import { NavLink } from "react-router-dom";
import CureyLogo from "../../assets/svg/Logo-SVG.svg";
import FacebookLogo from "../../assets/svg/facebook-logo.svg";
import TwitterLogo from "../../assets/svg/twitter.svg";
import InstagramLogo from "../../assets/svg/instagram.svg";

const Footer = (props) => (
  <footer className="footer" onClick={props.onClick}>
    <div className="footer__container">
      <img src={CureyLogo} alt="Curey logo" className="footer__logo" />
      <p className="footer__copyright">All rights reserved © Curey</p>
      <ul className="footer__links">
        <li>
          <NavLink to="/" className="footer__link">
          Consult a doctor
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="footer__link">
            Support
          </NavLink>
        </li>
      </ul>
    </div>
    <div className="footer__line"></div>
    <div className="footer__socials">
      <span>
        <img src={FacebookLogo} alt="facebook logo" />
      </span>
      <span>
        <img src={TwitterLogo} alt="facebook logo" />
      </span>
      <span>
        <img src={InstagramLogo} alt="facebook logo" />
      </span>
    </div>
  </footer>
);
export default Footer;
