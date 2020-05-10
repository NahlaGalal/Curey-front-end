import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import NotificationList from "../Pop-ups/NotificationList";
import UserThumbnail from "../Pop-ups/UserThumbnail";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import { withRouter } from "react-router-dom";

class NavigationBar extends Component {
  componentDidUpdate() {
    if (this.props.api_token === "") this.props.history.push("/login");
  }

  openNorifications = (e) => {
    this.props.readNotification(
      this.props.notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
    this.props.toggleNotifocationsList(e);
  };

  render() {
    const readNotifications = this.props.notifications.filter(
      (notification) => !notification.read
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
                onClick={(e) => this.props.toggleUserThumbnailList(e)}
              >
                <img
                  src={this.props.image}
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
            getUserData={() => this.props.getUserData(this.props.api_token)}
            image={this.props.image}
            name={this.props.full_name}
            changeName={(data) =>
              this.props.postChangeName({
                ...data,
                api_token: this.props.api_token,
              })
            }
            email={this.props.email}
            changeEmail={(data) =>
              this.props.postChangeEmail({
                ...data,
                api_token: this.props.api_token,
              })
            }
            phone={this.props.phone}
            changePhone={(data) =>
              this.props.postChangePhone({
                ...data,
                api_token: this.props.api_token,
              })
            }
            changePassword={(data) =>
              this.props.postChangePassword({
                ...data,
                api_token: this.props.api_token,
              })
            }
            cities={this.props.cities}
            city_id={this.props.city_id}
            address={this.props.address}
            changeAddress={(data) =>
              this.props.postChangeAddress({
                ...data,
                api_token: this.props.api_token,
              })
            }
            role={this.props.role || 1}
            logout={() => this.props.postLogout(this.props.api_token)}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  full_name: state.user.full_name,
  image: state.user.image,
  email: state.user.email,
  notifications: state.user.notifications,
  role: state.user.role,
  phone: state.user.phone,
  address: state.user.address,
  city_id: state.user.city_id,
  cities: state.user.cities,
});

const mapDispatchToProps = (dispatch) => ({
  postLogout: (api_token) =>
    dispatch({ type: actions.SAGA_LOGOUT_USER, api_token }),
  readNotification: (notifications) =>
    dispatch({ type: actions.READ_NOTIFICATION, notifications }),
  getUserData: (api_token) =>
    dispatch({ type: actions.SAGA_GET_PROFILE, api_token }),
  postChangeName: (data) => dispatch({ type: actions.SAGA_CHANGE_NAME, data }),
  postChangeEmail: (data) =>
    dispatch({ type: actions.SAGA_CHANGE_EMAIL, data }),
  postChangePhone: (data) =>
    dispatch({ type: actions.SAGA_CHANGE_PHONE, data }),
  postChangePassword: (data) =>
    dispatch({ type: actions.SAGA_CHANGE_PASSWORD, data }),
  postChangeAddress: (data) =>
    dispatch({ type: actions.SAGA_CHANGE_ADDRESS, data }),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
);
