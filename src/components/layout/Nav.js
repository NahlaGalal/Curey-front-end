import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => (
  <nav className="sNav">
    <NavLink to="/doctors" className="sNav__link doctors">
      <span className="sNav__text">Doctors</span>
    </NavLink>
    <NavLink to="/medications" className="sNav__link medications">
      <span className="sNav__text">Medications</span>
    </NavLink>
  </nav>
);

export default Navbar;
