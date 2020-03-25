import React from "react";
import UserImg from "../../assets/svg/user.svg";
import LocationIcon from "../../assets/svg/location.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import ClockIcon from "../../assets/svg/clock.svg";

const DoctorBookingCard = props => {
  const dateTime = new Date(props.date);
  const date = `${dateTime.toString().split(" ")[1]} ${dateTime.getDate()}, ${dateTime.getFullYear()}`;
  const time = new Date(dateTime).toLocaleTimeString();

  return(
  <div className="DoctorBookingCard">
    <div className="DoctorBookingCard__info">
      <img alt="doctor" src={props.image || UserImg} className="DoctorBookingCard__img" />
      <div className="DoctorBookingCard__info__text">
        <div className="flex">
          <h3 className="heading-3">{props.name}</h3>
          <span className="doctorCard__price">{props.price} L.E</span>
        </div>

        <p>{props.speciality}</p>
        <p className="DoctorBookingCard__info__address" title={props.address}>
          <img alt="location icon" src={LocationIcon} /> {props.address}
        </p>
      </div>
    </div>
    <hr />
    <footer>
      <div className="flex">
        <p>
          <img src={CalendarIcon} alt="Calendar Icon" className="icon" />
          {date}
        </p>
        <span>{props.status}</span>
      </div>
      <p>
        <img src={ClockIcon} alt="Clock Icon" className="icon" />
        {time}
      </p>
    </footer>
  </div>
)};

export default DoctorBookingCard;
