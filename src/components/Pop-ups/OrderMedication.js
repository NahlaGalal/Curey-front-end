import React from "react";
import PopupFooter from "./PopupFooter";

const OrderMedication = props => {
  return (
    <section className="Popup">
      <div className="Popup__box">
        <h2 className="heading-2">Order invoice details</h2>
        <div className="Popup__box__details">
          <p className="Popup__box__details__medication">
            <span className="semi-bold">Medication name:</span>
            {props.medication.name}
          </p>
          <p className="Popup__box__details__medication">
            <span className="semi-bold">Total Price:</span>
            {props.medication.price}
          </p>
          <p className="Popup__box__details__medication">
            <span className="semi-bold">Pharmacy name:</span>{" "}
            {props.pharmacy.name}
          </p>
          <p className="Popup__box__details__medication">
            <span className="semi-bold">Pharmacyaddress: </span>{" "}
            {props.pharmacy.address}
          </p>
        </div>
        <PopupFooter
          closePopup={props.closePopup}
          applyText="Confirm"
        />
      </div>
    </section>
  );
};

export default OrderMedication;

//TODO: Confirm ==> Send to pending orders ==> and show box for confirmation