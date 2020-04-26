import React from "react";
import { useForm } from "react-hook-form";

const ChangeFullName = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      name: props.name,
    },
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Full name</h2>
      <p className="Popup__box__settings__description">
        Edit your full name here
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="fieldinput">
          <input
            name="name"
            type="text"
            id="name"
            className="fieldinput__input"
            ref={register({ required: true, minLength: 6, maxLength: 50 })}
          />
          <label htmlFor="name" className={watch("name") ? "active" : ""}>
            Full name
          </label>
          {errors.name && (
            <p className="fieldinput__error">
              {errors.name
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
