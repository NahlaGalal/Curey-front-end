import React, { Component } from "react";
import MedicineCard from "../../components/Doctors and medications/MedicineCard";
import OrderDetails from "../../components/Pop-ups/OrderDetails";
import PharmacyIcon from "../../assets/images/roshdy.png";
import SelectBox from "../../components/SelectBox";
import Button from "../../components/Button";

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

const pharmacies = [
  "Roshdy Pharmacy",
  "Dawaee pharmacies",
  "Misr pharmacies",
  "Gardenia pharmacies",
  "AlShafi pharmacies"
];

export default class OrderPrescription extends Component {
  state = {
    orderDetailsBox: false,
    pharmacy: "",
    pharmaciesBoxObened: false
  };

  pharmaciesContainerRef = React.createRef();

  toggleCitySelectBox = () => {
    const prev = this.state.pharmaciesBoxObened;
    let pharmacy = "";
    if (prev) {
      const inputChecked = Array.from(
        this.pharmaciesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter(input => input.checked)[0];
      pharmacy = inputChecked ? inputChecked.value : "";
    }
    this.setState({
      pharmaciesBoxObened: !prev,
      pharmacy
    });
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
        <div className="search-pharmacy">
          <SelectBox
            name="city_id"
            onClick={this.toggleCitySelectBox}
            className={`${this.state.pharmacy ? "hasValue" : null}`}
            listChecked={this.state.pharmacy ? [this.state.pharmacy] : []}
            header="Search Pharmacy"
            boxOpened={this.state.pharmaciesBoxObened}
            list={pharmacies}
            optionsContainerRef={this.pharmaciesContainerRef}
            multiSelect={false}
          />
          <Button className="btn btn-transparent btn-search">Search map</Button>
        </div>
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
              disabled={!this.state.pharmacy ? true : false}
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
                  name: this.state.pharmacy,
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
