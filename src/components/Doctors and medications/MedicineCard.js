import React from "react";
import Favourite from "../../assets/svg/favourite.svg";
import Med from "../../assets/images/med1.png";

const MedicineCard = props => (
  <div className="medicationCard">
    <div className="medicationCard__main">
      {props.isFavourite ? (
        <img
          src={Favourite}
          alt={`${props.name} is favourite`}
          className="medicationCard__main--favourite"
        />
      ) : null}
      <img
        alt={props.name}
        src={Med}
        className="center medicationCard__main__medicationImg"
      />
    </div>

    <div className="medicationCard__info">
      <div className="medicationCard__info--flex">
        <h3 className="medicationCard__name">{props.name}</h3>
        <span className="medicationCard__price">{props.price} L.E.</span>
      </div>
      {props.description ? (
        <div className="medicationCard__description">
          <p>{props.description}</p>
        </div>
      ) : null}
    </div>
  </div>
);

export default MedicineCard;
