import React from "react";
import PopupFooter from "./PopupFooter";
import LocationIcon from "../../assets/svg/location.svg";

const OrderDetails = props => {
  return (
    <section className="Popup">
      <div className="Popup__box">
        <h2 className="heading-2">Order invoice details</h2>
        {props.orders.map((order, i) => {
          const { medications, pharmacy, totalPrice } = order;
          return (
            <React.Fragment key={i}>
              <div className="Popup__box__details">
                <div className="Popup__box__details__header">
                  <img src={pharmacy.logo} alt={`${pharmacy.name} logo`} />
                  <div>
                    <p>{pharmacy.name}</p>
                    <p className="fades">
                      <img
                        src={LocationIcon}
                        alt="location icon"
                        className="icon"
                      />
                      {pharmacy.address}
                    </p>
                  </div>
                  <p>{totalPrice} L.E</p>
                </div>
                <div className="Popup__box__details__content">
                  <h4 className="heading-4">Medications</h4>
                  <ul>
                    {medications.map((medication, i) => (
                      <li className="fades" key={i}>
                        {medication}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {props.orders.length !== i + 1 && <hr />}
            </React.Fragment>
          );
        })}
        <PopupFooter closePopup={props.closePopup} applyText="Confirm" />
      </div>
    </section>
  );
};

export default OrderDetails;
