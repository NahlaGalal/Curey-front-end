import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import SelectBox from "../SelectBox";

const medicationTypes = [
  {
    name: "Anti-tussive",
    id: 1,
  },
  {
    name: "Anti-viral",
    id: 2,
  },
  {
    name: "Appetizer",
    id: 3,
  },
  {
    name: "Artificial Sweetner",
    id: 4,
  },
];

const RequestMedication = (props) => {
  const [medicationTypeBox, setMedicationTypeBox] = useState(false);
  const [medicationType, setMedicationType] = useState({ name: "", id: null });
  const { register, handleSubmit, errors, watch } = useForm();
  const medicationTypeRef = React.createRef();

  const closeMedicationType = () => {
    const inputChecked = Array.from(
      medicationTypeRef.current.querySelectorAll("input[type=radio]")
    ).find((input) => input.checked);
    setMedicationTypeBox(false);
    if(inputChecked && inputChecked.id) {
      setMedicationType({
        name: inputChecked.value,
        id: inputChecked.id.split("_")[0],
      });
    }
  };

  return (
    <section className="Popup">
      <div className="Popup__box">
        <h2 className="heading-2">Request the medication</h2>
        <form
          className="Popup__box__details"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <Input
            type="text"
            name="medication"
            id="medication"
            value={watch("medication")}
            placeholder="Medication name"
            isError={errors.medication}
            error="You must type medication name"
            refe={register({ required: true })}
          />
          <SelectBox
            name="medication-type"
            onClick={closeMedicationType}
            openBox={() => setMedicationTypeBox(!medicationTypeBox)}
            className={`${medicationType.id ? "hasValue" : null}`}
            listChecked={medicationType.id ? medicationType.name : ""}
            header="Medication type"
            boxOpened={medicationTypeBox}
            list={medicationTypes}
            optionsContainerRef={medicationTypeRef}
          />
          <p className="Popup__box__details__note fades">
            We will search for this medication for you, and we'll inform you
            with the pharmacy where the medication existed
          </p>
          <div className="Popup__box__footer buttons">
            <Button className="btn btn-xxs btn-green-dark btn-apply">
              Ok, Got it
            </Button>
            <Button
              className="btn btn-xxs btn-cancel btn-transparent"
              onClick={props.closePopup}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RequestMedication;
