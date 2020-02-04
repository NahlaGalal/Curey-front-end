import React from "react";
import { Link } from "react-router-dom";
import Medication from "../../assets/images/med1.png";
import Button from "../Button";
import Favourite from "../../assets/svg/favourite.svg";

const MedicationGrid = props => (
  <div className="medicationGrid mb-40">
    {props.medications.map((medication, i) => (
      <div className="medicationCard" key={i}>
        <div className="medicationCard__main">
          {medication.isFavourite ? (
            <img
              src={Favourite}
              alt={`${medication.name} is favourite`}
              className="medicationCard__main--favourite"
            />
          ) : null}
          <img
            alt={medication.name}
            src={Medication}
            className="center medicationCard__main__medicationImg"
          />
        </div>

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

        <Link to="/medicine/1">
          <Button className="btn btn-lg btn-green center">Shop now</Button>
        </Link>
      </div>
    ))}
  </div>
);

export default MedicationGrid;
