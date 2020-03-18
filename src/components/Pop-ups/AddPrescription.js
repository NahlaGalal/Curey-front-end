import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import plusIcon from "../../assets/svg/plus.svg";
import Input from "../Input";

const daysInWeek = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];

const AddPrescription = props => {
  let { register, handleSubmit, errors, watch } = useForm();
  let [period, setPeriod] = useState("");
  let [days, setDays] = useState([]);
  let [frequency, setFrequency] = useState(0);
  let [dosing, setDosing] = useState([""]);
  let [hours, setHours] = useState(["AM"]);

  const IncreaseFrequency = () => setFrequency(+frequency + 1);

  const decreaseFrequency = () => {
    if (frequency >= 1) setFrequency(+frequency - 1 || 1);
  };

  const togglePeriod = () => {
    if (period === "day") setPeriod("week");
    else setPeriod("day");
  };

  const toggleDay = (e, day) => {
    e.target.classList.toggle("active");
    const dayIndex = days.findIndex(day2 => day2 === day);
    if (dayIndex === -1){
      // if(days.length === 6) setPeriod("day");
      // else setPeriod("week");
      setDays([...days, day]);
    }
    else {
      // setPeriod("week")
      let splicedDays = [...days];
      splicedDays.splice(dayIndex, 1);
      setDays(splicedDays);
    }
  };

  const toggleHour = i => {
    let hoursState = [...hours];
    if (hoursState[i] === "AM") hoursState[i] = "PM";
    else hoursState[i] = "AM";
    setHours(hoursState);
  };

  const controlDosing = (e, i) => {
    if (
      !e.key.toString().match(/[0-9]/) ||
      e.target.value.toString().length === 5
    )
      e.preventDefault();
    else if (e.target.value.toString().length === 2) e.target.value += ":";
  };

  const changeDose = (e, i) => {
    let dosingState = [...dosing];
    dosingState[i] = e.target.value;
    setDosing(dosingState);
  };

  const addDosingInput = () => {
    setDosing([...dosing, ""]);
    setHours([...hours, "AM"]);
  };

  const onSubmitHandler = data => {
    const {medication_name, frequency, period, days, ...rest} = data;
    const daysArr = days.split(",").sort();
    const dosing = Object.values(rest);
    props.addPrescription({
      medication_name,
      frequency,
      period,
      days: daysArr,
      hours,
      dosing
    })
    props.closePopup();
  };

  return (
    <section className="Popup" onClick={e => e.stopPropagation()}>
      <div className="Popup__box">
        <form onSubmit={handleSubmit(data => onSubmitHandler(data))}>
          <h2 className="heading-2">Add prescription</h2>
          <section className="Popup__box__details prescription">
            <Input
              type="text"
              name="medication_name"
              value={watch("medication_name")}
              id="medication_name"
              placeholder="Medication name - hint"
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
                {(errors.period || props.errors.period) && (
                  <p className="fieldinput__error">
                    {errors.period
                      ? "You must choose period"
                      : props.errors.period}
                  </p>
                )}
              </div>
            </div>
            <h4 className="heading-4">Days in week</h4>
            <div className="days">
              <input
                hidden
                name="days"
                value={days}
                ref={register({ validate: value => value.length > 0})}
                readOnly
              />
              {daysInWeek.map((day, i) => (
                <Button
                  type="button"
                  key={day}
                  className="btn btn-days"
                  onClick={e => toggleDay(e, i + 1)}
                >
                  {day}
                </Button>
              ))}
              {(errors.days || props.errors.days) && (
                <p className="fieldinput__error">
                  {errors.days
                    ? "You must choose days in week"
                    : props.errors.days}
                </p>
              )}
            </div>
            <div className="row">
              <div className="dosing-inputs">
                {dosing.map((dose, i) => (
                  <div className="fieldinput" key={i}>
                    <input
                      className="fieldinput__input"
                      type="text"
                      name={`dosing-${i}`}
                      id={`dosing-${i}`}
                      ref={register({
                        required: true,
                        validate: value =>
                          value.toString().slice(0, 2) <= 12 &&
                          value.toString().slice(0, 2) > 0 &&
                          value.toString().slice(3) <= 59 &&
                          value.toString().slice(3) >= 0
                      })}
                      onKeyPress={e => controlDosing(e)}
                      value={dose}
                      onChange={e => changeDose(e, i)}
                    />
                    <label
                      className={dose ? "active" : null}
                      htmlFor={`dosing-${i}`}
                    >
                      Dosing time
                    </label>
                    <span className="fieldinput__hours">{hours[i]}</span>
                    <button
                      className="arrow arrow-up"
                      type="button"
                      onClick={() => toggleHour(i)}
                    ></button>
                    <button
                      className="arrow arrow-down"
                      type="button"
                      onClick={() => toggleHour(i)}
                    ></button>
                    {(errors[`dosing-${i}`] || props.errors.dosing) && (
                      <p className="fieldinput__error">
                        {errors[`dosing-${i}`]
                          ? "You must write your dosing times correctly"
                          : props.errors.dosing}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="btn btn-add"
                type="button"
                onClick={addDosingInput}
              >
                <img src={plusIcon} alt="Plus icon" />
              </button>
            </div>
          </section>
          <div className="Popup__box__footer buttons">
            <Button
              className="btn btn-xxs btn-green-dark btn-apply"
              type="submit"
            >
              Confirm
            </Button>
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

export default AddPrescription;
