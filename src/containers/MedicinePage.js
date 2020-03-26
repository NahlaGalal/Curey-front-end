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
  state = { hovered: false, changeAddressBox: false };

  componentDidMount() {
    this.props.requestMedicineData(
      this.props.api_token,
      this.props.match.params.id
    );
    this.props.showCart(this.props.api_token);
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

  addToCart = product_pharmacy_id => {
    this.props.addToCart(this.props.api_token, {
      id: product_pharmacy_id,
      amount: 1
    });
  };

  submitOrder = pharmacy => {
    this.props.submitMedicineOrder(
      this.props.api_token,
      [{ id: pharmacy.product_pharmacy_id, amount: 1 }],
      {
        order: 1,
        medicationName: this.props.medicine.name,
        pharmacy: pharmacy.name,
        medicationImage:
          this.props.medicine.image || require("../assets/images/med1.png")
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        {Object.keys(this.props.medicine).length ? (
          <main className="medicinePage__contianer">
            <div className="medicinePage__contianer__medicine">
              <div className="medicine__container medicine__page">
                <MedicineCard
                  id={this.props.medicine.id}
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
                              item.pharmacy.product_pharmacy_id === pharmacy.product_pharmacy_id
                          )
                            ? true
                            : false
                        }
                        addToCart={() => this.addToCart(pharmacy.product_pharmacy_id)}
                        onSubmit={() => this.submitOrder(pharmacy)}
                      />
                    ))
                  ) : (
                    <p className="pharmacies__container__error">
                      {" "}
                      There are no pharmacies buy this medicine near you
                    </p>
                  )
                ) : null}
              </div>
            </div>
            {this.state.changeAddressBox && (
              <ChangeAddress
                closePopup={() => this.setState({ changeAddressBox: false })}
              />
            )}
          </main>
        ) : (
          <ReactLoading
            type="spokes"
            color="#0066ff"
            className="loading loading-doctor-profile"
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  api_token: state.user.api_token,
  medicine: state.medicationsData.medicationInfo.product,
  pharmacies: state.medicationsData.medicationInfo.pharmacies,
  cart: state.user.cart || [],
  productId: state.medicationsData.medicationInfo.pharmacies.product_pharmacy_id
});

const mapDispatchToProps = dispatch => ({
  requestMedicineData: (api_token, id) =>
    dispatch({ type: actions.REQUEST_MEDICATION, api_token, id }),
  deleteFavouriteMedication: (data, source) =>
    dispatch({ type: actions.SAGA_DELETE_FAVOURITE, data, source }),
  addFavouriteMedication: (data, source) =>
    dispatch({ type: actions.SAGA_ADD_FAVOURITE, data, source }),
  addToCart: (api_token, product) => dispatch({ type: actions.SAGA_ADD_TO_CART, api_token, product }),
  submitMedicineOrder: (api_token, data, notificationData) =>
    dispatch({
      type: actions.SUBMIT_MEDICATION_ORDER,
      api_token,
      data,
      notificationData
    }),
  showCart: api_token => dispatch({ type: actions.SAGA_SHOW_CART, api_token })
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicinePage);
