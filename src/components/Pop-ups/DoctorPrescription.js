import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import Button from "../Button";

const DoctorPrescription = (props) => {
  let { register, handleSubmit, errors, watch, setValue } = useForm();
  const delayedQuery = useCallback(
    debounce((q) => props.getSearchMedication(q), 500),
    []
  );
  const [searchBox, setSearchBox] = useState([false]);
  let [medication, setMedication] = useState([
    {
      name: "",
      frequency: 0,
      period: "",
      error: false,
    },
  ]);

  const changeMedicationState = (i, key, value) => {
    let state = [...medication];
    state[i][key] = value;
    setMedication(state);
  };

  const changeSearchState = (i, value) => {
    let state = [...searchBox];
    state[i] = value;
    setSearchBox(state);
  };

  const IncreaseFrequency = (i) =>
    changeMedicationState(i, "frequency", +medication[i].frequency + 1);

  const decreaseFrequency = (i) => {
    if (medication[i].frequency >= 1)
      changeMedicationState(i, "frequency", +medication[i].frequency - 1 || 1);
  };

  const togglePeriod = (i) =>
    changeMedicationState(
      i,
      "period",
      medication[i].period === "week" ? "day" : "week"
    );

  const addAnotherMedication = () => {
    let state = [...medication];
    let search = [...searchBox];
    state.push({
      id: null,
      name: "",
      frequency: 0,
      period: "",
      error: false,
    });
    setMedication(state);
    search.push(false);
    setSearchBox(search);
  };

  const chooseMedicine = (name, id, i) => {
    changeMedicationState(i, "name", name);
    changeMedicationState(i, "id", id);
    changeSearchState(i, false);
    setValue(`medication_name-${i}`, name);
  };

  const changeMedicationName = (value, i) => {
    if (value) {
      changeMedicationState(i, "id", null);
      changeMedicationState(i, "error", false);
      changeSearchState(i, true);
      delayedQuery(value);
    } else {
      changeSearchState(i, false);
    }
  };

  const sendPrescription = (medication) => {
    let err = false;
    medication.forEach((med, i) => {
      if (!med.id) {
        err = true;
        changeMedicationState(i, "error", true);
      }
    });
    if (!err) props.sendPrescription(medication);
  };

  return (
    <section className="Popup" onClick={(e) => e.stopPropagation()}>
      <form
        onSubmit={handleSubmit(() => sendPrescription(medication))}
        className="Popup__box"
      >
        <h2 className="heading-2">Prescription details</h2>
        <section className="Popup__box__details prescription">
          {medication.map((med, i) => (
            <div className="prescription__doctor" key={i}>
              <div className="fieldinput">
                <input
                  className="fieldinput__input"
                  type="text"
                  name={`medication_name-${i}`}
                  id={`medication_name-${i}`}
                  ref={register({ required: true })}
                  onChange={(e) => changeMedicationName(e.target.value, i)}
                />
                <label
                  htmlFor={`medication_name-${i}`}
                  className={
                    medication[i].name || watch(`medication_name-${i}`)
                      ? "active"
                      : null
                  }
                >
                  Medication name
                </label>
                {(errors[`medication_name-${i}`] ||
                  medication[i].error ||
                  props.errors.medication_name) && (
                  <p className="fieldinput__error">
                    {errors[`medication_name-${i}`] || medication[i].error
                      ? "You must type right medication name"
                      : props.errors.medication_name}
                  </p>
                )}
              </div>
              <div className="row">
                <div className="fieldinput">
                  <input
                    className="fieldinput__input"
                    type="text"
                    name={`frequency-${i}`}
                    id={`frequency-${i}`}
                    onKeyPress={(e) =>
                      !e.key.toString().match(/[0-9]/)
                        ? e.preventDefault()
                        : null
                    }
                    ref={register({ required: true })}
                    value={med.frequency || ""}
                    onChange={(e) => {
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
              {searchBox[i] && (
                <ul className="prescription__doctor__search">
                  {props.medications.map((medSearch) => (
                    <li key={medSearch.id}>
                      <label htmlFor={medSearch.id}> {medSearch.name} </label>
                      <input
                        type="radio"
                        name="medicine"
                        id={medSearch.id}
                        hidden
                        onChange={() =>
                          chooseMedicine(medSearch.name, medSearch.id, i)
                        }
                      />
                    </li>
                  ))}
                </ul>
              )}
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
    </section>
  );
};

export default DoctorPrescription;
