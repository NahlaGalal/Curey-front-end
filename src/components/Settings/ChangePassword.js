import React from "react";
import { useForm } from "react-hook-form";

const ChangePassword = (props) => {
  let { register, handleSubmit, errors, watch } = useForm();

  return (
    <React.Fragment>
      <h2 className="heading-2">Password</h2>
      <p className="Popup__box__settings__description">
        Edit your password here
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="fieldinput">
          <input
            name="current_password"
            id="passwordCurrent"
            type="password"
            className="fieldinput__input"
            ref={register({ required: true, minLength: 8, maxLength: 50 })}
          />
          <label
            htmlFor="passwordCurrent"
            className={watch("current_password") ? "active" : ""}
          >
            Current password
          </label>
          {errors.current_password && (
            <p className="fieldinput__error">
              {errors.current_password
                ? "Your password must be between 8 and 50 characters"
                : null}
            </p>
          )}
        </div>
        <div className="fieldinput">
          <input
            name="new_password"
            id="passwordNew"
            type="password"
            className="fieldinput__input"
            ref={register({ required: true, minLength: 8, maxLength: 50 })}
          />
          <label
            htmlFor="passwordNem"
            className={watch("new_password") ? "active" : ""}
          >
            New password
          </label>
          {errors.new_password && (
            <p className="fieldinput__error">
              {errors.new_password
                ? "Your password must be between 8 and 50 characters"
                : null}
            </p>
          )}
        </div>
        <div className="fieldinput">
          <input
            name="confirm_password"
            id="passwordConfirm"
            type="password"
            className="fieldinput__input"
            ref={register({
              required: true,
              validate: (value) => value === watch("new_password"),
            })}
          />
          <label
            htmlFor="passwordConfirm"
            className={watch("confirm_password") ? "active" : ""}
          >
            Repeat your password
          </label>
          {errors.confirm_password && (
            <p className="fieldinput__error">
              {errors.confirm_password ? "Passwords must be identical" : null}
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

export default ChangePassword;
