import React from "react";
import personImg from "../../assets/svg/user.svg";
import Medicine from "../../assets/images/med2.png";
import Button from "../Button";

const OrderCard = props => (
  <div className="PrescriptionCard">
    <div className="PrescriptionCard__head">
      <img src={personImg} alt="doctor" className="doctorBox__img" />
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
      </div>
    </div>

    <hr />

    <h4>Order details</h4>

    {props.medications.map((el, index) => (
      <MedicineItem key={index} medicineName={el.name} quantity={el.quantity} />
    ))}

    {props.request ? (
      <Button className="btn btn-blue orderCard__btn">
        Move to packing list
      </Button>
    ) : (
      <Button className="btn btn-blue orderCard__btn">
        Recieved by courier
      </Button>
    )}
  </div>
);

export default OrderCard;

/*************************  */

const MedicineItem = props => (
  <div className="PrescriptionItem">
    <img src={Medicine} alt="Medicine" />
    <div className="PrescriptionItem__info">
      <p>{props.medicineName}</p>
      <p>
        <span>Quantity : </span>
        <span>{props.quantity}</span>
      </p>
    </div>
  </div>
);
