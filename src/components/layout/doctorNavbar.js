import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Rate } from "../../util/rate";
import DoctorThumbnail from "../Pop-ups/DoctorThumbnail";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import { withRouter } from "react-router-dom";
import Button from "../Button";

const DoctorNavbar = props => {
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
              to="/doctor/Statement"
              className="NavigationBar__link NavigationBar__link--statement"
            >
              Statement
            </NavLink>
          </li>

          <li className="NavigationBar__item">
            <NavLink
              to="/doctor/schedule"
              className="NavigationBar__link NavigationBar__link--schedule"
            >
              Working schedule
            </NavLink>
          </li>

          <li className="NavigationBar__item">
            <NavLink
              to="/doctor/Requests"
              className="NavigationBar__link NavigationBar__link--profit"
            >
              Requests
            </NavLink>
          </li>

          <li className="NavigationBar__item NavigationBar__item">
            <NavLink
              to="/doctor/re-examination"
              className="NavigationBar__link NavigationBar__link--re-examination"
            >
              Re-examinations list
            </NavLink>
          </li>

          <li className="NavigationBar__item NavigationBar__item--last">
            <NavLink
              to="/doctor/prescriptions"
              className="NavigationBar__link NavigationBar__link--prescription"
            >
              Prescription list
            </NavLink>
          </li>
        </ul>

        <div className="NavigationBar__icons NavigationBar__icons__notifications NavigationBar__icons--pharmacy "></div>

        <Button
          className="NavigationBar__phrmacyData btn"
          onClick={props.toggleDoctorThumbnailList}
        >
          <div>
            <Rate rate={2.23} />
            <span>1220 reviews</span>
          </div>
          <div className="NavigationBar__phrmacyData--logo">
            <img src={props.image} alt="doctor logo" />
          </div>
        </Button>
      </nav>
      {props.doctorThumbnailList && (
        <DoctorThumbnail
          hideLists={props.hideLists}
          doctorImage={props.image}
          doctorName={props.doctor_name}
          doctorSpeciality={props.doctor_speciality}
          doctorAddress={props.address || ""}
          logout={() => props.postLogout(props.api_token)}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  api_token: state.user.api_token,
  doctor_name: state.user.full_name,
  image: state.user.image,
  address: state.user.address || "Mansoura",
  doctor_speciality: state.user.speciality || "Surgery"
});

const mapDispatchToProps = dispatch => ({
  postLogout: api_token =>
    dispatch({ type: actions.SAGA_LOGOUT_USER, api_token })
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorNavbar)
);
