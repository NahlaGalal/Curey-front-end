import React from "react";
import Order from "./order";

const ShoppingCart = () => (
  <React.Fragment>
    <div className="pageHeader">
      <h2>Shopping cart</h2>
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

export default ShoppingCart;
