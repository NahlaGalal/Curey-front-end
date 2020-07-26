import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Rate } from "../../util/rate";
import PharmacyThumbnail from "../Pop-ups/PharmacyThumbnail";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import { withRouter } from "react-router-dom";
import Button from "../Button";

const PharmacyNavbar = (props) => {
  useEffect(() => {
    if (props.api_token === "") props.history.push("/login");
  });

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

        <div
          className="NavigationBar__icons NavigationBar__icons__notifications NavigationBar__icons--pharmacy"
          style={{ marginBottom: 0 }}
        ></div>

        <Button
          className="NavigationBar__phrmacyData btn"
          onClick={props.togglePharmacyThumbnailList}
        >
          <div>
            <Rate rate={props.rating} />
            <span>{props.no_reviews} reviews</span>
          </div>
          <div className="NavigationBar__phrmacyData--logo">
            <img src={props.image} alt="doctor logo" />
          </div>
        </Button>
      </nav>
      {props.pharmacyThumbnailList && (
        <PharmacyThumbnail
          hideLists={props.hideLists}
          getUserData={() =>
            props.getUserData(props.api_token, props.history)
          }
          image={props.image}
          name={props.name}
          changeName={(data) =>
            props.postChangeName(
              {
                ...data,
                api_token: props.api_token,
              },
              this.props.history
            )
          }
          email={props.email}
          changeEmail={(data) =>
            props.postChangeEmail(
              {
                ...data,
                api_token: props.api_token,
              },
              this.props.history
            )
          }
          phone={props.phone}
          changePhone={(data) =>
            props.postChangePhone(
              {
                ...data,
                api_token: props.api_token,
              },
              this.props.history
            )
          }
          changePassword={(data) =>
            props.postChangePassword(
              {
                ...data,
                api_token: props.api_token,
              },
              this.props.history
            )
          }
          cities={props.cities}
          city_id={props.city_id}
          address={props.address}
          work_address={props.work_address}
          changeAddress={(data) =>
            props.postChangeAddress(
              {
                ...data,
                api_token: props.api_token,
              },
              props.history
            )
          }
          role={props.role || 1}
          logout={() => props.postLogout(props.api_token, props.history)}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  name: state.user.full_name,
  image: state.user.image,
  address: state.user.address,
  work_address: state.user.work_address,
  email: state.user.email,
  role: state.user.role,
  phone: state.user.phone,
  city_id: state.user.city_id,
  cities: state.user.cities,
  rating: state.doctorData.reviews.total,
  no_reviews: state.doctorData.reviews.number,
});

const mapDispatchToProps = (dispatch) => ({
  postLogout: (api_token, history) =>
    dispatch({ type: actions.SAGA_LOGOUT_USER, api_token, history }),
  getUserData: (api_token, history) =>
    dispatch({ type: actions.SAGA_GET_PROFILE, api_token, history }),
  postChangeName: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_NAME, data, history }),
  postChangeEmail: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_EMAIL, data, history }),
  postChangePhone: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_PHONE, data, history }),
  postChangePassword: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_PASSWORD, data, history }),
  postChangeAddress: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_ADDRESS, data, history }),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PharmacyNavbar)
);
