//@ts-check
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SocialButtons from "../components/Social-buttons";
import Dividor from "../components/Dividor";
import FieldInput from "../components/FieldInput";
import Button from "../components/Button";
import SelectBox from "../components/SelectBox";
import { connect } from "react-redux";
import { getCities, postSignup } from "../actions/userRegisterAction";
import validator from "validator";

class SignupUser extends Component {
  state = {
    cityBoxOpened: false,
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    city: "",
    city_id: 0,
    cityList: [],
    errors: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      city: ""
    }
  };

  citiesContainerRef = React.createRef();

  componentDidMount() {
    this.props.getCities();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cities.length !== this.props.cities.length) {
      this.setState({ cityList: this.props.cities });
    }
    if (prevProps.signupSuccess !== this.props.signupSuccess && this.props.signupSuccess) {
      this.props.redirectToLogin();
    }
    if (prevProps.signupErrors !== this.props.signupErrors) {
      console.log(this.props.signupErrors);
      // TODO: errors object or array ??
    }
  }

  onChangeHandler = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  toggleCitySelectBox = () => {
    const prev = this.state.cityBoxOpened;
    let city = "",
      city_id = "";
    if (prev) {
      const inputChecked = Array.from(
        this.citiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter(input => input.checked)[0];
      city = inputChecked ? inputChecked.value : "";
      city_id = inputChecked ? inputChecked.id : "";
    }
    this.setState({
      cityBoxOpened: !prev,
      city,
      city_id
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const errors = {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      city: ""
    };
    if (
      !validator.isEmail(this.state.email) ||
      !validator.isLength(this.state.email, {
        max: 50
      })
    )
      errors.email = "Your email must be a valid email";
    if (
      !validator.isLength(this.state.full_name, {
        max: 50,
        min: 6
      })
    )
      errors.full_name = "Your name must be between 6 and 50 characters";
    if (
      !validator.isLength(this.state.password, {
        max: 50,
        min: 8
      })
    )
      errors.password = "Your password must be between 8 and 50 characters";
    if (this.state.password !== this.state.confirm_password)
      errors.confirm_password = "Passwords must be identical";
    if (!this.state.city) errors.city = "You must choose your city";
    this.setState({ errors });
    if (!Object.values(errors).filter(value => value !== "").length) {
      this.props.postSignup({
        role_id: this.props.role_id,
        full_name: this.state.full_name,
        email: this.state.email,
        password: this.state.password,
        city_id: +this.state.city
      });
    }
    e.target.disabled = true;
  };

  render() {
    return (
      <section className="signup__container__forms__user">
        <form noValidate>
          <FieldInput
            type="text"
            name="full_name"
            value={this.state.full_name}
            onChange={this.onChangeHandler}
            placeholder={
              this.props.role_id === 2 ? "Pharmacy name" : "Full name"
            }
            error={this.state.errors.full_name}
          />
          <FieldInput
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
            placeholder="Email address"
            error={this.state.errors.email}
          />
          {this.props.role_id === 1 ? (
            <div>
              <SelectBox
                name="city_id"
                onClick={this.toggleCitySelectBox}
                className={`${this.state.city ? "hasValue" : null}`}
                listChecked={this.state.city ? [this.state.city] : []}
                header="City"
                boxOpened={this.state.cityBoxOpened}
                list={this.state.cityList}
                optionsContainerRef={this.citiesContainerRef}
                multiSelect={false}
                error={this.state.errors.city}
              />
            </div>
          ) : null}
          <FieldInput
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            placeholder="Password"
            error={this.state.errors.password}
          />
          <FieldInput
            type="password"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChangeHandler}
            placeholder="Repeat password"
            error={this.state.errors.confirm_password}
          />
          <Button
            className="btn btn-md btn-green"
            onClick={this.onSubmitHandler}
          >
            Signup
          </Button>
        </form>
      </section>
    );
  }
}

class Signup extends Component {
  state = {
    role_id: 1
  };

  toggleUserForm = role_id => {
    if (this.state.role_id !== role_id) {
      this.setState({
        role_id
      });
    }
  };

  render() {
    const user_types = ["I'm a doctor", "I'm a user", "I'm a Pharmacy"];

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
                getCities={this.props.getCities}
                cities={this.props.user.cities}
                postSignup={this.props.postSignup}
                signupSuccess={this.props.user.success}
                signupErrors={this.props.user.errors}
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
  postSignup: data => dispatch(postSignup(data)),
  getCities: () => dispatch(getCities())
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
