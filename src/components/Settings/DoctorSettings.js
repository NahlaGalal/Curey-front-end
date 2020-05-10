import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectBox from "../SelectBox";

export const ChangeSpeciality = (props) => {
  const speciality_name = props.speciality
    ? props.specialities.find(
        (speciality) => speciality.id === props.speciality
      ).name
    : "";
  let { register, handleSubmit, errors } = useForm({
    defaultValues: {
      Speciality: speciality_name,
    },
  });

  const [speciality, setSpeciality] = useState({
    speciality_id: props.speciality,
    speciality: speciality_name,
  });
  const [specialityBoxOpened, setSpecialityBoxOpened] = useState(false);
  let specialitiesContainerRef = React.createRef();

  const toggleSpecialitySelectBox = () => {
    const prev = specialityBoxOpened;
    let specialityChosen = speciality.speciality,
      speciality_id = speciality.speciality_id;
    if (prev) {
      const inputChecked = Array.from(
        specialitiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter((input) => input.checked)[0];
      specialityChosen = inputChecked ? inputChecked.value : "";
      speciality_id = inputChecked ? inputChecked.id.split("_")[0] : "";
    }
    setSpecialityBoxOpened(!prev);
    setSpeciality({
      speciality_id,
      speciality: specialityChosen,
    });
  };

  return (
    <React.Fragment>
      <h2 className="heading-2">Speciality</h2>
      <p className="Popup__box__settings__description">
        Add your speciality here
      </p>
      <form
        onSubmit={handleSubmit(() =>
          props.changeSpeciality({
            speciality_id: parseInt(speciality.speciality_id),
          })
        )}
      >
        <SelectBox
          name="speciality_id"
          onClick={toggleSpecialitySelectBox}
          className={`${speciality.speciality ? "hasValue" : null}`}
          listChecked={speciality.speciality_id ? [speciality.speciality] : []}
          header="Speciality"
          boxOpened={specialityBoxOpened}
          list={props.specialities}
          optionsContainerRef={specialitiesContainerRef}
          multiSelect={false}
          isError={errors.Speciality}
          error={errors.Speciality ? "You must choose your city" : null}
          refe={register({
            validate: () => speciality.speciality_id !== null,
          })}
        />
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
      <form onSubmit={handleSubmit((data) => props.changeFees(data))}>
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
      <form onSubmit={handleSubmit((data) => props.changeDuration(data))}>
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
      offers_callup: props.callup,
      callup_fees: props.callup_fees,
    },
  });
  const [homeVisit, setHomeVisit] = useState(props.callup);

  const toggleHomeVisit = () => setHomeVisit(!homeVisit);

  return (
    <React.Fragment>
      <h2 className="heading-2">Home visit service</h2>
      <p className="Popup__box__settings__description">
        Control your home visit service here
      </p>
      <form onSubmit={handleSubmit((data) => props.changeHomeVisit(data))}>
        <div className="homeVisit">
          <input
            type="checkbox"
            id="homeVisit"
            name="offers_callup"
            ref={register}
            hidden
            onChange={toggleHomeVisit}
          />
          <label htmlFor="homeVisit">Home visit srevice</label>
        </div>
        <div className={`fieldinput${!homeVisit ? " hidden" : ""}`}>
          <input
            name="callup_fees"
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
            className={watch("callup_fees") ? "active" : ""}
          >
            Home visit fees
          </label>
          {errors.callup_fees && (
            <p className="fieldinput__error">
              {errors.callup_fees ? "You must type your home visit fees" : null}
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
