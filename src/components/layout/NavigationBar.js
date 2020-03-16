import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import NotificationList from "../Pop-ups/NotificationList";
import UserThumbnail from "../Pop-ups/UserThumbnail";
import UserImg from "../../assets/svg/user.svg";
import { connect } from "react-redux";
import { postLogout } from "../../actions/userAction";

class NavigationBar extends Component {
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
                onClick={this.props.toggleNotifocationsList}
              >
                <img
                  className="NavigationBar__icon"
                  src={require("../../assets/svg/notifications-button.svg")}
                  alt="logo"
                />
              </Button>
              <Button
                className="btn NavigationBar__profile-btn"
                onClick={this.props.toggleUserThumbnailList}
              >
                <img
                  src={this.props.image || UserImg}
                  alt="profile"
                  className="NavigationBar__img"
                />
              </Button>
            </div>
          </ul>
        </nav>
        {this.props.notificationList && (
          <NotificationList hideLists={this.props.hideLists} />
        )}
        {this.props.userThumbnailList && (
          <UserThumbnail
            hideLists={this.props.hideLists}
            userImg={this.props.image || UserImg}
            userName={this.props.full_name}
            userEmail={this.props.email || ""}
            logout={() => this.props.postLogout(this.props.api_token)}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  api_token: state.user.api_token,
  full_name: state.user.full_name,
  image: state.user.image,
  email: state.user.email
});

const mapDispatchToProps = dispatch => ({
  postLogout: token => dispatch(postLogout(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
