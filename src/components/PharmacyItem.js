import React from "react";
import { Rate } from "../util/rate";
import Logo from "../assets/images/roshdy.png";
import LocationIcon from "../assets/svg/location.svg";
import Button from "../components/Button";

const PharmacyItem = props => (
  <div className="pharmacy">
    <div className="pharmacy__logo">
      <img src={Logo} alt={props.name} />
    </div>
    <div className="pharmacy__info">
      <div className="pharmacy__name">
        <h4 className="heading-4">{props.name}</h4>
        <Rate rate={props.rate} />
      </div>
      <div className="pharmacy__address">
        <span>
          <img src={LocationIcon} alt="location-icon" /> {props.address}
        </span>
        <span>{props.reviews + " reviews"}</span>
      </div>
      <div className="pharmacy__buttons">
        <Button className="btn btn-green-dark btn-xs mr-16">Order</Button>
        <Button className="btn btn-dark btn-xs">Add to cart</Button>
      </div>
    </div>
  </div>
);

export default PharmacyItem;
