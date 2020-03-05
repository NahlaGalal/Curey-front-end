import React, { Component } from "react";
import Order from "../../components/order";
import Button from "../../components/Button";
import OrderDetails from "../../components/Pop-ups/OrderDetails";
import PharmacyIcon from "../../assets/images/roshdy.png";

const medications = [
  {
    name: "Antinal",
    price: 20,
    pharmacyName: "Roshdy pharmacy",
    pharmacyAddress: "Mansoura, Gehan St"
  },
  {
    name: "Antinal",
    price: 15,
    pharmacyName: "Roshdy pharmacy",
    pharmacyAddress: "Mansoura, Gehan St"
  },
  {
    name: "Antinal",
    price: 15.5,
    pharmacyName: "Roshdy pharmacy",
    pharmacyAddress: "Mansoura, Gehan St"
  },
  {
    name: "Antinal",
    price: 123,
    pharmacyName: "Roshdy pharmacy",
    pharmacyAddress: "Mansoura, Gehan St"
  },
  {
    name: "Antinal",
    price: 1,
    pharmacyName: "Roshdy pharmacy",
    pharmacyAddress: "Mansoura, Gehan St"
  }
];

export default class ShoppingCart extends Component {
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
          <h2 className="heading-2">Shopping cart</h2>
        </div>
        <div className="shoppingCartContainer">
          <div className="medicationsContainer medicationGrid">
            {medications.map((medication, i) => (
              <Order
                key={i}
                name={medication.name}
                price={medication.price}
                pharmacy={medication.pharmacyName}
                address={medication.pharmacyAddress}
              />
            ))}
          </div>
          <div className="totalPriceCard">
            <h3>Total price</h3>
            <p>{totalPrice} L.E</p>
            <Button className="btn checkout-btn" onClick={() => this.setState({orderDetailsBox: true})}>Checkout</Button>
          </div>
        </div>
        {this.state.orderDetailsBox && (
          <OrderDetails
            closePopup={() => this.setState({ orderDetailsBox: false })}
            orders={
              [
                {
                  totalPrice,
                  medications: medications.map(medication => medication.name),
                  pharmacy: {
                    name: "Roshdy pharmacies",
                    logo: PharmacyIcon,
                    address: "Mansoura, Gehan St"
                  }
                },
                {
                  totalPrice,
                  medications: medications.map(medication => medication.name),
                  pharmacy: {
                    name: "Roshdy pharmacies",
                    logo: PharmacyIcon,
                    address: "Mansoura, Gehan St"
                  }
                }
              ]
            }
          />
        )}
      </React.Fragment>
    );
  }
}
