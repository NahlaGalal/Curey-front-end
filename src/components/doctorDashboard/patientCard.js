import React from "react";
import Menu from "../../assets/svg/menu1.svg";
import Location from "../../assets/svg/location.svg";
import { Rate } from "../../util/rate";
import Calendar from "../../assets/svg/calendar.svg";
import Clock from "../../assets/svg/clock.svg";
import Button from "../Button";
import UserImg from "../../assets/svg/user.svg";

const PatientCard = props => (
  <div className="PatientCard">
    <div className="PatientCard__info">
      <img
        src={props.image || UserImg}
        alt="patient"
        className="DoctorBookingCard__img"
      />
      <div className="PatientCard__info__text">
        <div className="flex">
          <h3 className="heading-3">{props.name}</h3>
          <Button className="menu-btn">
            <img src={Menu} alt="menu" />
          </Button>
        </div>
        <span className="PatientCard__info__address">
          <img src={Location} className="icon" alt="loactionIcon" />
          {props.address}
        </span>
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
      {props.reExamination ? (
        <Button className="btn btn-blue">Finish re-examination</Button>
      ) : (
        <Button className="btn btn-blue">Finish examination</Button>
      )}
    </footer>
  </div>
);

export default PatientCard;
