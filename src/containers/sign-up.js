//@ts-check
import React, { useEffect, Component, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import validator from "validator";
import SocialButtons from "../components/Social-buttons";
import Dividor from "../components/Dividor";
import Button from "../components/Button";
import SelectBox from "../components/SelectBox";
import * as actions from "../actions/types";
import Input from "../components/Input";

const SignupUser = props => {
  const [city, setCity] = useState({ city_id: null, city: "" });
  const [cityBoxOpened, setCityBoxOpened] = useState(false);
  let { register, handleSubmit, errors, watch } = useForm();
  let citiesContainerRef = React.createRef();

  const onSubmitHandler = data => {
    props.postSignup({
      role_id: props.role_id,
      full_name: data.full_name,
      email: data.email.toLocaleLowerCase(),
      password: data.password,
      city_id: +city.city_id || 1,
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
      ).filter(input => input.checked)[0];
      city = inputChecked ? inputChecked.value : "";
      city_id = inputChecked ? inputChecked.id.split("_")[0] : "";
    }
    errors.city_id = undefined;
    setCityBoxOpened(!prev);
    setCity({
      city_id,
      city
    });
  };

  return (
    <section className="signup__container__forms__user">
      <form
        noValidate
        onSubmit={handleSubmit(data => {
          onSubmitHandler(data);
        })}
      >
        <Input
          type="text"
          name="full_name"
          value={watch("full_name")}
          id="full_name"
          placeholder={props.role_id === 2 ? "Pharmacy name" : "Full name"}
          isError={errors.full_name || props.errors.full_name}
          error={
            errors.full_name
              ? "Your name must be between 6 and 50 characters"
              : props.errors.full_name
          }
          refe={register({
            required: true,
            minLength: 6,
            maxLength: 50
          })}
        />
        <Input
          type="email"
          name="email"
          value={watch("email")}
          id="email"
          placeholder="Email address"
          isError={errors.email || props.errors.email}
          error={
            errors.email
              ? "Your email must be a valid email"
              : props.errors.email
          }
          refe={register({
            required: true,
            maxLength: 50,
            validate: value => validator.isEmail(value)
          })}
        />
        {props.role_id === 1 ? (
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
                errors.City
                  ? "You must choose your city"
                  : props.errors.city_id
              }
              refe={register({
                validate: () => city.city_id !== null
              })}
            />
          </div>
        ) : null}
        <Input
          type="password"
          name="password"
          value={watch("password")}
          id="password"
          placeholder="Password"
          isError={errors.password || props.errors.password}
          error={
            errors.password
              ? "Your password must be between 8 and 50 characters"
              : props.errors.password
          }
          refe={register({
            required: true,
            minLength: 8,
            maxLength: 50
          })}
        />
        <Input
          type="password"
          name="confirm_password"
          value={watch("confirm_password")}
          id="confirm_password"
          placeholder="Repeat password"
          isError={errors.confirm_password || props.errors.confirm_password}
          error={
            errors.confirm_password
              ? "Passwords must be identical"
              : props.errors.confirm_password
          }
          refe={register({
            required: true,
            validate: value => value === watch("password")
          })}
        />
        <button className="btn btn-md btn-green" type="submit">
          Signup
        </button>
      </form>
    </section>
  );
};

class Signup extends Component {
  state = {
    role_id: 1
  };

  componentDidMount() {
    this.props.getCities();
  }

  toggleUserForm = role_id => {
    if (this.state.role_id !== role_id) {
      this.setState({
        role_id
      });
    }
  };

  render() {
    const user_types = ["I'm a doctor", "I'm a customer", "I'm a Pharmacy"];

    return (
      <section className="signup">
        <section className="signup__container">
          <header className="signup__container__header">
            <p>Don't have an account?</p>
            <Link to="/login">
              <button>login</button>
            </Link>
          </header>
          <section className="signup__container__forms">
            <h1>
              Hi,
              <span>Join our community</span>
            </h1>
            <div
              className={
                "signup__container__forms__toggler toggler active-" +
                this.state.role_id
              }
            >
              {user_types.map((type, i) => (
                <Button
                  className="btn"
                  key={i}
                  onClick={() => {
                    this.toggleUserForm(i || 3);
                  }}
                >
                  {type}
                </Button>
              ))}
              <span className="signup__container__forms__toggler__pointer"></span>
            </div>
            <SocialButtons />
            <Dividor />
            <div className={"signup__container__forms__slider"}>
              <SignupUser
                role_id={this.state.role_id}
                cities={this.props.user.cities}
                postSignup={this.props.postSignup}
                success={this.props.user.success}
                errors={this.props.user.errors}
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

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  postSignup: data => dispatch({ type: actions.SAGA_SIGNUP_USER, data }),
  getCities: () => dispatch({ type: actions.SAGA_GET_CITIES })
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
