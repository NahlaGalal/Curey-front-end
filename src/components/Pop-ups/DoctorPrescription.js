import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";

const DoctorPrescription = props => {
  let { register, handleSubmit, errors, watch } = useForm();
  let [period, setPeriod] = useState("");
  let [frequency, setFrequency] = useState(0);

  const IncreaseFrequency = () => setFrequency(+frequency + 1);
  const decreaseFrequency = () => {
    if (frequency >= 1) setFrequency(+frequency - 1 || 1);
  };

  const togglePeriod = () => {
    if (period === "day") setPeriod("week");
    else setPeriod("day");
  };

  const onSubmitHandler = data => {
    console.log(data);
    props.closePopup();
  };

  return (
    <section className="Popup" onClick={e => e.stopPropagation()}>
      <div className="Popup__box">
        <form onSubmit={handleSubmit(data => onSubmitHandler(data))}>
          <h2 className="heading-2">Prescription details</h2>
          <section className="Popup__box__details prescription">
            <Input
              type="text"
              name="medication_name"
              value={watch("medication_name")}
              id="medication_name"
              placeholder="Medication name"
              isError={errors.medication_name || props.errors.medication_name}
              error={
                errors.medication_name
                  ? "You must type medication name"
                  : props.errors.medication_name
              }
              refe={register({ required: true })}
            />
            <div className="row">
              <div className="fieldinput">
                <input
                  className="fieldinput__input"
                  type="text"
                  name="frequency"
                  id="frequency"
                  onKeyPress={e =>
                    !e.key.toString().match(/[0-9]/) ? e.preventDefault() : null
                  }
                  ref={register({ required: true })}
                  value={frequency || ""}
                  onChange={e => setFrequency(+e.target.value)}
                />
                <label
                  className={frequency ? "active" : null}
                  htmlFor="frequency"
                >
                  Frequency
                </label>
                <label htmlFor="frequency" style={{ position: "initial" }}>
                  <button
                    type="button"
                    className="arrow arrow-up"
                    onClick={IncreaseFrequency}
                  ></button>
                  <button
                    type="button"
                    className="arrow arrow-down"
                    onClick={decreaseFrequency}
                  ></button>
                </label>
                {(errors.frequency || props.errors.frequency) && (
                  <p className="fieldinput__error">
                    {errors.frequency
                      ? "You must choose frequency"
                      : props.errors.frequency}
                  </p>
                )}
              </div>
              <div className="fieldinput">
                <input
                  className="fieldinput__input"
                  type="text"
                  name="period"
                  readOnly
                  id="period"
                  value={period}
                  ref={register({ required: true })}
                />
                <label className={period ? "active" : null} htmlFor="period">
                  {" "}
                  Per{" "}
                </label>
                <label htmlFor="period" style={{ position: "initial" }}>
                  <span
                    className="arrow arrow-up"
                    onClick={togglePeriod}
                  ></span>
                  <span
                    className="arrow arrow-down"
                    onClick={togglePeriod}
                  ></span>
                </label>
              </div>
            </div>
            <Button className="btn-blue btn-add-medication">Add another medication</Button>
          </section>
          <div className="Popup__box__footer buttons">
            <button
              className="btn btn-xxs btn-green-dark btn-apply"
              type="submit"
            >
              Confirm
            </button>
            <Button
              type="button"
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

export default DoctorPrescription;
