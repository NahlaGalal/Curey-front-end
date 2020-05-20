import React, { Component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import { Link } from "react-router-dom";

import SelectBox from "../components/SelectBox";

const SignupUser = (props) => {
  const [city, setCity] = useState({ city_id: null, city: "" });
  const [cityBoxOpened, setCityBoxOpened] = useState(false);
  let { register, handleSubmit, errors, watch } = useForm();
  let citiesContainerRef = React.createRef();

  const onSubmitHandler = (data) => {
    props.postSignup({
      api_token: props.api_token,
      address: data.address,
      phone: data.phone,
      city_id: +city.city_id || 1,
      image: data.doctor_image,
      fees: data.fees,
      offers_callup: data.offers_callup,
      callup_fees: data.callup_fees || 0,
      duration: data.duration,
    });
  };

  useEffect(() => {
    if (props.success) props.redirectToLogin();
  });

  const toggleCitySelectBox = () => {
    const prev = cityBoxOpened;
    let city = "",
      city_id = "";
    if (prev) {
      const inputChecked = Array.from(
        citiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter((input) => input.checked)[0];
      city = inputChecked ? inputChecked.value : "";
      city_id = inputChecked ? inputChecked.id.split("_")[0] : "";
    }
    errors.city_id = undefined;
    setCityBoxOpened(!prev);
    setCity({
      city_id,
      city,
    });
  };

  return (
    <section className="signup__container__forms__user">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          onSubmitHandler(data);
        })}
      >
        <div>
          <SelectBox
            name="city_id"
            onClick={toggleCitySelectBox}
            className={`${city.city ? "hasValue" : null}`}
            listChecked={city.city_id ? [city.city] : []}
            header="City"
            boxOpened={cityBoxOpened}
            list={props.cities}
            optionsContainerRef={citiesContainerRef}
            multiSelect={false}
            isError={errors.City || props.errors.city_id}
            error={
              errors.City ? "You must choose your city" : props.errors.city_id
            }
            refe={register({
              validate: () => city.city_id !== null,
            })}
          />
        </div>

        <Input
          type="text"
          name="address"
          value={watch("address")}
          id="address"
          placeholder="address"
          isError={errors.address || props.errors.address}
          error={
            errors.address
              ? "Your address must be between 15 and 200 characters"
              : props.errors.address
          }
          refe={register({
            required: true,
            minLength: 15,
            maxLength: 200,
          })}
        />

        <Input
          type="text"
          name="phone"
          value={watch("phone")}
          id="phone"
          placeholder="Phone"
          isError={errors.phone || props.errors.phone}
          error={
            errors.phone
              ? "Your phone must be a valid phone number"
              : props.errors.email
          }
          refe={register({
            required: true,
            maxLength: 11,
          })}
        />
        <diV className="mb-20">
          <label htmlFor="doctor_image">
            <p className="heading-4 mb-20">Your image</p>
          </label>
          <input
            type="file"
            name="doctor_image"
            value={watch("doctor_image")}
            id="doctor_image"
            refe={register}
          />
        </diV>

        <Input
          type="number"
          name="fees"
          value={watch("fees")}
          id="fees"
          placeholder="your fees"
          isError={errors.fees || props.errors.fees}
          error={
            errors.address ? "please enter valid number " : props.errors.address
          }
          refe={register({
            required: true,
            minLength: 2,
            maxLength: 6,
          })}
        />

        <label htmlFor="offers_callup" className="heading-4 center mb-20">
          <Input
            type="checkbox"
            name="offers_callup"
            value={watch("offers_callup")}
            id="offers_callup"
            refe={register}
          />
          offers callup
        </label>

        <Input
          type="number"
          name="callup_fees"
          value={watch("callup_fees")}
          id="callup_fees"
          placeholder="your callup fees"
          isError={errors.callup_fees || props.errors.callup_fees}
          error={
            errors.address ? "please enter valid number " : props.errors.address
          }
          refe={register({
            required: false,
            minLength: 2,
            maxLength: 8,
          })}
        />

        <Input
          type="number"
          name="duration"
          value={watch("duration")}
          id="duration"
          placeholder="your duration"
          isError={errors.duration || props.errors.duration}
          error={
            errors.address ? "please enter valid number " : props.errors.address
          }
          refe={register({
            required: true,
            minLength: 1,
            maxLength: 4,
          })}
        />

        <button className="btn btn-md btn-green" type="submit">
          Signup
        </button>
      </form>
    </section>
  );
};

/*********************************** */

class DoctorCompSignup extends Component {
  componentDidMount() {
    this.props.getCities();
    this.props.getSpecialities();
  }

  render() {
    return (
      <section className="signup">
        <section className="signup__container">
          <header className="signup__container__header">
            {/* <p>Don't have an account?</p> */}
            <Link to="/login">
              <button>login</button>
            </Link>
          </header>
          <section className="signup__container__forms">
            <h1>
              Hi,
              <span>Join our community</span>
            </h1>
            <div className={"signup__container__forms__slider"}>
              <SignupUser
                cities={this.props.user.cities}
                postSignup={this.props.postSignup}
                success={this.props.user.success}
                errors={this.props.user.errors}
                api_token={this.props.api_token}
                redirectToLogin={() => this.props.history.push("/login")}
              />
            </div>
          </section>
          <footer className="signup__container__footer">
            <p>All Rights Reserved © Curey</p>
          </footer>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  api_token: state.user.api_token,
});

const mapDispatchToProps = (dispatch) => ({
  postSignup: (data) =>
    dispatch({ type: actions.SAGA_COMPLETE_DOCTOR_SIGNUP, data }),
  getCities: () => dispatch({ type: actions.SAGA_GET_CITIES }),
  getSpecialities: () => dispatch({ type: actions.SAGA_GET_SPECIALITY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCompSignup);
