import React, { Component } from "react";
import Menu from "../../assets/svg/menu1.svg";
import Location from "../../assets/svg/location.svg";
import { Rate } from "../../util/rate";
import Calendar from "../../assets/svg/calendar.svg";
import Clock from "../../assets/svg/clock.svg";
import Button from "../Button";
import UserImg from "../../assets/svg/user.svg";
import transform from "../../assets/svg/transform.svg";
import list from "../../assets/svg/list.svg";
import DateTimePicker from "./DateTimePicker";
import DoctorPrescription from "../Pop-ups/DoctorPrescription";

class PatientCard extends Component {
  state = {
    dateTimePickerBox: false,
    prescriptionBox: false,
  };

  render() {
    return (
      <div className="PatientCard">
        <div className="PatientCard__info">
          <img
            src={this.props.image || UserImg}
            alt="patient"
            className="DoctorBookingCard__img"
          />
          <div className="PatientCard__info__text">
            <div className="flex">
              <h3 className="heading-3">{this.props.name}</h3>
              <Button className="menu-btn" onClick={this.props.toggleMenuBox}>
                <img src={Menu} alt="menu" />
              </Button>
            </div>
            <span className="PatientCard__info__address">
              <img src={Location} className="icon" alt="loactionIcon" />
              {this.props.address}
            </span>
            <Rate rate={this.props.rate} />
          </div>
        </div>
        <hr />
        <footer>
          <div className="flex">
            <span>
              <img className="icon" src={Calendar} alt="calendar icon" />
              {this.props.date}
            </span>
            <p>{this.props.home_visit === 0 ? "Booking" : "Home visit"}</p>
          </div>
          <span>
            <img className="icon" src={Clock} alt="clock icon" />
            {this.props.time}
          </span>
          {this.props.type ? (
            <Button className="btn btn-blue">Finish {this.props.type}</Button>
          ) : null}
        </footer>
        <div
          className={`PatientCard__menu ${
            this.props.menuVisibility === this.props.index ? "visible" : ""
          }`}
          onClick={this.props.stopPropagation}
        >
          <Button onClick={() => this.setState({ dateTimePickerBox: true })}>
            <img src={transform} alt="Set re-examination date" />
            Set re-examination date
          </Button>
          <Button onClick={() => this.setState({ prescriptionBox: true })}>
            <img src={list} alt="Write a prescription" />
            Write a prescription
          </Button>
        </div>
        {this.state.dateTimePickerBox && (
          <DateTimePicker
            closePopup={() => this.setState({ dateTimePickerBox: false })}
          />
        )}
        {this.state.prescriptionBox && (
          <DoctorPrescription
            closePopup={() => this.setState({ prescriptionBox: false })}
            errors={{}}
          />
        )}
      </div>
    );
  }
}

export default PatientCard;
