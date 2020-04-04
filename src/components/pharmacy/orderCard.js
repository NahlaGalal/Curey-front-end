import React from "react";
import personImg from "../../assets/svg/user.svg";
import Medicine from "../../assets/images/med2.png";
import Button from "../Button";
import { Rate } from "../../util/rate";

const OrderCard = props => (
  <div className="PrescriptionCard">
    <div className="PrescriptionCard__head">
      <img
        src={props.image || personImg}
        alt="doctor"
        className="doctorBox__img"
      />
      <div className="doctorInfo">
        <h3 className="doctorCard__name">{props.name}</h3>
        <p>
          <img
            src={require("../../assets/svg/location.svg")}
            alt="logo"
            className="icon"
          />
          {props.address}
        </p>
        <Rate rate={5} />
        {props.date ? (
          <p>
            <img
              src={require("../../assets/svg/calendar.svg")}
              alt="logo"
              className="icon"
            />
            <span className="mr-16"> {props.day} </span>
            <img
              src={require("../../assets/svg/clock.svg")}
              alt="logo"
              className="icon"
            />
            <span> {props.hour}</span>
          </p>
        ) : null}
      </div>
    </div>

    <hr />

    <h4>Order details</h4>

    {props.medications.map((el, index) => (
      <MedicineItem
        key={index}
        medicineName={el.product}
        quantity={el.amount}
        image={el.image}
      />
    ))}

    {props.request === "request" ? (
      <Button className="btn btn-blue orderCard__btn">
        Move to packing list
      </Button>
    ) : props.request === "packing" ? (
      <Button
        className="btn btn-blue orderCard__btn"
        onClick={props.moveToDelivery}
      >
        Recieved by courier
      </Button>
    ) : null}
  </div>
);

export default OrderCard;

/*************************  */

const MedicineItem = props => (
  <div className="PrescriptionItem">
    <img src={props.image || Medicine} alt="Medicine" />
    <div className="PrescriptionItem__info">
      <p>{props.medicineName}</p>
      <p className="PrescriptionItem__info__quantity">
        <span>Quantity : </span>
        <span>{props.quantity}</span>
      </p>
    </div>
  </div>
);
