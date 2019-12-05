import React from "react";
import Doctor from "../assets/images/doctor1.png";
import Star from "../assets/svg/heart.svg";

const DoctorCard = props => (
  <div className="doctorCard">
    <img alt="doctor" src={Doctor} />

    <div className="doctorCard__info">
      <h3 className="doctorCard__name">{props.name}</h3>
      <span className="doctorCard__price">{props.price}</span>
    </div>
    <p className="doctorCard__speciality">{props.speciality}</p>
    <div className="doctorCard__rate">
      <img src={Star} alt="star" className="doctorCard__star" />
      <img src={Star} alt="star" className="doctorCard__star" />
      <img src={Star} alt="star" className="doctorCard__star" />
      <img src={Star} alt="star" className="doctorCard__star" />
      <img src={Star} alt="star" className="doctorCard__star" />
      <span>5.00</span>
    </div>
    <button className="btn btn-lg btn-green">choose</button>
  </div>
);

export default DoctorCard;
