import React from "react";
import Order from "./order";
import Search from "../Doctors and medications/Search";

const OrderPrescription = () => (
  <React.Fragment>
    <div className="pageHeader">
      <h2>Order prescription</h2>
    </div>
    <Search
      placeholder="Search pharmacy"
      type="doctors"

      //openFilterBox={this.openFilterBox}
    />
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

export default OrderPrescription;
