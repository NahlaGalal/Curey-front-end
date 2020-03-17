import React, { Component } from "react";
import MedicineCard from "../components/Doctors and medications/MedicineCard";
import Button from "../components/Button";
import PharmacyItem from "../components/PharmacyItem";
import LocationIcon from "../assets/svg/location.svg";
import ChangeAddress from "../components/Pop-ups/ChangeAddress";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import ReactLoading from "react-loading";

class MedicinePage extends Component {
  state = { hovered: false, changeAddressBox: false, productID: 82 };

  componentDidMount() {
    this.props.requestMedicineData(this.props.api_token, this.state.productID);
  }

  deleteFavouriteMedication = product_id => {
    this.props.deleteFavouriteMedication(
      {
        api_token: this.props.api_token,
        product_id
      },
      "MedicationPage"
    );
  };

  addFavouriteMedication = product_id => {
    this.props.addFavouriteMedication(
      {
        api_token: this.props.api_token,
        product_id
      },
      "MedicationPage"
    );
  };

  addToCart = (pharmacy) => {
    this.props.addToCartStorage({
      medication: this.props.medicine,
      pharmacy
    })
  }

  render() {
    return (
      <React.Fragment>
        <main className="medicinePage__contianer">
          <div className="medicinePage__contianer__medicine">
            <div className="medicine__container">
              {Object.keys(this.props.medicine).length ? (
                <MedicineCard
                  name={this.props.medicine.name}
                  price={this.props.medicine.price}
                  image={this.props.medicine.image}
                  description={this.props.medicine.description}
                  isFavourite={this.props.medicine.is_favourite}
                  onMouseMove={() => this.setState({ hovered: true })}
                  onMouseLeave={() => this.setState({ hovered: false })}
                  hovered={this.state.hovered}
                  deleteFavouriteMedication={() =>
                    this.deleteFavouriteMedication(this.props.medicine.id)
                  }
                  addFavouriteMedication={() =>
                    this.addFavouriteMedication(this.props.medicine.id)
                  }
                />
              ) : (
                <ReactLoading
                  type="spokes"
                  color="#0066ff"
                  className="loading center mb-40"
                />
              )}
            </div>

            <div className="delivery__container">
              <h3 className="heading-3">
                Delivery fees: {this.props.medicine.delivery_fees} L.E
              </h3>
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
              {Object.keys(this.props.medicine).length ? (
                this.props.pharmacies.length ? (
                  this.props.pharmacies.map((pharmacy, i) => (
                    <PharmacyItem
                      key={i}
                      name={pharmacy.name}
                      rate={pharmacy.overall_rating}
                      reviews={10}
                      address={pharmacy.address}
                      medication={{
                        name: this.props.medicine.name,
                        price: this.props.medicine.price
                      }}
                      isCart={
                        this.props.cart.find(
                          item =>
                            item.medication.name === this.props.medicine.name &&
                            item.pharmacy.name === pharmacy.name
                        )
                          ? true
                          : false
                      }
                      addToCart={() => this.addToCart(pharmacy)}
                    />
                  ))
                ) : (
                  <p className="pharmacies__container__error">
                    {" "}
                    There are no pharmacies buy this medicine near you
                  </p>
                )
              ) : (
                <ReactLoading
                  type="spokes"
                  color="#0066ff"
                  className="loading center mb-40"
                />
              )}
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
  api_token: state.user.api_token,
  medicine: state.medicationsData.medicationInfo.product,
  pharmacies: state.medicationsData.medicationInfo.pharmacies,
  cart: state.user.cart
});

const mapDispatchToProps = dispatch => ({
  requestMedicineData: (api_token, id) =>
    dispatch({ type: actions.REQUEST_MEDICATION, api_token, id }),
  deleteFavouriteMedication: (data, source) =>
    dispatch({ type: actions.SAGA_DELETE_FAVOURITE, data, source }),
  addFavouriteMedication: (data, source) =>
    dispatch({ type: actions.SAGA_ADD_FAVOURITE, data, source }),
  addToCartStorage: (data) => dispatch({ type: actions.ADD_TO_CART, data})
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicinePage);
