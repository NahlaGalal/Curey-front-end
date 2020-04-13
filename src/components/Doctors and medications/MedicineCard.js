import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

const MedicineCard = props => (
  <div
    className="medicationCard"
    onMouseMove={props.onMouseMove}
    onMouseLeave={props.onMouseLeave}
    style={{ maxWidth: "100%" }}
  >
    <div className="medicationCard__main">
      {props.hovered ? (
        <div
          className={`medicationCard__main--favourite ${
            props.isFavourite ? "fav" : "not-fav"
          }`}
          onClick={() =>
            props.isFavourite
              ? props.deleteFavouriteMedication()
              : props.addFavouriteMedication()
          }
        ></div>
      ) : null}
      <img
        alt={props.name}
        src={props.image}
        className="center medicationCard__main__medicationImg"
      />
    </div>

    <div className="medicationCard__info">
      <div className="medicationCard__info--flex">
        <h3 className="medicationCard__name">{props.name}</h3>
        <span className="medicationCard__price">{props.price} L.E.</span>
      </div>
      {props.description ? (
        <div className="medicationCard__description" title={props.description}>
          <p>{props.description}</p>
        </div>
      ) : null}
    </div>
    {props.link ? (
      <Link to={`/medicine/${props.id}`}>
        <Button className="btn btn-lg btn-green center">Shop now</Button>
      </Link>
    ) : null}
  </div>
);

export default MedicineCard;
