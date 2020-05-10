import React from "react";
import { useForm } from "react-hook-form";

const ChangeFullName = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      full_name: props.name,
    },
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Full name</h2>
      <p className="Popup__box__settings__description">
        Edit your full name here
      </p>
      <form onSubmit={handleSubmit((data) => props.changeName(data))}>
        <div className="fieldinput">
          <input
            name="full_name"
            type="text"
            id="full_name"
            className="fieldinput__input"
            ref={register({ required: true, minLength: 6, maxLength: 50 })}
          />
          <label htmlFor="full_name" className={watch("full_name") ? "active" : ""}>
            Full name
          </label>
          {errors.full_name && (
            <p className="fieldinput__error">
              {errors.full_name
                ? "Your name must be between 6 and 50 characters"
                : null}
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

export default ChangeFullName;
