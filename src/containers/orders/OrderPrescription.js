import React, { Component } from "react";
import Search from "../../components/Doctors and medications/Search";
import MedicineCard from "../../components/Doctors and medications/MedicineCard";
import OrderDetails from "../../components/Pop-ups/OrderDetails";
import PharmacyIcon from "../../assets/images/roshdy.png";

const medications = [
  {
    name: "Antinal",
    price: 20,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
  },
  {
    name: "Antinal",
    price: 15,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
  },
  {
    name: "Antinal",
    price: 15.5,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
  },
  {
    name: "Antinal",
    price: 43,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
  },
  {
    name: "Antinal",
    price: 1,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
  }
];

export default class OrderPrescription extends Component {
  state = {
    orderDetailsBox: false
  };

  render() {
    const totalPrice = medications
      .map(medication => medication.price)
      .reduce((total, price) => (total += price), 0);

    return (
      <React.Fragment>
        <div className="pageHeader">
          <h2>Order prescription</h2>
        </div>
        <Search placeholder="Search pharmacy" type="doctors" />
        <div className="shoppingCartContainer">
          <div className="medicationsContainer medicationGrid">
            {medications.map((medication, i) => (
              <MedicineCard
                name={medication.name}
                price={medication.price}
                description={medication.description}
                key={i}
              />
            ))}
          </div>
          <div className="totalPriceCard">
            <h3>Total price</h3>
            <p>{totalPrice} L.E</p>
            <button
              className="btn checkout-btn"
              onClick={() => this.setState({ orderDetailsBox: true })}
            >
              Checkout
            </button>
          </div>
        </div>
        {this.state.orderDetailsBox && (
          <OrderDetails
            closePopup={() => this.setState({ orderDetailsBox: false })}
            orders={[
              {
                totalPrice,
                medications: medications.map(medication => medication.name),
                pharmacy: {
                  name: "Roshdy pharmacies",
                  logo: PharmacyIcon,
                  address: "Mansoura, Gehan St"
                }
              }
            ]}
          />
        )}
      </React.Fragment>
    );
  }
}
