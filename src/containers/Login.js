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
    errorsClient: {
      user: "",
      password: ""
    },
    errorsServer: {
      user: "",
      password: ""
    }
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.user.errors) !==
      JSON.stringify(this.props.user.errors)
    ) {
      const errorsServer = this.state.errorsServer;
      this.props.user.errors.user
        ? (errorsServer.user = this.props.user.errors.user)
        : (errorsServer.user = "");
      this.props.user.errors.password && !this.props.user.errors.user
        ? (errorsServer.password = this.props.user.errors.password)
        : (errorsServer.password = "");
      this.setState({ errorsServer });
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

  checkInput = name => {
    const { errorsClient } = this.state;
    if (name === "user") {
      if (
        !validator.isEmail(this.state.user) &&
        !validator.isMobilePhone(this.state.user)
      )
        errorsClient.user = "You must type your email or your phone correctly";
      else errorsClient.user = "";
    } else {
      if (
        !validator.isLength(this.state.password, {
          max: 50,
          min: 8
        })
      )
        errorsClient.password =
          "Your password must be between 8 and 50 characters";
      else errorsClient.password = "";
    }
    this.setState({ errorsClient });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.checkInput("user");
    this.checkInput("password");
    if (
      !Object.values(this.state.errorsClient).filter(value => value !== "")
        .length
    ) {
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
                error={
                  this.state.errorsClient.user || this.state.errorsServer.user
                }
                onBlur={() => this.checkInput("user")}
              />
              <FieldInput
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChangeHandler.bind(this)}
                placeholder="Password"
                error={
                  this.state.errorsClient.password ||
                  this.state.errorsServer.password
                }
                onBlur={() => this.checkInput("password")}
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
