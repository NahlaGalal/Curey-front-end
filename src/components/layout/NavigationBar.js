import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import NotificationList from "../Pop-ups/NotificationList";
import UserThumbnail from "../Pop-ups/UserThumbnail";
import UserImg from "../../assets/images/Hassan.png";

export default class NavigationBar extends Component {
  state = {
    notificationList: false,
    userThumbnailList: false
  };

  render() {
    return (
      <React.Fragment>
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
            <NavLink to="/home">
              <img src={require("../../assets/svg/Logo-SVG.svg")} alt="logo" />
            </NavLink>
          </div>

          <div className="NavigationBar__search">
            <input
              type="text"
              className="NavigationBar__search--input"
              placeholder="Search Doctors, Medications, Specialty....etc"
            />
            <img
              className="NavigationBar__search--icon"
              src={require("../../assets/svg/search.svg")}
              alt="logo"
            />
          </div>

          <ul className="NavigationBar__links">
            <li className="NavigationBar__item">
              <NavLink to="/appointments" className="NavigationBar__link">
                Appointments
              </NavLink>
            </li>
            <li className="NavigationBar__item">
              <NavLink to="/prescriptions" className="NavigationBar__link">
                Prescriptions
              </NavLink>
            </li>
            <li className="NavigationBar__item">
              <NavLink to="/orders" className="NavigationBar__link">
                Orders
              </NavLink>
            </li>
            <li className="NavigationBar__item NavigationBar__item--unique ">
              <NavLink to="/medicalwallet" className="NavigationBar__link ">
                Medical wallet
              </NavLink>
            </li>

            <div className="NavigationBar__icons">
              <NavLink to="/savepage">
                <img
                  className="NavigationBar__icon"
                  src={require("../../assets/svg/heart.svg")}
                  alt="logo"
                />
              </NavLink>
              <NavLink to="/shoppingcart">
                <img
                  className="NavigationBar__icon"
                  src={require("../../assets/svg/shopping-cart.svg")}
                  alt="logo"
                />
              </NavLink>
              <Button
                className="btn"
                onClick={() =>
                  this.setState({
                    notificationList: !this.state.notificationList
                  })
                }
              >
                <img
                  className="NavigationBar__icon"
                  src={require("../../assets/svg/notifications-button.svg")}
                  alt="logo"
                />
              </Button>
              <Button
                className="btn"
                onClick={() =>
                  this.setState({
                    userThumbnailList: !this.state.userThumbnailList
                  })
                }
              >
                <img
                  src={UserImg}
                  alt="profile"
                  className="NavigationBar__img"
                />
              </Button>
            </div>
          </ul>
        </nav>
        {this.state.notificationList && <NotificationList />}
        {this.state.userThumbnailList && (
          <UserThumbnail
            userImg={UserImg}
            userName="Hassan Ali"
            userEmail="hassanqasem000@gmail.com"
          />
        )}
      </React.Fragment>
    );
  }
}
