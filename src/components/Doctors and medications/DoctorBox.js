import React from "react";
import LocationIcon from "../../assets/svg/location.svg";
import DefaultImg from "../../assets/images/doctor.png";

const DoctorBox = (props) => (
  <div className="doctorBox">
    <div>
      <img
        src={props.image}
        alt="doctor"
        className="doctorBox__img"
        onError={(e) => (e.currentTarget.src = DefaultImg)}
      />
    </div>
    <div>
      <h3 className="doctorCard__name">{props.name}</h3>
      <p>{props.speciality}</p>
      <p className="doctorBox__address" title={props.address}>
        <img alt="location icon" src={LocationIcon} />
        {props.address}
      </p>
      <span className="doctorBox__price">{props.price} L.E</span>
    </div>
  </div>
);

export default DoctorBox;
