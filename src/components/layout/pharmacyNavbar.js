import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Rate } from "../../util/rate";
import PharmacyThumbnail from "../Pop-ups/PharmacyThumbnail";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import { withRouter } from "react-router-dom";
import Button from "../Button";

const PharmacyNavbar = props => {
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

        <div className="NavigationBar__icons NavigationBar__icons__notifications NavigationBar__icons--pharmacy "></div>

        <Button
          className="NavigationBar__phrmacyData btn"
          onClick={props.togglePharmacyThumbnailList}
        >
          <div>
            <Rate rate={1} />
            <span>1220 reviews</span>
          </div>
          <div className="NavigationBar__phrmacyData--logo">
            <img src={props.image} alt="doctor logo" />
          </div>
        </Button>
      </nav>
      {props.pharmacyThumbnailList && (
        <PharmacyThumbnail
          hideLists={props.hideLists}
          pharmacyLogo={props.image}
          pharmacyName={props.pharmacy_name}
          pharmacyAddress={props.address || ""}
          logout={() => props.postLogout(props.api_token)}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  api_token: state.user.api_token,
  pharmacy_name: state.user.full_name,
  image: state.user.image,
  address: state.user.address
});

const mapDispatchToProps = dispatch => ({
  postLogout: api_token =>
    dispatch({ type: actions.SAGA_LOGOUT_USER, api_token })
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PharmacyNavbar)
);
