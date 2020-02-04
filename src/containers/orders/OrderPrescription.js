import React, { Component } from "react";
import Search from "../../components/Doctors and medications/Search";
import MedicineCard from "../../components/Doctors and medications/MedicineCard";

export default class OrderPrescription extends Component {
  render() {
    return (
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
            <MedicineCard
              name="Antinal"
              price={15}
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
            <MedicineCard
              name="Antinal"
              price={15}
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
            <MedicineCard
              name="Antinal"
              price={15}
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
            <MedicineCard
              name="Antinal"
              price={15}
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
            />
            <MedicineCard
              name="Antinal"
              price={15}
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
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
