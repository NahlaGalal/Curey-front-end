import React from "react";

const NavigationBar = () => (
  <nav className="NavigationBar">
    <img
      className="NavigationBar__logo"
      src={require("../assets/svg/Logo-SVG.svg")}
      alt="logo"
    />
    <div className="NavigationBar__search">
      <input
        type="text"
        className="NavigationBar__search--input"
        placeholder="Search Doctors, Medications, Specialty....etc"
      />
      <img
        className="NavigationBar__search--icon"
        src={require("../assets/svg/search.svg")}
        alt="logo"
      />
    </div>

    <ul className="NavigationBar__links">
      <li className="NavigationBar__item">
        <a href="/" className="NavigationBar__link">
          Appointments
        </a>
      </li>
      <li className="NavigationBar__item">
        <a href="/" className="NavigationBar__link">
          Prescriptions
        </a>
      </li>
      <li className="NavigationBar__item">
        <a href="/" className="NavigationBar__link">
          Orders
        </a>
      </li>
      <li className="NavigationBar__item NavigationBar__item--unique ">
        <a href="/" className="NavigationBar__link ">
          Medical wallet
        </a>
      </li>
    </ul>

    <div className="NavigationBar__icons">
      <img
        className="NavigationBar__icon"
        src={require("../assets/svg/heart.svg")}
        alt="logo"
      />
      <img
        className="NavigationBar__icon"
        src={require("../assets/svg/shopping-cart.svg")}
        alt="logo"
      />
      <img
        className="NavigationBar__icon"
        src={require("../assets/svg/notifications-button.svg")}
        alt="logo"
      />
      <img
        src={require("../assets/images/Hassan.png")}
        alt="profile"
        className="NavigationBar__img"
      />
    </div>
  </nav>
);

export default NavigationBar;
