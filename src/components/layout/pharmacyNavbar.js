import React from "react";
import { NavLink } from "react-router-dom";
import { Rate } from "../../util/rate";
import pharmacyImg from "../../assets/images/pharmacy.png";

const PharmacyNavbar = () => (
  <nav className="NavigationBar">
    <input
      type="checkbox"
      className="NavigationBar__checkbox"
      id="nav-toggle"
    />
    <label htmlFor="nav-toggle" className="NavigationBar__button">
      <span className="NavigationBar__hamburger"> </span>
    </label>

    <div className="NavigationBar__logo">
      <img src={require("../../assets/svg/Logo-SVG.svg")} alt="logo" />
    </div>

    <ul className="NavigationBar__links">
      <li className="NavigationBar__item">
        <NavLink
          to="/pharmacy/Statement"
          className="NavigationBar__link NavigationBar__link--statement"
        >
          Statement
        </NavLink>
      </li>

      <li className="NavigationBar__item">
        <NavLink
          to="/pharmacy/Medications-list"
          className="NavigationBar__link NavigationBar__link--list"
        >
          Medications list
        </NavLink>
      </li>

      <li className="NavigationBar__item">
        <NavLink
          to="/pharmacy/Requests"
          className="NavigationBar__link NavigationBar__link--profit"
        >
          Requests
        </NavLink>
      </li>

      <li className="NavigationBar__item NavigationBar__item--last">
        <NavLink
          to="/pharmacy/Packing-list"
          className="NavigationBar__link NavigationBar__link--packing"
        >
          Packing list
        </NavLink>
      </li>
    </ul>

    <div className="NavigationBar__icons NavigationBar__icons__notifications NavigationBar__icons--pharmacy "></div>

    <div className="NavigationBar__phrmacyData">
      <div>
        <Rate rate={1} />
        <span>1220 reviews</span>
      </div>
      <img
        src={pharmacyImg}
        alt="pharmacy logo"
        className="NavigationBar__phrmacyData--logo"
      />
    </div>
  </nav>
);

export default PharmacyNavbar;
