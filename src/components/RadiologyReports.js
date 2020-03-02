import React from "react";
import RadiologyImg from "../assets/images/radiology-1.png";
import CalendarIcon from "../assets/svg/calendar.svg";

const RadiologyReports = () => (
  <div className="RadiologyReports">
    <button className="btn btn-green-dark btn-lg mb-40">
      Upload Radiology
    </button>
    <div className="RadiologyGrid">
      <RadiologyCard type="Chest x-ray" date="JAN 23, 2020" />
      <RadiologyCard type="Shoulder x-ray" date="JAN 23, 2020" />
      <RadiologyCard type="Chest x-ray" date="FEB 03, 2020" />
      <RadiologyCard type="Foot x-ray" date="MARCH 13, 2020" />
      <RadiologyCard type="Shoulder x-ray" date="JAN 23, 2020" />
      <RadiologyCard type="Shoulder x-ray" date="JAN 23, 2020" />
      <RadiologyCard type="Shoulder x-ray" date="JAN 23, 2020" />
      <RadiologyCard type="Shoulder x-ray" date="JAN 23, 2020" />
      <RadiologyCard type="Shoulder x-ray" date="JAN 23, 2020" />
    </div>
  </div>
);

export default RadiologyReports;

const RadiologyCard = props => (
  <div className="RadiologyCard">
    <img src={RadiologyImg} alt="Radiology" className="RadiologyCard__img" />
    <h3 className="heading-3">{props.type}</h3>
    <p>
      <img src={CalendarIcon} alt="calendar" className="icon" />
      {props.date}
    </p>
  </div>
);
