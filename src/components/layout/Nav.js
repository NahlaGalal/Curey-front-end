import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = (props) => (
  <nav className="sNav" onClick={props.onClick}>
    <NavLink to="/doctors" className="sNav__link doctors">
      <span className="sNav__text">Doctors</span>
    </NavLink>
    <NavLink to="/medications" className="sNav__link medications">
      <span className="sNav__text">Medications</span>
    </NavLink>
  </nav>
);

export default Navbar;
