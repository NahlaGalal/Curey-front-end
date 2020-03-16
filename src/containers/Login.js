// @ts-check
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SocialButtons from "../components/Social-buttons";
import Dividor from "../components/Dividor";
import FieldInput from "../components/FieldInput";
import Button from "../components/Button";
import { connect } from "react-redux";
import validator from "validator";
import { postLogin } from "../actions/userAction";

class Login extends Component {
  state = {
    user: "",
    password: "",
    errors: {
      user: "",
      password: ""
    }
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.user.errors) !==
      JSON.stringify(this.props.user.errors)
    ) {
      const errors = {user: "", password: ""};
      this.props.user.errors.user
        ? (errors.user = this.props.user.errors.user)
        : this.props.user.errors.password
        ? (errors.password = this.props.user.errors.password)
        : errors.password = "";
      this.setState({errors})
    }
    if (
      prevProps.user.api_token !== this.props.user.api_token &&
      this.props.user.api_token
    )
      this.props.history.push("/home");
  }

  onChangeHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const errors = {
      user: "",
      password: ""
    };
    if (
      !validator.isEmail(this.state.user) &&
      !validator.isMobilePhone(this.state.user)
    )
      errors.user = "You must type your email or your phone correctly";
    if (
      !validator.isLength(this.state.password, {
        max: 50,
        min: 8
      })
    )
      errors.password = "Your password must be between 8 and 50 characters";
    this.setState({ errors });
    if (!Object.values(errors).filter(value => value !== "").length) {
      this.props.postLogin({
        user: this.state.user,
        password: this.state.password
      });
    }
  };

  render() {
    return (
      <section className="login">
        <section className="login__container">
          <header className="login__container__header">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button>sign up</button>
            </Link>
          </header>
          <div className="login__container__form">
            <h1>
              Hi,
              <span>Welcome back!</span>
            </h1>
            <div className="login__container__form__social">
              <SocialButtons />
            </div>
            <Dividor />
            <form>
              <FieldInput
                type="text"
                name="user"
                value={this.state.user}
                onChange={this.onChangeHandler.bind(this)}
                placeholder="Email address - Phone number"
                error={this.state.errors.user}
              />
              <FieldInput
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChangeHandler.bind(this)}
                placeholder="Password"
                error={this.state.errors.password}
              />
              <div className="forgot-password">
                <Link to="/forgot-password">
                  <p>Forget your password?</p>
                </Link>
              </div>
              <Button
                className="btn btn-md btn-green"
                // type="submit"
                onClick={this.onSubmitHandler}
              >
                Login
              </Button>
            </form>
          </div>
          <footer className="login__container__footer">
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
  postLogin: data => dispatch(postLogin(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
