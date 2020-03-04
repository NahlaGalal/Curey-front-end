//@ts-check
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SocialButtons from "../components/Social-buttons";
import Dividor from "../components/Dividor";
import FieldInput from "../components/FieldInput";
import Button from "../components/Button";
import SelectBox from "../components/SelectBox";

class SignupUser extends Component {
  state = {
    cityBoxOpened: false,
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    city: "",
    errors: {
      username: "",
      email: "",
      password: "",
      confirm_password: ""
    }
  };

  citiesContainerRef = React.createRef();

  onChangeHandler = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  toggleCitySelectBox = () => {
    const prev = this.state.cityBoxOpened;
    let city = "";
    if (prev) {
      const inputChecked = Array.from(
        this.citiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter(input => input.checked)[0];
      city = inputChecked ? inputChecked.value : "";
    }
    this.setState({
      cityBoxOpened: !prev,
      city
    });
  };

  render() {
    const cityList = ["Mansoura", "El-Mahalla", "Bilqas", "El-Manzalah"];

    return (
      <section className="signup__container__forms__user">
        <form noValidate>
          <FieldInput
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChangeHandler}
            placeholder={
              this.props.role_id === 2 ? "Pharmacy name" : "Full name"
            }
            error={this.state.errors.username}
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
                list={cityList}
                optionsContainerRef={this.citiesContainerRef}
                multiSelect={false}
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
          <Button className="btn btn-md btn-green">Signup</Button>
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
            <div
              className={
                "signup__container__forms__slider"
              }
            >
              <SignupUser role_id={this.state.role_id} />
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

export default Signup;
