import React from "react";
import LocationIcon from "../../assets/svg/location.svg";
import ClockIcon from "../../assets/svg/clock.svg";

const DoctoPrescriptionCard = (props) => (
  <div className="PrescriptionCard">
    <div className="PrescriptionCard__head">
      <img src={props.image} alt="doctor" className="doctorBox__img doctor-prescription-img"/>
      <div className="doctorInfo">
        <h3 className="doctorCard__name">{props.name}</h3>
        <p className="doctorInfo__address" style={{marginBottom: 0}}>
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
        times={el.dosage}
        period={el.period || "day"}
      />
    ))}
  </div>
);

export default DoctoPrescriptionCard;

/*************************  */

const PrescriptionItem = (props) => (
  <div className="PrescriptionItem">
    <img src={props.image} alt="Medicine" />
    <div className="PrescriptionItem__info">
      <p>{props.medicineName}</p>
      <p>
        <img src={ClockIcon} alt="clock icon" className="icon" />
        <span>{props.times}</span> times every <span>{props.period}</span>
      </p>
    </div>
  </div>
);
