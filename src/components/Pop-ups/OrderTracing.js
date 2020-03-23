import React from "react";
import packingIcon from "../../assets/svg/bag.svg";
import deliveryManIcon from "../../assets/svg/delivery-man.svg";
import deliveredIcon from "../../assets/svg/like.svg";

const OrderTracing = props => {
  return (
    <section className="Popup" onClick={props.closePopup}>
      <div className="Popup__box" onClick={e => e.stopPropagation()}>
        <h2 className="heading-2">Tracing the order</h2>
        <ul className="Popup__box__tracing">
          <li className="Popup__box__tracing__item">
            <img src={packingIcon} alt="packing icon" />
            <p>Packing</p>
            <span className="Popup__box__tracing__item__circle"></span>
          </li>
          <li className="Popup__box__tracing__item">
            <img src={deliveryManIcon} alt="delivery man icon" />
            <p>Recieved by courier</p>
            <span className="Popup__box__tracing__item__circle"></span>
          </li>
          <li className="Popup__box__tracing__item">
            <img src={deliveredIcon} alt="delivered icon" />
            <p>Delivered</p>
            <span className="Popup__box__tracing__item__circle"></span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default OrderTracing;
