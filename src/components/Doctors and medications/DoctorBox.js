import React from "react";
import DoctorImg from "../../assets/images/doctor1.png";
import LocationIcon from "../../assets/svg/location.svg";

const DoctorBox = props => (
  <div className="doctorBox">
    <div>
      <img src={DoctorImg} alt="doctor" className="doctorBox__img" />
    </div>
    <div>
      <h3 className="doctorCard__name">{props.name}</h3>
      <p>{props.speciality}</p>
      <p>
        <img alt="location icon" src={LocationIcon} />
        {props.address}
      </p>
      <span className="doctorBox__price">{props.price} L.E</span>
    </div>
  </div>
);

export default DoctorBox;
