import React from "react";
import LocationIcon from "../assets/svg/location.svg";
import CloseIcon from "../assets/svg/close.svg";
import DefaultPharmacyImg from "../assets/images/pharmacy.png";
import DefaultProductImg from "../assets/images/product.png";

const Order = (props) => (
  <div className="medicationCard order">
    <img
      src={props.image}
      className="medicationCard__main__medicationImg center"
      alt="medicine"
      onError={(e) => (e.currentTarget.src = DefaultProductImg)}
    />

    <div className="medicationCard__close" onClick={props.remove}>
      <img src={CloseIcon} alt="close" />
    </div>

    <div className="medicationCard__info">
      <div className="medicationCard__info--flex">
        <h3 className="medicationCard__name">{props.name}</h3>
        <span className="medicationCard__price">{props.price} L.E.</span>
      </div>
    </div>

    <div className="medicationCard__pharmacy">
      <img
        src={props.phImage}
        alt="Pharmacy logo"
        className="medicationCard__pharmacy__logo"
        onError={(e) => (e.currentTarget.src = DefaultPharmacyImg)}
      />
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
