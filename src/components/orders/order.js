import React from "react";
import MedicineSrc from "../../assets/images/med1.png";
import PharmacySrc from "../../assets/images/roshdy.png";
import LocationIcon from "../../assets/svg/location.svg";

const Order = props => (
  <div className="medicationCard order">
    <img
      src={MedicineSrc}
      className="medicationCard__main__medicationImg center"
      alt="medicine"
    />

    <div className="medicationCard__info">
      <div className="medicationCard__info--flex">
        <h3 className="medicationCard__name">{props.name}</h3>
        <span className="medicationCard__price">{props.price} L.E.</span>
      </div>
    </div>

    <div className="medicationCard__pharmacy">
      <img src={PharmacySrc} alt="Pharmacy logo" />
      <div className="medicationCard__pharmacy--pharmacyInfo">
        <p>{props.pharmacy}</p>
        <span>
          <img src={LocationIcon} alt="location-icon" />
          {props.address}
        </span>
      </div>
    </div>
  </div>
);

export default Order;
