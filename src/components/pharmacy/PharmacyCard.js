import React from "react";
import Button from "../Button";
import menuIcon from "../../assets/svg/menu.svg";

const PharmacyCard = props => {
  return (
    <div className="PharmacyMedCard">
      <header>
        <h3 className="heading-3">{props.medication.name}</h3>
        <Button className="menu-btn">
          <img
            src={menuIcon}
            alt={`menu button for ${props.medication.name}`}
          />
        </Button>
      </header>
      <div className="PharmacyMedCard__details">
        <p>
          <span>Medication price:</span>
          {props.medication.price}
        </p>
        <p>
          <span>Company:</span>
          {props.medication.company}
        </p>
        <p>
          <span>Generic name:</span>
          {props.medication.generic}
        </p>
        <p>
          <span>Pharmacology:</span>
          {props.medication.pharmacology}
        </p>
        <p>
          <span>Quantity:</span>
          {props.medication.amount}
        </p>
      </div>
    </div>
  );
};

export default PharmacyCard;
