import React, { Component } from "react";
import Order from "../../components/order";

export default class ShoppingCart extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="pageHeader">
          <h2 className="heading-2">Shopping cart</h2>
        </div>
        <div className="shoppingCartContainer">
          <div className="medicationsContainer medicationGrid">
            <Order
              name="Antinal"
              price={15}
              pharmacy="Roshdy pharmacy"
              address="Mansoura, Gehan St"
            />
            <Order
              name="Antinal"
              price={15}
              pharmacy="Roshdy pharmacy"
              address="Mansoura, Gehan St"
            />
            <Order
              name="Antinal"
              price={15}
              pharmacy="Roshdy pharmacy"
              address="Mansoura, Gehan St"
            />
            <Order
              name="Antinal"
              price={15}
              pharmacy="Roshdy pharmacy"
              address="Mansoura, Gehan St"
            />
            <Order
              name="Antinal"
              price={15}
              pharmacy="Roshdy pharmacy"
              address="Mansoura, Gehan St"
            />
          </div>
          <div className="totalPriceCard">
            <h3>Total price</h3>
            <p>196.50 L.E</p>
            <button className="btn checkout-btn">Checkout</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
