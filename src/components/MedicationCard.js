import React from "react";
import Medication from "../assets/images/med1.png";
import Button from "./Button";

const MedicationCard = props => (
  <div className="medicationCard">
    <img alt="medication" src={Medication} className="center" />

    <div className="medicationCard__info">
      <h3 className="medicationCard__name">{props.name}</h3>
      <span className="medicationCard__price">{props.price}</span>
    </div>

    <Button className="btn btn-lg btn-green center">Shop now</Button>
  </div>
);

export default MedicationCard;