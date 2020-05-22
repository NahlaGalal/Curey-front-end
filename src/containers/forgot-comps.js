// @ts-check
import React from "react";
import { Switch, Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import validator from "validator";
import Input from "../components/Input";
import Button from "../components/Button";

const ForgotPassword = () => {
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmitHandler = (data) => {
    this.props.history.push("/reset-password");
  };

  return (
    <div className="forgot__container__password">
      <h1>Forget Password!</h1>
      <p className="forgot__container__password__para">
        Please, enter your email address or your phone number, You will recieve
        code to reset your password
      </p>
      <form onSubmit={handleSubmit((data) => onSubmitHandler(data))} noValidate>
        <Input
          type="email"
          name="email"
          id="email"
          value={watch("email")}
          placeholder="Email address - Phone nember"
          isError={errors.email}
          error="You must type valid email"
          refe={register({
            required: true,
            validate: (value) => validator.isEmail(value),
            maxLength: 50,
          })}
        />
        <Button className="btn btn-md btn-green">Send</Button>
      </form>
    </div>
  );
};

const ResetPassword = () => {
  const { handleSubmit, errors, watch, register } = useForm();

  const onSubmitHandler = (data) => {
    this.props.history.push("/login");
  };

  return (
    <div className="forgot__container__reset">
      <h1>Reset your password</h1>
      <form onSubmit={handleSubmit((data) => onSubmitHandler(data))}>
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          value={watch("newPassword")}
          placeholder="New password"
          refe={register({ required: true, minLength: 8, maxLength: 50 })}
          isError={errors.newPassword}
          error="You must type password with length from 8 to 50 character"
        />
        <Input
          type="password"
          name="repeatNewPassword"
          id="repeatNewPassword"
          value={watch("repeatNewPassword")}
          placeholder="Repeat new password"
          refe={register({
            required: true,
            validate: (value) => value === watch("newPassword"),
          })}
          isError={errors.repeatNewPassword}
          error="Passwords aren't identical"
        />
        <Button className="btn btn-md btn-green">Reset Password</Button>
      </form>
    </div>
  );
};

const Forgot = () => {
  return (
    <section className="forgot">
      <div className="forgot__container">
        <Switch>
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
        </Switch>
        <footer className="forgot__container__footer">
          <p>All Rights Reserved © Curey</p>
        </footer>
      </div>
    </section>
  );
};

export default Forgot;
