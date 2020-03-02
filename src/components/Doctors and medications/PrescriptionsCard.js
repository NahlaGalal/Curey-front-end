import React from "react";
import DoctorImg from "../../assets/images/doctor1.png";
import LocationIcon from "../../assets/svg/location.svg";
import Medicine from "../../assets/images/med2.png";
import ClockIcon from "../../assets/svg/clock.svg";

const PrescriptionCard = props => (
  <div className="PrescriptionCard">
    <div className="PrescriptionCard__head">
      <img src={DoctorImg} alt="doctor" className="doctorBox__img" />
      <div className="doctorInfo">
        <h3 className="doctorCard__name">{props.name}</h3>
        <p>{props.speciality}</p>
        <p>
          <img src={LocationIcon} alt="location icon" className="icon" />
          {props.address}
        </p>
      </div>
    </div>

    <hr />

    <h4>Prescription details</h4>

    {props.medications.map((el, index) => (
      <PrescriptionItem
        key={index}
        medicineName={el.name}
        times={el.times}
        period={el.period}
      />
    ))}
  </div>
);

export default PrescriptionCard;

/*************************  */

const PrescriptionItem = props => (
  <div className="PrescriptionItem">
    <img src={Medicine} alt="Medicine" />
    <div className="PrescriptionItem__info">
      <p>{props.medicineName}</p>
      <p>
        <img src={ClockIcon} alt="clock icon" className="icon" />
        <span>{props.times}</span> times every <span>{props.period}</span>
      </p>
    </div>
  </div>
);
