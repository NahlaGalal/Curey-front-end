import React from "react";
import Medication from "../assets/images/med1.png";

const MedicationCard = props => (
  <div className="medicationCard">
    <img alt="medication" src={Medication} className="center" />

    <div className="medicationCard__info">
      <h3 className="medicationCard__name">{props.name}</h3>
      <span className="medicationCard__price">{props.price}</span>
    </div>

    <button className="btn btn-lg btn-green center">Shop now</button>
  </div>
);

export default MedicationCard;
