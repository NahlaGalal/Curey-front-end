import React, { Component } from "react";
import MedicineCard from "../components/Doctors and medications/MedicineCard";
import Button from "../components/Button";
import PharmacyItem from "../components/PharmacyItem";
import LocationIcon from "../assets/svg/location.svg";
import ChangeAddress from "../components/Pop-ups/ChangeAddress";
import { connect } from "react-redux";
import * as actions from "../actions/types";

const medicine = {
  name: "Antinal",
  price: 12,
  isFavourite: false,
  description:
    "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis",
  hovered: false,
  pharmacies: [
    {
      name: "Roshdy pharmacies",
      rate: 4,
      reviews: 12,
      address: "Mansoura City, Gehan St"
    },
    {
      name: "Roshdy pharmacies",
      rate: 4,
      reviews: 12,
      address: "Mansoura City, Gehan St"
    },
    {
      name: "Roshdy pharmacies",
      rate: 4,
      reviews: 12,
      address: "Mansoura City, Gehan St"
    },
    {
      name: "Roshdy pharmacies",
      rate: 4,
      reviews: 12,
      address: "Mansoura City, Gehan St"
    },
    {
      name: "Roshdy pharmacies",
      rate: 4,
      reviews: 12,
      address: "Mansoura City, Gehan St"
    },
    {
      name: "Roshdy pharmacies",
      rate: 4,
      reviews: 12,
      address: "Mansoura City, Gehan St"
    },
    {
      name: "Roshdy pharmacies",
      rate: 4,
      reviews: 12,
      address: "Mansoura City, Gehan St"
    },
    {
      name: "Roshdy pharmacies",
      rate: 4,
      reviews: 12,
      address: "Mansoura City, Gehan St"
    }
  ]
};

class MedicinePage extends Component {
  state = { hovered: false, changeAddressBox: false, productID: 50 };

  componentDidMount() {
    this.props.requestMedicineData(this.props.api_token, this.state.productID);
  }

  render() {
    return (
      <React.Fragment>
        <main className="medicinePage__contianer">
          <div className="medicinePage__contianer__medicine">
            <div className="medicine__container">
              <MedicineCard
                name={medicine.name}
                price={medicine.price}
                description={medicine.description}
                isFavourite={medicine.isFavourite}
                onMouseMove={() => this.setState({ hovered: true })}
                onMouseLeave={() => this.setState({ hovered: false })}
                hovered={this.state.hovered}
              />
            </div>

            <div className="delivery__container">
              <h3 className="heading-3">Delivery fees: 10 L.E</h3>
              <p className="delivery__container__text">
                Delivery fees are set based on the following address, and this
                is the address that the medication will be delivered to
              </p>
              <span>
                <img src={LocationIcon} alt="location-icon" /> Mansoura City,
                Gehan St
              </span>
              <Button
                className="btn btn-green-dark btn-lg delivery__container__btn"
                onClick={() => this.setState({ changeAddressBox: true })}
              >
                Change address
              </Button>
            </div>
          </div>
          <div className="medicinePage__contianer__pharmacy">
            <div className="pharmacies__container">
              <h2 className="heading-2">Pharmacies list</h2>
              {medicine.pharmacies.map((pharmacy, i) => (
                <PharmacyItem
                  key={i}
                  name={pharmacy.name}
                  rate={pharmacy.rate}
                  reviews={pharmacy.reviews}
                  address={pharmacy.address}
                  medication={{
                    name: medicine.name,
                    price: medicine.price
                  }}
                />
              ))}
            </div>
          </div>
          {this.state.changeAddressBox && (
            <ChangeAddress
              closePopup={() => this.setState({ changeAddressBox: false })}
            />
          )}
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  api_token: state.user.api_token
});

const mapDispatchToProps = dispatch => ({
  requestMedicineData: (api_token, id) =>
    dispatch({ type: actions.REQUEST_MEDICATION, api_token, id })
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicinePage);
