// @ts-check
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import validator from "validator";
import SocialButtons from "../components/Social-buttons";
import Dividor from "../components/Dividor";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import Input from "../components/Input";

const Login = props => {
  let { register, handleSubmit, errors, watch } = useForm();

  const onSubmitHandler = data => {
    props.postLogin({
      user: data.user,
      password: data.password
    });
  };

  useEffect(() => {
    if (props.user.api_token) props.history.push("/home");
  });

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
          <form onSubmit={handleSubmit(data => onSubmitHandler(data))}>
            <Input
              className="fieldinput__input"
              type="text"
              name="user"
              id="user"
              value={watch("user")}
              placeholder="Email address - Phone number"
              isError={errors.user || props.user.errors.user}
              error={
                errors.user
                  ? "You must type your email or your phone correctly"
                  : props.user.errors.user
              }
              refe={register({
                required: true,
                minLength: 5,
                validate: value =>
                  validator.isEmail(value) ||
                  validator.isMobilePhone(value, "ar-EG")
              })}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={watch("password")}
              isError={errors.password || props.user.errors.password}
              error={
                errors.password
                  ? "Your password must be between 8 and 50 characters"
                  : props.user.errors.password
              }
              refe={register({ required: true, minLength: 8, maxLength: 50 })}
            />
            <div className="forgot-password">
              <Link to="/forgot-password">
                <p>Forget your password?</p>
              </Link>
            </div>
            <button className="btn btn-md btn-green" type="submit">
              Login
            </button>
          </form>
        </div>
        <footer className="login__container__footer">
          <p>All Rights Reserved © Curey</p>
        </footer>
      </section>
    </section>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  postLogin: data => dispatch({ type: actions.SAGA_LOGIN_USER, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
