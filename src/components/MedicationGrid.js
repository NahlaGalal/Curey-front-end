import React from "react";
import Medication from "../assets/images/med1.png";
import Button from "./Button";

const MedicationGrid = props => (
  <div className="medicationGrid mb-40">
    {props.medications.map((medication, i) => (
      <div className="medicationCard" key={i}>
        <img alt="medication" src={Medication} className="center" />

        <div className="medicationCard__info">
          <div className="medicationCard__info--flex">
            <h3 className="medicationCard__name">{medication.name}</h3>
            <span className="medicationCard__price">
              {medication.price} L.E.
            </span>
          </div>
          {medication.description ? (
            <div className="medicationCard__description">
              <p>{medication.description}</p>
            </div>
          ) : null}
        </div>

        <Button className="btn btn-lg btn-green center">Shop now</Button>
      </div>
    ))}
  </div>
);

export default MedicationGrid;
