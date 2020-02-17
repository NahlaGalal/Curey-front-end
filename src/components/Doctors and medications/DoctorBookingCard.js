import React from "react";
import DoctorImg from "../../assets/images/doctor1.png";
import LocationIcon from "../../assets/svg/location.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import ClockIcon from "../../assets/svg/clock.svg";

const DoctorBookingCard = props => (
  <div className="DoctorBookingCard">
    <div className="DoctorBookingCard__info">
      <img alt="doctor" src={DoctorImg} className="DoctorBookingCard__img" />
      <div className="DoctorBookingCard__info__text">
        <div className="flex">
          <h3 className="heading-3">{props.name}</h3>
          <span className="doctorCard__price">{props.price} L.E</span>
        </div>

        <p>{props.speciality}</p>
        <p>
          <img alt="location icon" src={LocationIcon} /> {props.address}
        </p>
      </div>
    </div>
    <hr />
    <div className="flex">
      <p>
        <img src={CalendarIcon} alt="Calendar Icon" className="icon" />
        {props.date}
      </p>
      <span>{props.status}</span>
    </div>
    <p>
      <img src={ClockIcon} alt="Clock Icon" className="icon" />
      {props.time}
    </p>
  </div>
);

export default DoctorBookingCard;
