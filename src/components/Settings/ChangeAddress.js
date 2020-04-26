import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectBox from "../SelectBox";

const ChangeAddress = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      City: "Mansoura",
    },
  });
  const [city, setCity] = useState({ city_id: 1, city: "Mansoura" });
  const [cityBoxOpened, setCityBoxOpened] = useState(false);
  let citiesContainerRef = React.createRef();

  const toggleCitySelectBox = () => {
    const prev = cityBoxOpened;
    let cityChosen = city.city,
      city_id = city.city_id;
    if (prev) {
      const inputChecked = Array.from(
        citiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter((input) => input.checked)[0];
      cityChosen = inputChecked ? inputChecked.value : "";
      city_id = inputChecked ? inputChecked.id.split("_")[0] : "";
    }
    setCityBoxOpened(!prev);
    setCity({
      city_id,
      city: cityChosen,
    });
  };

  return (
    <React.Fragment>
      <h2 className="heading-2">Address</h2>
      <p className="Popup__box__settings__description">Add your address here</p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <SelectBox
          name="city_id"
          onClick={toggleCitySelectBox}
          className={`${city.city ? "hasValue" : null}`}
          listChecked={city.city_id ? [city.city] : []}
          header="City"
          boxOpened={cityBoxOpened}
          list={props.cities}
          optionsContainerRef={citiesContainerRef}
          multiSelect={false}
          isError={errors.City}
          error={errors.City ? "You must choose your city" : null}
          refe={register({
            validate: () => city.city_id !== null,
          })}
        />
        <div className="fieldinput">
          <input
            name="address"
            type="text"
            id="address"
            className="fieldinput__input"
            ref={register({ required: true })}
          />
          <label htmlFor="address" className={watch("address") ? "active" : ""}>
            Address
          </label>
          {errors.address && (
            <p className="fieldinput__error">
              {errors.address ? "Your must type your address" : null}
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

export default ChangeAddress;
