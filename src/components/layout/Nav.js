import React from "react";
import { NavLink } from "react-router-dom";
import Heart from "../../assets/svg/heart.svg";

const Navbar = () => (
  <nav className="sNav">
    <NavLink to="/doctors" className="sNav__link">
      <img src={Heart} alt="doctors icon" />
      <span className="sNav__text">Doctors</span>
    </NavLink>
    <NavLink to="/medications" className="sNav__link">
      <img src={Heart} alt="medication icon" />
      <span className="sNav__text">medication</span>
    </NavLink>
  </nav>
);

export default Navbar;
