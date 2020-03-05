import React from "react";
import { NavLink } from "react-router-dom";
import doctors_icon from "../../assets/svg/heartbeat.svg";
import medications_icon from "../../assets/svg/pill.svg";


const Navbar = () => (
  <nav className="sNav">
    <NavLink to="/doctors" className="sNav__link">
      <img src={doctors_icon} alt="doctors icon" />
      <span className="sNav__text">Doctors</span>
    </NavLink>
    <NavLink to="/medications" className="sNav__link">
      <img src={medications_icon} alt="medications icon" />
      <span className="sNav__text">Medications</span>
    </NavLink>
  </nav>
);

export default Navbar;
