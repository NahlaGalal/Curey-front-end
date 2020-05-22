import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Rate } from "../../util/rate";
import DoctorThumbnail from "../Pop-ups/DoctorThumbnail";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import { withRouter } from "react-router-dom";
import Button from "../Button";

const DoctorNavbar = (props) => {
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
          <NavLink to="/doctor">
            <img src={require("../../assets/svg/Logo-SVG.svg")} alt="logo" />
          </NavLink>
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

        <div
          className="NavigationBar__icons NavigationBar__icons__notifications NavigationBar__icons--pharmacy"
          style={{ marginBottom: 0 }}
        ></div>

        <Button
          className="NavigationBar__phrmacyData btn"
          onClick={props.toggleDoctorThumbnailList}
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
      {props.doctorThumbnailList && (
        <DoctorThumbnail
          hideLists={props.hideLists}
          api_token={props.api_token}
          logout={() => props.postLogout(props.api_token, props.history)}
          getProfileData={(api_token) => props.getProfileData(api_token, props.history)}
          image={props.image}
          changeImage={(data) => {
            props.postChangeImage({ ...data }, props.history);
          }}
          name={props.doctor_name}
          changeName={(data) => {
            props.postChangeName({ ...data, api_token: props.api_token }, props.history);
            props.toggleDoctorThumbnailList();
          }}
          changeFees={(data) => {
            props.postChangeFees({ ...data, api_token: props.api_token }, props.history);
            props.toggleDoctorThumbnailList();
          }}
          fees={props.fees}
          changeDuration={(data) => {
            props.postChangeDuration({ ...data, api_token: props.api_token }, props.history);
            props.toggleDoctorThumbnailList();
          }}
          duration={props.duration}
          changeHomeVisit={(data) => {
            props.postChangeHomeVisit({ ...data, api_token: props.api_token }, props.history);
            props.toggleDoctorThumbnailList();
          }}
          callup={props.callup}
          callup_fees={props.callup_fees}
          cities={props.cities}
          city_id={props.city_id}
          address={props.address}
          work_address={props.work_address}
          changeAddress={(data) => {
            props.postChangeAddress({ ...data, api_token: props.api_token }, props.history);
            props.toggleDoctorThumbnailList();
          }}
          specialities={props.specialities}
          speciality={props.speciality}
          changeSpeciality={(data) => {
            props.postChangeSpeciality({ ...data, api_token: props.api_token }, props.history);
            props.toggleDoctorThumbnailList();
          }}
          phone={props.phone}
          changePhone={(data) => {
            props.postChangePhone({ ...data, api_token: props.api_token }, props.history);
            props.toggleDoctorThumbnailList();
          }}
          changePassword={(data) => {
            props.postChangePassword({ ...data, api_token: props.api_token }, props.history);
            props.toggleDoctorThumbnailList();
          }}
          email={props.email}
          changeEmail={(data) => {
            props.postChangeEmail({ ...data, api_token: props.api_token }, props.history);
            props.toggleDoctorThumbnailList();
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  doctor_name: state.user.full_name,
  image: state.user.image,
  address: state.user.address,
  work_address: state.user.work_address,
  rating: state.doctorData.reviews.total,
  no_reviews: state.doctorData.reviews.number,
  fees: state.user.fees,
  duration: state.user.duration,
  callup: state.user.callup,
  callup_fees: state.user.callup_fees,
  city_id: state.user.city_id,
  cities: state.user.cities,
  specialities: state.user.specialities,
  speciality: state.user.speciality,
  phone: state.user.phone,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  postLogout: (api_token, history) =>
    dispatch({ type: actions.SAGA_LOGOUT_USER, api_token, history }),
  getProfileData: (api_token, history) =>
    dispatch({ type: actions.SAGA_GET_PROFILE, api_token, history }),
  postChangeName: (data, history) => dispatch({ type: actions.SAGA_CHANGE_NAME, data, history }),
  postChangeFees: (data, history) => dispatch({ type: actions.SAGA_CHANGE_FEES, data, history }),
  postChangeDuration: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_DURATION, data, history }),
  postChangeHomeVisit: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_HOME_VISIT_FEES, data, history }),
  postChangeAddress: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_ADDRESS, data, history }),
  postChangeSpeciality: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_SPECIALITY, data, history }),
  postChangePhone: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_PHONE, data, history }),
  postChangePassword: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_PASSWORD, data, history }),
  postChangeEmail: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_EMAIL, data, history }),
  postChangeImage: (data, history) =>
    dispatch({ type: actions.SAGA_CHANGE_IMAGE, data, history }),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorNavbar)
);

//TODO: image, success
