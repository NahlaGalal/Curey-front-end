import React, { Component } from "react";
import Button from "../Button";
import plusIcon from "../../assets/svg/plus.svg";

const days = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];

class AddPrescription extends Component {
  state = {
    medication_name: "",
    frequency: "",
    period: "",
    days: [],
    dosing: [""],
    hours: ["AM"],
    // overallError: false,
    errors: {
      medication_name: false,
      frequency: false,
      period: false,
      days: false,
      dosings: [false]
    }
  };

  onChangeHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  toggleDay = (e, day) => {
    e.target.classList.toggle("active");
    let days = this.state.days;
    const dayIndex = days.findIndex(day2 => day2 === day);
    if (dayIndex === -1) days.push(day);
    else days.splice(dayIndex, 1);
    this.setState({ days });
  };

  IncreaseFrequency = () => {
    if (this.state.frequency !== "")
      this.setState({ frequency: +this.state.frequency + 1 });
    else this.setState({ frequency: 0 });
  };

  decreaseFrequency = () => {
    if (this.state.frequency)
      this.setState({ frequency: +this.state.frequency - 1 });
    else this.setState({ frequency: 0 });
  };

  togglePeriod = () => {
    if (this.state.period === "day") this.setState({ period: "week" });
    else this.setState({ period: "day" });
  };

  toggleHour = i => {
    let hours = this.state.hours;
    if (hours[i] === "AM") hours[i] = "PM";
    else hours[i] = "AM";
    this.setState({ hours });
  };

  controlDosing = e => {
    if (!e.key.toString().match(/[0-9]/)) e.preventDefault();
    if (e.target.value.toString().length === 2) {
      e.target.value += ":";
      return;
    } else if (e.target.value.toString().length === 5) {
      e.preventDefault();
    }
  };

  addDosingTime = (e, i) => {
    let dosing = this.state.dosing;
    dosing[i] = e.target.value;
    this.setState({ dosing });
  };

  checkDosing = (e, i) => {
    let { errors } = this.state;
    if (
      +e.target.value.toString().slice(0, 2) > 12 ||
      +e.target.value.toString().slice(0, 2) <= 0 ||
      +e.target.value.toString().slice(3) > 59 ||
      +e.target.value.toString().slice(3) < 0
    )
      errors.dosings[i] = true;
    else errors.dosings[i] = false;
    this.setState({ errors });
  };

  addDosingInput = () => {
    const { dosing, hours, errors } = this.state;
    dosing.push("");
    hours.push("AM");
    errors.dosings.push(false);
    this.setState({ dosing, hours, errors });
  };

  checkEmpty = (name) => {
    const { errors } = this.state;
    if (!this.state[name]) errors[name] = true;
    else errors[name] = false;
    this.setState({ errors });
  };

  // checkAllFields = () => {
  //   if(validator.isEmpty(this.state.medication_name) || 
  //   validator.isEmpty(this.state.frequency) ||
  //   validator.isEmpty(this.state.period) ||
  //   !this.state.days.length ||
  //   this.state.dosing.findIndex(dose => !dose) !== -1) {
  //     this.setState({ overallError: true })
  //   }
  // }

  applyPrescription = () => {
    const {medication_name, dosing, frequency, hours, period, days} = this.state;
    this.props.addPrescription({
      medication_name, dosing, frequency, hours, period, days
    })
    this.props.closePopup();
  };

  render() {
    return (
      <section className="Popup" onClick={e => e.stopPropagation()}>
        <div className="Popup__box">
          <h2 className="heading-2">Add prescription</h2>
          <section className="Popup__box__details prescription">
            <div className="fieldinput">
              <input
                className="fieldinput__input"
                type="text"
                name="medication_name"
                value={this.state.medication_name}
                onChange={this.onChangeHandler.bind(this)}
                onBlur={() => this.checkEmpty("medication_name")}
              />
              <label
                className={
                  this.state.medication_name &&
                  this.state.medication_name.length
                    ? "active"
                    : null
                }
              >
                Medication name - hint
              </label>
              {this.state.errors.medication_name && (
                <p className="fieldinput__error">
                  You must type medication name
                </p>
              )}
            </div>
            <div className="row">
              <div
                className="fieldinput"
                onBlur={() => this.checkEmpty("frequency")}
              >
                <input
                  className="fieldinput__input"
                  type="text"
                  name="frequency"
                  value={this.state.frequency.toString()}
                  onChange={this.onChangeHandler.bind(this)}
                  onKeyPress={e =>
                    !e.key.toString().match(/[0-9]/) ? e.preventDefault() : null
                  }
                  id="frequency"
                />
                <label
                  className={this.state.frequency !== "" ? "active" : null}
                  htmlFor="frequency"
                >
                  {" "}
                  Frequency{" "}
                </label>
                <label htmlFor="frequency" style={{ position: "initial" }}>
                  <button
                    className="arrow arrow-up"
                    onClick={this.IncreaseFrequency}
                  ></button>
                  <button
                    className="arrow arrow-down"
                    onClick={this.decreaseFrequency}
                  ></button>
                </label>
                {this.state.errors.frequency && (
                  <p className="fieldinput__error">You must choose frequency</p>
                )}
              </div>
              <div
                className="fieldinput"
                onBlur={() => this.checkEmpty("period")}
              >
                <input
                  className="fieldinput__input"
                  type="text"
                  name="period"
                  value={this.state.period}
                  readOnly
                  id="period"
                />
                <label
                  className={this.state.period ? "active" : null}
                  htmlFor="period"
                >
                  {" "}
                  Per{" "}
                </label>
                <label htmlFor="period" style={{ position: "initial" }}>
                  <button
                    className="arrow arrow-up"
                    onClick={this.togglePeriod}
                  ></button>
                  <button
                    className="arrow arrow-down"
                    onClick={this.togglePeriod}
                  ></button>
                </label>
                {this.state.errors.period && (
                  <p className="fieldinput__error">You must choose period</p>
                )}
              </div>
            </div>
            <h4 className="heading-4">Days in week</h4>
            <div className="days">
              {days.map((day, i) => (
                <Button
                  key={day}
                  className="btn btn-days"
                  onClick={e => this.toggleDay(e, i + 1)}
                >
                  {day}
                </Button>
              ))}
              {this.state.errors.days && (
                <p className="fieldinput__error">
                  You must choose days in week
                </p>
              )}
            </div>
            <div className="row">
              <div className="dosing-inputs">
                {this.state.dosing.map((dose, i) => (
                  <div className="fieldinput" key={i}>
                    <input
                      className="fieldinput__input"
                      type="text"
                      name="dosing"
                      onKeyPress={e => this.controlDosing(e, i)}
                      onKeyUp={e => this.addDosingTime(e, i)}
                      onBlur={e => this.checkDosing(e, i)}
                    />
                    <label className={dose ? "active" : null}>
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
            </div>
          </section>
          <div className="Popup__box__footer buttons">
            <Button
              className="btn btn-xxs btn-green-dark btn-apply"
              onClick={this.applyPrescription}
            >
              Confirm
            </Button>
            <Button
              className="btn btn-xxs btn-cancel btn-transparent"
              onClick={this.props.closePopup}
            >
              Cancel
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

export default AddPrescription;
