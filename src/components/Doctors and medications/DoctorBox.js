import React from "react";
import LocationIcon from "../../assets/svg/location.svg";
import UserImg from "../../assets/svg/user.svg";

const DoctorBox = props => (
  <div className="doctorBox">
    <div>
      <img src={props.image || UserImg} alt="doctor" className="doctorBox__img" />
    </div>
    <div>
      <h3 className="doctorCard__name">{props.name}</h3>
      <p>{props.speciality}</p>
      <p className="doctorBox__address">
        <img alt="location icon" src={LocationIcon} />
        {props.address}
      </p>
      <span className="doctorBox__price">{props.price} L.E</span>
    </div>
  </div>
);

export default DoctorBox;
