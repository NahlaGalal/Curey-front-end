import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Rate } from "../util/rate";
import Logo from "../assets/images/roshdy.png";
import LocationIcon from "../assets/svg/location.svg";
import Button from "../components/Button";
import OrderMedication from "./Pop-ups/OrderMedication";

class PharmacyItem extends Component {
  state = {
    orderMedicationBox: false,
    addedToCart: false
  };

  addToCart = e => {
    this.setState({ addedToCart: !this.state.addedToCart });
  };

  // submitOrder = e => {
  //   this.setState({ orderMedicationBox: false });
  // };

  render() {
    return (
      <Fragment>
        <div className="pharmacy">
          <div className="pharmacy__logo">
            <img src={Logo} alt={this.props.name} />
          </div>
          <div className="pharmacy__info">
            <div className="pharmacy__name">
              <h4 className="heading-4">{this.props.name}</h4>
              <Rate rate={this.props.rate} />
            </div>
            <div className="pharmacy__address">
              <span>
                <img src={LocationIcon} alt="location-icon" />{" "}
                {this.props.address}
              </span>
              <span>{this.props.reviews + " reviews"}</span>
            </div>
            <div className="pharmacy__buttons">
              <Button
                className="btn btn-green-dark btn-xs mr-16"
                onClick={() => this.setState({ orderMedicationBox: true })}
              >
                Order
              </Button>
              <Button
                className={`btn btn-dark btn-xs ${!this.state.addedToCart &&
                  "visible"}`}
                onClick={this.addToCart}
              >
                Add to cart
              </Button>
              <Link to="/shoppingcart">
                <Button
                  className={`btn btn-dark btn-xs btn-cart ${this.state
                    .addedToCart && "visible"}`}
                  onClick={this.addToCart}
                >
                  Go to cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {this.state.orderMedicationBox && (
          <OrderMedication
            closePopup={() => {
              this.setState({ orderMedicationBox: false });
              this.props.onsubmit();
            }}
            medication={this.props.medication}
            pharmacy={{ name: this.props.name, address: this.props.address }}
          />
        )}
      </Fragment>
    );
  }
}

export default PharmacyItem;

// TODO: Add to cart ==> Send to shopping cart ==> and show box for confirmation
