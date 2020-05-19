import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectBox from "../SelectBox";
import Input from "../Input";

const ChangeAddress = (props) => {
  const currentCity = props.city_id
    ? props.cities.find((city) => city.id === props.city_id).name
    : "";
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      City: currentCity,
      address: props.address,
      work_address: props.work_address,
    },
  });

  const [city, setCity] = useState({
    city_id: props.city_id,
    city: currentCity,
  });
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
      <form
        onSubmit={handleSubmit((data) =>
          props.changeAddress({
            address: data.address,
            city_id: city.city_id,
            work_address: data.work_address,
          })
        )}
      >
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
        <Input
          name="work_address"
          type="text"
          id="work_address"
          value={watch("work_address")}
          placeholder="Work address"
          isError={errors.work_address}
          error="Your must type your address"
          refe={register({ required: true })}
        />
        <Input
          name="address"
          type="text"
          id="address"
          value={watch("address")}
          placeholder="Address"
          isError={errors.address}
          error="Your must type your address"
          refe={register({ required: true })}
        />
        <button type="submit" className="btn btn-green-dark btn-xxs">
          Save
        </button>
      </form>
    </React.Fragment>
  );
};

export default ChangeAddress;
