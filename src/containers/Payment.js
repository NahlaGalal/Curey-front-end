import React, { Component, createRef } from "react";
import Payment from "payment";
// import SelectBox from "../components/SelectBox";
import Button from "../components/Button";

export class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.cardNum = createRef();
    this.cardExpiry = createRef();
    this.cardCVC = createRef();
    this.zipCode = createRef();
  }

  componentDidMount() {
    Payment.formatCardNumber(this.cardNum.current);
    Payment.formatCardExpiry(this.cardExpiry.current);
    Payment.formatCardCVC(this.cardCVC.current);
    Payment.restrictNumeric(this.zipCode.current);
  }

  render() {
    return (
      <div className="Payment">
        <div className="pageHeader">
          <h2 className="heading-2">Online payment method</h2>
        </div>
        <form className="Payment__form">
          <div className="Payment__form__inputs">
            <div className="Payment__form__inputs--radio">
              <input type="radio" name="payment-method" id="new-card" defaultChecked/>
              <label htmlFor="new-card">New payment card</label>
            </div>
            <div className="Payment__form__inputs--radio">
              <input type="radio" name="payment-method" id="paypal" />
              <label htmlFor="paypal">Paypal</label>
            </div>
            <div className="Payment__form__inputs--radio">
              <input type="radio" name="payment-method" id="pay-by-mobile" />
              <label htmlFor="pay-by-mobile">
                Pay by mobile using local method
              </label>
            </div>
            <div className="Payment__form__inputs--text">
              <input
                type="text"
                name="cardName"
                id="card-name"
                placeholder="Card name"
              />
              <input
                type="text"
                ref={this.cardNum}
                name="cardNumber"
                id="card-number"
                placeholder="Card number"
              />
              <div className="Payment__form__inputs--text--row">
                <input
                  type="text"
                  ref={this.cardExpiry}
                  name="cardExpiry"
                  id="card-expiry"
                  placeholder="MM / YY"
                />
                <input
                  type="text"
                  ref={this.cardCVC}
                  name="cardCode"
                  id="card-code"
                  placeholder="Security code"
                />
              </div>
              <div className="Payment__form__inputs--text--row">
                <input type="text" />
                <input
                  type="text"
                  ref={this.zipCode}
                  name="zipCode"
                  id="zip-code"
                  placeholder="ZIP / Postal code"
                />
              </div>
              <input type="checkbox" name="rememberCard" id="remember" />
              <label htmlFor="remember"> Remember this card </label>
            </div>
          </div>
          <div className="Payment__form__details">
            <h3 className="heading-2">Order invoice details</h3>
            <p className="Payment__form__details__detail">
              <span className="Payment__form__details__detail--key">
                Medication name:
              </span>
              Antinal - pills
            </p>
            <p className="Payment__form__details__detail">
              <span className="Payment__form__details__detail--key">
                Total Price:
              </span>
              27.50
            </p>
            <p className="Payment__form__details__detail">
              <span className="Payment__form__details__detail--key">
                Pharmacy name:
              </span>
              Roshdy pharmacies
            </p>
            <p className="Payment__form__details__detail">
              <span className="Payment__form__details__detail--key">
                Pharmacyaddress:
              </span>
              Mansoura City, Gehan St.
            </p>
            <Button className="btn checkout-btn"> Confirm </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default PaymentForm;

// FIXME: Add Country select-box