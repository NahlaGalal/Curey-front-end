import React from "react";
import { NavLink } from "react-router-dom";
import { Rate } from "../../util/rate";
import pharmacyImg from "../../assets/images/pharmacy.png";

const PharmacyNavbar = () => (
  <nav className="NavigationBar">
    <div className="NavigationBar__logo">
      <img src={require("../../assets/svg/Logo-SVG.svg")} alt="logo" />
    </div>

    <ul className="NavigationBar__links">
      <li className="NavigationBar__item">
        <NavLink to="/Statement" className="NavigationBar__link">
          <img
            className="NavigationBar__icon"
            src={require("../../assets/svg/statement.svg")}
            alt="icon"
          />
          Statement
        </NavLink>
      </li>

      <li className="NavigationBar__item">
        <NavLink to="/Medications list" className="NavigationBar__link">
          <img
            className="NavigationBar__icon"
            src={require("../../assets/svg/dots.svg")}
            alt="icon"
          />
          Medications list
        </NavLink>
      </li>

      <li className="NavigationBar__item">
        <NavLink to="/Requests" className="NavigationBar__link">
          <img
            className="NavigationBar__icon"
            src={require("../../assets/svg/profit.svg")}
            alt="icon"
          />
          Requests
        </NavLink>
      </li>

      <li className="NavigationBar__item NavigationBar__item--last">
        <NavLink to="/Packing list" className="NavigationBar__link">
          <img
            className="NavigationBar__icon "
            src={require("../../assets/svg/gbag.svg")}
            alt="icon"
          />
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
