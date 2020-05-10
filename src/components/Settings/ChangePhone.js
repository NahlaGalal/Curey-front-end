import React from "react";
import { useForm } from "react-hook-form";
import validator from "validator";

const ChangePhone = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      phone: props.phone
    }
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Phone number</h2>
      <p className="Popup__box__settings__description">Add your phone number</p>
      <form onSubmit={handleSubmit((data) => props.changePhone(data))}>
        <div className="fieldinput">
          <input
            name="phone"
            type="text"
            id="phone"
            className="fieldinput__input"
            onKeyPress={(e) =>
              !e.key.toString().match(/[0-9]/) ? e.preventDefault() : null
            }
            ref={register({
              required: true,
              validate: (value) => validator.isMobilePhone(value),
            })}
          />
          <label htmlFor="phone" className={watch("phone") ? "active" : null}>
            Your phone number is...
          </label>
          {errors.phone && (
            <p className="fieldinput__error">
              {errors.phone ? "You must type your phone correctly" : null}
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-green-dark btn-xxs">
          Save
        </button>
      </form>
    </React.Fragment>
  );
};

export default ChangePhone;
