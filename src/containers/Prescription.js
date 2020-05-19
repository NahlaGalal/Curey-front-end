import React, { Component } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import Button from "../components/Button";
import * as actions from "../actions/types";
import AddPrescription from "../components/Pop-ups/AddPrescription";
// Icons
import menuIcon from "../assets/svg/menu.svg";
import editIcon from "../assets/svg/edit.svg";
import deleteIcon from "../assets/svg/delete.svg";

export class Prescription extends Component {
  state = {
    menuVisiblity: -1,
    addPrescriptionBox: false
  };

  componentDidMount() {
    this.props.getPrescriptions(this.props.api_token);
  }

  toggleMenu = (e, i) => {  
    e.stopPropagation();
    let menuVisiblity = i;
    if (this.state.menuVisiblity === i) menuVisiblity = -1;
    this.setState({ menuVisiblity });
  };

  deletePrescriptions = prescription_id => {
    this.props.postDeletePrescriptions({
      api_token: this.props.api_token,
      prescription_id
    });
    this.setState({ menuVisiblity: -1 });
  };

  addPrescription = data => {
    let hours = [],
      date = null,
      end_date = "";
    data.dosing.forEach((dose, i) => {
      if (data.hours[i] === "PM") {
        dose = dose.replace(dose.slice(0, 2), +dose.slice(0, 2) + 12);
      }
      hours.push(`${dose}:00`);
    });
    date = new Date(Date.now() + 1000 * 365 * 24 * 60 * 60);
    end_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    this.props.postAddPrescription({
      api_token: this.props.api_token,
      medicine_name: data.medication_name,
      dosage: "2 pills",
      start_hour: hours[0],
      end_date,
      frequency: data.frequency,
      days: data.days,
      hours: hours.sort(),
      auto: 0
    });
  };

  formatTime = (time) => {
    let hours = parseInt(time.slice(0, 2));
    let minutes = time.slice(3, 5);
    let hourFormat = "AM";
    if(hours > 12) {
      hours -= 12;
      hourFormat = "PM";
    }else if(hours === 12) hourFormat = "PM";
    else if(hours === 0) hours = 12;
    hours = hours.toString().padStart(2, '0');
    time = `${hours}:${minutes} ${hourFormat}`
    return <li key={time}>{time}</li>
  }

  render() {
    return (
      <main className="Prescription" onClick={() => this.setState({menuVisiblity: -1})}>
        <Button
          className="btn btn-lg btn-green-dark"
          onClick={() => this.setState({ addPrescriptionBox: true })}
        >
          {" "}
          Add Prescription{" "}
        </Button>
        {this.props.prescriptions.length ? (
          <div className="Prescription__container">
            {this.props.prescriptions.map((prescription, i) => (
              <section
                className="Prescription__container__card"
                key={prescription.id}
              >
                <header>
                  <h2>{prescription.medicine}</h2>
                  <Button
                    onClick={(e) => this.toggleMenu(e, i)}
                    className="menu-btn"
                  >
                    <img
                      src={menuIcon}
                      alt={`menu button for ${prescription.medicine}`}
                    />
                  </Button>
                </header>
                <h3>Frequency</h3>
                <p className="Prescription__container__card__frequency">
                  <span>{prescription.frequency}</span> times per{" "}
                  <span>{prescription.Days.length === 7 ? "day" : "week"}</span>
                </p>
                <h3>Days in week</h3>
                <div className="Prescription__container__card__days">
                  {prescription.Days.map(day => (
                    <span key={day}>{day.slice(0, 2)}</span>
                  ))}
                </div>
                <h3>Dosing times</h3>
                <ul className="Prescription__container__card__dosing">
                  {prescription.dosage_time.map(dose => 
                    this.formatTime(dose)
                  )}
                </ul>
                <div
                  className={`Prescription__container__card__menu ${
                    this.state.menuVisiblity === i ? "visible" : ""
                  }`}
                  onClick={e => e.stopPropagation()}
                >
                  <Button>
                    <img
                      src={editIcon}
                      alt={`Edit ${prescription.name} medication`}
                    />
                    Edit prescription
                  </Button>
                  <Button
                    onClick={() => this.deletePrescriptions(prescription.id)}
                  >
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
        ) : (
          !this.props.error.error ? (
            <ReactLoading type="spokes" color="#0066ff" className="loading" />
          ) : <p className="error"> No prescriptions yet </p>
        )}
        {this.state.addPrescriptionBox && (
          <AddPrescription
            closePopup={() => this.setState({ addPrescriptionBox: false })}
            addPrescription={data => this.addPrescription(data)}
            errors={this.props.error}
          />
        )}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  api_token: state.user.api_token,
  prescriptions: state.user.prescriptions,
  error: state.user.errors
});

const mapDispatchToProps = dispatch => ({
  getPrescriptions: api_token =>
    dispatch({
      type: actions.SAGA_GET_PRESCRIPTION,
      api_token
    }),
  postDeletePrescriptions: data =>
    dispatch({
      type: actions.SAGA_DELETE_PRESCRIPTIONS,
      data
    }),
  postAddPrescription: data =>
    dispatch({
      type: actions.SAGA_ADD_PRESCRIPTION,
      data
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Prescription);
