import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import SelectBox from "../SelectBox";
import Input from "../Input";

const cityList = [
  {
    name: "Mansoura",
    id: 1,
  },
  {
    name: "El-Mahalla",
    id: 2,
  },
  { name: "Bilqas", id: 3 },
  { name: "El-Manzalah", id: 4 },
];

const ChangeAddress = (props) => {
  const { errors, watch, register, handleSubmit } = useForm();
  const [city, setCity] = useState({ city: "", city_id: null });
  const [cityBoxOpened, setCityBoxOpened] = useState(false);
  const [activeToggler, setActiveToggler] = useState(1);
  const citiesContainerRef = React.createRef();

  const closeCitySelectBox = () => {
    const inputChecked = Array.from(
      citiesContainerRef.current.querySelectorAll("input[type=radio]")
    ).find((input) => input.checked);
    errors.city_id = undefined;
    setCityBoxOpened(false);
    if(inputChecked && inputChecked.id) {
      setCity({
        city_id: inputChecked.id.split("_")[0],
        city: inputChecked.value,
      });
    }
  };

  return (
    <section className="Popup">
      <div className="Popup__box">
        <h2 className="heading-2">Change address</h2>
        <div className="Popup__box__toggler toggler address-toggler">
          <Button
            className={activeToggler ? "btn active" : "btn"}
            onClick={() => setActiveToggler(1)}
          >
            Set a new address
          </Button>
          <Button
            className={activeToggler ? "btn" : "btn active"}
            onClick={() => setActiveToggler(0)}
          >
            Just for this order
          </Button>
        </div>
        <form
          className="Popup__box__details"
          onSubmit={handleSubmit((data) =>
            props.changeAddress({
              permenant: activeToggler,
              address: data.address,
            })
          )}
          id="form-submit"
        >
          <SelectBox
            name="city_id"
            onClick={closeCitySelectBox}
            openBox={() => setCityBoxOpened(!cityBoxOpened)}
            className={`${city.city_id ? "hasValue" : null}`}
            listChecked={city.city_id ? city.city : ""}
            header="City"
            boxOpened={cityBoxOpened}
            list={cityList}
            optionsContainerRef={citiesContainerRef}
            isError={errors.City}
            error={errors.City ? "You must choose your city" : null}
            refe={register}
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
        </form>
        <div className="Popup__box__footer buttons">
          <button
            className="btn btn-xxs btn-green-dark btn-apply"
            form="form-submit"
          >
            Confirm
          </button>
          <Button
            className="btn btn-xxs btn-cancel btn-transparent"
            onClick={props.closePopup}
          >
            Cancel
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChangeAddress;
