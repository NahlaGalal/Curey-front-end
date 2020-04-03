import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";

const DoctorPrescription = props => {
  let { register, handleSubmit, errors, watch } = useForm();
  let [medication, setMedication] = useState([
    {
      name: "",
      frequency: 0,
      period: ""
    }
  ]);

  const IncreaseFrequency = i => {
    let state = [...medication];
    state[i].frequency = +state[i].frequency + 1;
    setMedication(state);
  };
  const decreaseFrequency = i => {
    if (medication[i].frequency >= 1) {
      let state = [...medication];
      state[i].frequency = +state[i].frequency - 1 || 1;
      setMedication(state);
    }
  };

  const togglePeriod = i => {
    let state = [...medication];
    state[i].period = state[i].period === "week" ? "day" : "week";
    setMedication(state);
  };

  const addAnotherMedication = () => {
    let state = [...medication];
    state.push({
      name: "",
      frequency: 0,
      period: ""
    });
    setMedication(state);
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
            {medication.map((med, i) => (
              <div className="prescription__doctor" key={i}>
                <Input
                  type="text"
                  name={`medication_name-${i}`}
                  value={watch(`medication_name-${i}`)}
                  id={`medication_name-${i}`}
                  placeholder="Medication name"
                  isError={
                    errors[`medication_name-${i}`] ||
                    props.errors.medication_name
                  }
                  error={
                    errors[`medication_name-${i}`]
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
                      name={`frequency-${i}`}
                      id={`frequency-${i}`}
                      onKeyPress={e =>
                        !e.key.toString().match(/[0-9]/)
                          ? e.preventDefault()
                          : null
                      }
                      ref={register({ required: true })}
                      value={med.frequency || ""}
                      onChange={e => {
                        let state = [...medication];
                        state[i].frequency = +e.target.value;
                        setMedication(state);
                      }}
                    />
                    <label
                      className={med.frequency ? "active" : null}
                      htmlFor={`frequency-${i}`}
                    >
                      Frequency
                    </label>
                    <label
                      htmlFor={`frequency-${i}`}
                      style={{ position: "initial" }}
                    >
                      <button
                        type="button"
                        className="arrow arrow-up"
                        onClick={() => IncreaseFrequency(i)}
                      ></button>
                      <button
                        type="button"
                        className="arrow arrow-down"
                        onClick={() => decreaseFrequency(i)}
                      ></button>
                    </label>
                    {((errors[`frequency-${i}`] && !med.frequency) ||
                      props.errors.frequency) && (
                      <p className="fieldinput__error">
                        {errors[`frequency-${i}`]
                          ? "You must choose frequency"
                          : props.errors.frequency}
                      </p>
                    )}
                  </div>
                  <div className="fieldinput">
                    <input
                      className="fieldinput__input"
                      type="text"
                      name={`period-${i}`}
                      readOnly
                      id={`period-${i}`}
                      value={med.period}
                      ref={register({ required: true })}
                    />
                    <label
                      className={med.period ? "active" : null}
                      htmlFor={`period-${i}`}
                    >
                      {" "}
                      Per{" "}
                    </label>
                    <label
                      htmlFor={`period-${i}`}
                      style={{ position: "initial" }}
                    >
                      <span
                        className="arrow arrow-up"
                        onClick={() => togglePeriod(i)}
                      ></span>
                      <span
                        className="arrow arrow-down"
                        onClick={() => togglePeriod(i)}
                      ></span>
                    </label>
                    {((errors[`period-${i}`] && !med.period) ||
                      props.errors.period) && (
                      <p className="fieldinput__error">
                        {errors[`period-${i}`]
                          ? "You must choose period"
                          : props.errors.period}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Button
              className="btn-blue btn-add-medication"
              onClick={addAnotherMedication}
            >
              Add another medication
            </Button>
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
