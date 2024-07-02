import React from "react";
import LocationIcon from "../../assets/svg/location.svg";
import ClockIcon from "../../assets/svg/clock.svg";
import doctor from "../../assets/images/doctor1.png";
import med from "../../assets/images/med2.png";
import DefaultDoctorImg from "../../assets/images/doctor.png";
import DefaultProductImg from "../../assets/images/product.png";

const PrescriptionCard = (props) => (
  <div className="PrescriptionCard">
    <div className="PrescriptionCard__head">
      <img
        src={props.image || doctor}
        alt="doctor"
        className="doctorBox__img"
        onError={(e) => (e.currentTarget.src = DefaultDoctorImg)}
      />
      <div className="doctorInfo">
        <h3 className="doctorCard__name">{props.name}</h3>
        <p>{props.speciality}</p>
        <p className="doctorInfo__address">
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
        image={el.image}
        times={el.times}
        period={el.period}
      />
    ))}
  </div>
);

export default PrescriptionCard;

/*************************  */

const PrescriptionItem = (props) => (
  <div className="PrescriptionItem">
    <img
      src={props.image || med}
      alt="Medicine"
      onError={(e) => (e.currentTarget.src = DefaultProductImg)}
    />
    <div className="PrescriptionItem__info">
      <p>{props.medicineName}</p>
      <p>
        <img src={ClockIcon} alt="clock icon" className="icon" />
        <span>{props.times}</span> times every <span>{props.period}</span>
      </p>
    </div>
  </div>
);
