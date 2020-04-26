import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const ChangeSpeciality = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      speciality: props.speciality,
    },
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Speciality</h2>
      <p className="Popup__box__settings__description">
        Add your speciality here
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="fieldinput">
          <input
            name="speciality"
            type="text"
            id="speciality"
            className="fieldinput__input"
            ref={register({ required: true })}
          />
          <label
            htmlFor="speciality"
            className={watch("speciality") ? "active" : ""}
          >
            Speciality
          </label>
          {errors.speciality && (
            <p className="fieldinput__error">
              {errors.speciality ? "You must type your speciality" : null}
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

export const ChangeFees = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      fees: props.fees,
    },
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Fees</h2>
      <p className="Popup__box__settings__description">Add your fees here</p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="fieldinput">
          <input
            name="fees"
            type="text"
            id="fees"
            className="fieldinput__input"
            ref={register({ required: true })}
            onKeyPress={(e) =>
              !e.key.match(/[0-9]/) ? e.preventDefault() : null
            }
          />
          <label htmlFor="fees" className={watch("fees") ? "active" : ""}>
            Fees
          </label>
          {errors.fees && (
            <p className="fieldinput__error">
              {errors.fees ? "You must type your fees" : null}
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

export const ChangeDuartion = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      duration: props.duration,
    },
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Duration</h2>
      <p className="Popup__box__settings__description">
        Add your duration of examination here
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="fieldinput">
          <input
            name="duration"
            type="text"
            id="duration"
            className="fieldinput__input"
            ref={register({ required: true })}
            onKeyPress={(e) =>
              !e.key.match(/[0-9]/) ? e.preventDefault() : null
            }
          />
          <label
            htmlFor="duration"
            className={watch("duration") ? "active" : ""}
          >
            Duration in minutes
          </label>
          {errors.duration && (
            <p className="fieldinput__error">
              {errors.duration ? "You must type your duration" : null}
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

export const ChangeHomeVisit = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      home_visit: props.is_callup,
      home_visit_fees: props.is_callup ? "" : props.is_callup_fees,
    },
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Home visit service</h2>
      <p className="Popup__box__settings__description">
        Control your home visit service here
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="homeVisit">
          <input type="checkbox" id="homeVisit" name="homeVisit" />
          <label htmlFor="homeVisit">
            <span></span> Home visit srevice
          </label>
        </div>
        <div className="fieldinput">
          <input
            name="home_visit"
            type="text"
            id="home-visit"
            className="fieldinput__input"
            ref={register({ required: true })}
            onKeyPress={(e) =>
              !e.key.match(/[0-9]/) ? e.preventDefault() : null
            }
          />
          <label
            htmlFor="home-visit"
            className={watch("home_visit") ? "active" : ""}
          >
            Home visit fees
          </label>
          {errors.home_visit && (
            <p className="fieldinput__error">
              {errors.home_visit ? "You must type your home visit fees" : null}
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

export const ChangeDegrees = (props) => {
  let [degrees, setDegrees] = useState(props.degrees);

  return (
    <React.Fragment>
      <h2 className="heading-2">Degrees</h2>
      <p className="Popup__box__settings__description">
        Add your degrees here
      </p>
      <form onSubmit={e => e.preventDefault()}>
        <div className="fieldinput">
          <input
            name="degrees"
            type="text"
            id="degrees"
            className="fieldinput__input"
            onChange={e => setDegrees(e.target.value)}
          />
          <label
            htmlFor="degrees"
            className={degrees ? "active" : ""}
          >
            Degrees seperated by ,
          </label>
        </div>
        <button type="submit" className="btn btn-green-dark btn-xxs">
          Save
        </button>
      </form>
    </React.Fragment>
  );
};