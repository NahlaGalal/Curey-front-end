import React, { Component, useState } from "react";
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

  const IncreaseFrequency = () => setFrequency(frequency + 1 || 0)

  const decreaseFrequency = () => setFrequency(frequency - 1 || 0);

  const togglePeriod = () => {
    if (period === "day") setPeriod("week");
    else setPeriod("day");
  };

  const toggleDay = (e, day) => {
    e.target.classList.toggle("active");
    const dayIndex = days.findIndex(day2 => day2 === day);
    if (dayIndex === -1) setDays([...days, day]);
    else {
      const splicedDays = days.splice(dayIndex, 1);
      setDays(splicedDays);
    }
  };

  const controlDosing = e => {
    if (
      !e.key.toString().match(/[0-9]/) ||
      e.target.value.toString().length === 5
    )
      e.preventDefault();
    else if (e.target.value.toString().length === 2)
      e.target.value += ":";
  };

  const addDosingTime = (e, i) => {
    let dosing = this.state.dosing;
    dosing[i] = e.target.value;
    this.setState({ dosing });
  };

  const onSubmitHandler = data => {
    console.log(data);
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
                  value={frequency}
                  onChange={e => setFrequency(e.target.value)}
                />
                <label
                  className={watch("frequency") ? "active" : null}
                  htmlFor="frequency"
                >
                  Frequency
                </label>
                <label htmlFor="frequency" style={{ position: "initial" }}>
                  <button
                    className="arrow arrow-up"
                    onClick={IncreaseFrequency}
                  ></button>
                  <button
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
                <label
                  className={watch("period") ? "active" : null}
                  htmlFor="period"
                >
                  {" "}
                  Per{" "}
                </label>
                <label htmlFor="period" style={{ position: "initial" }}>
                  <button
                    className="arrow arrow-up"
                    onClick={togglePeriod}
                  ></button>
                  <button
                    className="arrow arrow-down"
                    onClick={togglePeriod}
                  ></button>
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
              {daysInWeek.map((day, i) => (
                <Button
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
            {/* <div className="row">
            <div className="dosing-inputs">
              {this.state.dosing.map((dose, i) => (
                <div className="fieldinput" key={i}>
                  <input
                    className="fieldinput__input"
                    type="text"
                    name="dosing"
                    id={`dosing-${i}`}
                    onKeyPress={e => controlDosing(e, i)}
                    onKeyUp={e => addDosingTime(e, i)}
                  />
                  <label
                    className={dose ? "active" : null}
                    htmlFor={`dosing-${i}`}
                  >
                    Dosing time
                  </label>
                  <span className="fieldinput__hours">
                    {this.state.hours[i]}
                  </span>
                  <button
                    className="arrow arrow-up"
                    onClick={() => this.toggleHour(i)}
                  ></button>
                  <button
                    className="arrow arrow-down"
                    onClick={() => this.toggleHour(i)}
                  ></button>
                  {this.state.errors.dosings[i] && (
                    <p className="fieldinput__error">
                      You must write your dosing times correctly
                    </p>
                  )}
                </div>
              ))}
            </div>
            <button className="btn btn-add" onClick={this.addDosingInput}>
              <img src={plusIcon} alt="Plus icon" />
            </button>
          </div> */}
          </section>
          <div className="Popup__box__footer buttons">
            <Button
              className="btn btn-xxs btn-green-dark btn-apply"
              type="submit"
              // onClick={this.applyPrescription}
            >
              Confirm
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

export default AddPrescription;

// class AddPrescription extends Component {
//   state = {
//     medication_name: "",
//     frequency: "",
//     period: "",
//     days: [],
//     dosing: [""],
//     hours: ["AM"],
//     // overallError: false,
//     errors: {
//       medication_name: false,
//       frequency: false,
//       period: false,
//       days: false,
//       dosings: [false]
//     }
//   };

//   onChangeHandler = ({ target: { name, value } }) => {
//     this.setState({
//       [name]: value
//     });
//   };

//   toggleHour = i => {
//     let hours = this.state.hours;
//     if (hours[i] === "AM") hours[i] = "PM";
//     else hours[i] = "AM";
//     this.setState({ hours });
//   };

//   checkDosing = (e, i) => {
//     let { errors } = this.state;
//     if (
//       +e.target.value.toString().slice(0, 2) > 12 ||
//       +e.target.value.toString().slice(0, 2) <= 0 ||
//       +e.target.value.toString().slice(3) > 59 ||
//       +e.target.value.toString().slice(3) < 0
//     )
//       errors.dosings[i] = true;
//     else errors.dosings[i] = false;
//     this.setState({ errors });
//   };

//   addDosingInput = () => {
//     const { dosing, hours, errors } = this.state;
//     dosing.push("");
//     hours.push("AM");
//     errors.dosings.push(false);
//     this.setState({ dosing, hours, errors });
//   };

//   checkEmpty = (name) => {
//     const { errors } = this.state;
//     if (!this.state[name]) errors[name] = true;
//     else errors[name] = false;
//     this.setState({ errors });
//   };

//   // checkAllFields = () => {
//   //   if(validator.isEmpty(this.state.medication_name) ||
//   //   validator.isEmpty(this.state.frequency) ||
//   //   validator.isEmpty(this.state.period) ||
//   //   !this.state.days.length ||
//   //   this.state.dosing.findIndex(dose => !dose) !== -1) {
//   //     this.setState({ overallError: true })
//   //   }
//   // }

//   applyPrescription = () => {
//     const {medication_name, dosing, frequency, hours, period, days} = this.state;
//     this.props.addPrescription({
//       medication_name, dosing, frequency, hours, period, days
//     })
//     this.props.closePopup();
//   };

//   render() {

//   }
// }
