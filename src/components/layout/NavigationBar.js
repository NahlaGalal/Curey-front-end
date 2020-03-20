import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import NotificationList from "../Pop-ups/NotificationList";
import UserThumbnail from "../Pop-ups/UserThumbnail";
import UserImg from "../../assets/svg/user.svg";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import { withRouter } from "react-router-dom";

class NavigationBar extends Component {
  componentDidUpdate() {
    if (this.props.api_token === "") this.props.history.push("/login");
  }

  openNorifications = (e) => {
    this.props.readNotification(
      this.props.notifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
    this.props.toggleNotifocationsList(e);
  };

  render() {
    const readNotifications = this.props.notifications.filter(
      notification => !notification.read
    );

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
              <NavLink
                to="/savepage"
                className="NavigationBar__icons__save"
              ></NavLink>
              <NavLink
                to="/shoppingcart"
                className="NavigationBar__icons__cart"
              ></NavLink>
              <Button
                className={`btn NavigationBar__icons__notifications${
                  this.props.notificationList ? " active" : ""
                }`}
                onClick={this.openNorifications}
              >
                {readNotifications.length ? (
                  <span>{readNotifications.length}</span>
                ) : null}
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
          <NotificationList
            hideLists={this.props.hideLists}
            notifications={this.props.notifications}
          />
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
  email: state.user.email,
  notifications: state.user.notifications
});

const mapDispatchToProps = dispatch => ({
  postLogout: api_token =>
    dispatch({ type: actions.SAGA_LOGOUT_USER, api_token }),
  readNotification: notifications =>
    dispatch({ type: actions.READ_NOTIFICATION, notifications })
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
);
