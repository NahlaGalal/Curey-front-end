import React from "react";
import validator from "validator";
import { useForm } from "react-hook-form";

const ChangeEmail = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      email: props.email,
    },
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Email address</h2>
      <p className="Popup__box__settings__description">
        Edit you email address here
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="fieldinput">
          <input
            className="fieldinput__input"
            name="email"
            id="email"
            type="email"
            ref={register({
              required: true,
              maxLength: 50,
              validate: (value) => validator.isEmail(value),
            })}
          />
          <label htmlFor="email" className={watch("email") ? "active" : ""}>
            Email address
          </label>
          {errors.email && (
            <p className="fieldinput__error">
              {errors.email ? "Your email must be a valid email" : null}
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-green-dark btn-xxs">
          Change
        </button>
      </form>
    </React.Fragment>
  );
};

export default ChangeEmail;
