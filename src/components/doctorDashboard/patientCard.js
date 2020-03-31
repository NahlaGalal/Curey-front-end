import React from "react";
import Patient from "../../assets/images/Hassan.png";
import Menu from "../../assets/svg/menu1.svg";
import Location from "../../assets/svg/location.svg";
import { Rate } from "../../util/rate";
import Calendar from "../../assets/svg/calendar.svg";
import Clock from "../../assets/svg/clock.svg";
import Button from "../Button";

const PatientCard = props => (
  <div className="PatientCard">
    <div className="PatientCard__info">
      <img src={Patient} alt="patient" className="DoctorBookingCard__img" />
      <div className="PatientCard__info__text">
        <h3 class="heading-3">{props.name}</h3>
        <img src={Menu} alt="menu" className="PatientCard__menu" />
        <img src={Location} className="icon" alt="loactionIcon" />
        <span>{props.address}</span>
        <Rate rate={props.rate} />
      </div>
    </div>
    <hr />
    <footer>
      <div className="flex">
        <span>
          <img className="icon" src={Calendar} alt="calendar icon" />
          {props.date}
        </span>
        <p>{props.state}</p>
      </div>
      <span>
        <img className="icon" src={Clock} alt="clock icon" />
        {props.time}
      </span>
      <Button className="btn btn-blue">Finish re-examination</Button>
    </footer>
  </div>
);

export default PatientCard;
