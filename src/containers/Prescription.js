import React, { Component } from "react";
import Button from "../components/Button";
// Icons
import menuIcon from "../assets/svg/menu.svg";
import editIcon from "../assets/svg/edit.svg";
import deleteIcon from "../assets/svg/delete.svg";

const prescriptions = [
  {
    name: "Bronchophane",
    frequency: {
      times: 3,
      per: "Day"
    },
    Days: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"],
    Dosing: ["12:00 AM", "05:00 PM", "10:00 PM"]
  },
  {
    name: "Bronchophane",
    frequency: {
      times: 4,
      per: "Week"
    },
    Days: ["Sa", "Su", "Th", "Fr"],
    Dosing: ["12:00 AM", "10:00 PM"]
  },
  {
    name: "Bronchophane",
    frequency: {
      times: 1,
      per: "Day"
    },
    Days: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"],
    Dosing: ["10:00 PM"]
  },
  {
    name: "Bronchophane",
    frequency: {
      times: 3,
      per: "Day"
    },
    Days: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"],
    Dosing: ["12:00 AM", "05:00 PM", "10:00 PM"]
  },
  {
    name: "Bronchophane",
    frequency: {
      times: 3,
      per: "Day"
    },
    Days: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"],
    Dosing: ["12:00 AM", "05:00 PM", "10:00 PM"]
  },
  {
    name: "Bronchophane",
    frequency: {
      times: 3,
      per: "Day"
    },
    Days: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"],
    Dosing: ["12:00 AM", "05:00 PM", "10:00 PM"]
  },
  {
    name: "Bronchophane",
    frequency: {
      times: 3,
      per: "Day"
    },
    Days: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"],
    Dosing: ["12:00 AM", "05:00 PM", "10:00 PM"]
  },
  {
    name: "Bronchophane",
    frequency: {
      times: 3,
      per: "Day"
    },
    Days: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"],
    Dosing: ["12:00 AM", "05:00 PM", "10:00 PM"]
  }
];

export class Prescription extends Component {
  state = {
    menuVisiblity: -1
  };

  toggleMenu = i => {
    let menuVisiblity = i;
    if (this.state.menuVisiblity === i) menuVisiblity = -1;
    this.setState({ menuVisiblity });
  };

  render() {
    return (
      <main className="Prescription">
        <Button className="btn btn-lg btn-green-dark">
          {" "}
          Add Prescription{" "}
        </Button>
        <div className="Prescription__container">
          {prescriptions.map((prescription, i) => (
            <section className="Prescription__container__card" key={i}>
              <header>
                <h2>{prescription.name}</h2>
                <Button onClick={() => this.toggleMenu(i)} className="menu-btn">
                  <img src={menuIcon} alt={`menu button for ${prescription.name}`} />
                </Button>
              </header>
              <h3>Frequency</h3>
              <p className="Prescription__container__card__frequency">
                <span>{prescription.frequency.times}</span> times per{" "}
                <span>{prescription.frequency.per}</span>
              </p>
              <h3>Days in week</h3>
              <div className="Prescription__container__card__days">
                {prescription.Days.map(day => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <h3>Dosing times</h3>
              <ul className="Prescription__container__card__dosing">
                {prescription.Dosing.map(dose => (
                  <li key={dose}>{dose}</li>
                ))}
              </ul>
              <div
                className={`Prescription__container__card__menu ${
                  this.state.menuVisiblity === i ? "visible" : ""
                }`}
              >
                <Button>
                  <img src={editIcon} alt={`Edit ${prescription.name} medication`} />
                  Edit prescription
                </Button>
                <Button>
                  <img
                    src={deleteIcon}
                    alt={`Delete ${prescription.name} medication`}
                  />
                  Delete prescription
                </Button>
              </div>
            </section>
          ))}
        </div>
      </main>
    );
  }
}

export default Prescription;
