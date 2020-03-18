import React, { Component, createRef } from "react";
import Payment from "payment";
// import SelectBox from "../components/SelectBox";
import Button from "../components/Button";
import SelectBox from "../components/SelectBox";

const cities = [
  {
    name: "Cairo",
    id: 1
  },
  { name: "Mansoura", id: 2 },
  { name: "Bilqas", id: 3 },
  { name: "El-Mahallah", id: 4 }
];

export class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.cardNum = createRef();
    this.cardExpiry = createRef();
    this.cardCVC = createRef();
    this.zipCode = createRef();
    this.optionsContainerRef = createRef();

    this.state = {
      cardNumber: "",
      cardName: "",
      cardExpiry: "",
      cardCVC: "",
      zipCode: "",
      city: [],
      selectBoxOpened: false
    };
  }

  componentDidMount() {
    Payment.formatCardNumber(this.cardNum.current);
    Payment.formatCardExpiry(this.cardExpiry.current);
    Payment.formatCardCVC(this.cardCVC.current);
    Payment.restrictNumeric(this.zipCode.current);
  }

  onChangeHandler = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  toggleSelectBox = () => {
    const prev = this.state.selectBoxOpened;
    let city = [];
    if (prev) {
      city = Array.from(
        this.optionsContainerRef.current.querySelectorAll("input[type=radio]")
      )
        .filter(input => input.checked)
        .map(el => el.value);
    }
    this.setState({
      selectBoxOpened: !prev,
      city
    });
  };

  render() {
    return (
      <div className="Payment">
        <div className="pageHeader">
          <h2 className="heading-2">Online payment method</h2>
        </div>
        <form className="Payment__form">
          <div className="Payment__form__inputs">
            <div className="Payment__form__inputs--radio">
              <input
                type="radio"
                name="payment-method"
                id="new-card"
                defaultChecked
              />
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
              <div className="fieldinput">
                <input
                  className="fieldinput__input"
                  type="text"
                  name="cardName"
                  id="card-name"
                  value={this.state.cardName}
                  onChange={this.onChangeHandler}
                />
                <label
                  htmlFor="card-name"
                  className={
                    this.state.cardName && this.state.cardName.length
                      ? "active"
                      : null
                  }
                >
                  Card name
                </label>
              </div>
              <div className="fieldinput">
                <input
                  className="fieldinput__input"
                  type="text"
                  ref={this.cardNum}
                  name="cardNumber"
                  id="card-number"
                  value={this.state.cardNumber}
                  onChange={this.onChangeHandler}
                />
                <label
                  htmlFor="card-number"
                  className={
                    this.state.cardNumber && this.state.cardNumber.length
                      ? "active"
                      : null
                  }
                >
                  Card number
                </label>
              </div>
              <div className="Payment__form__inputs--text--row">
                <div className="fieldinput">
                  <input
                    className="fieldinput__input"
                    type="text"
                    ref={this.cardExpiry}
                    name="cardExpiry"
                    id="card-expiry"
                    value={this.state.cardExpiry}
                    onChange={this.onChangeHandler}
                  />
                  <label
                    htmlFor="card-expiry"
                    className={
                      this.state.cardExpiry && this.state.cardExpiry.length
                        ? "active"
                        : null
                    }
                  >
                    MM / YY
                  </label>
                </div>
                <div className="fieldinput">
                  <input
                    className="fieldinput__input"
                    type="text"
                    ref={this.cardCVC}
                    name="cardCVC"
                    id="card-cvc"
                    value={this.state.cardCVC}
                    onChange={this.onChangeHandler}
                  />
                  <label
                    htmlFor="card-cvc"
                    className={
                      this.state.cardCVC && this.state.cardCVC.length
                        ? "active"
                        : null
                    }
                  >
                    Security code
                  </label>
                </div>
              </div>
              <div className="Payment__form__inputs--text--row">
                <SelectBox
                  onClick={this.toggleSelectBox}
                  className={this.state.city.length ? "hasValue" : null}
                  listChecked={this.state.city || []}
                  header="Country"
                  boxOpened={this.state.selectBoxOpened}
                  list={cities}
                  optionsContainerRef={this.optionsContainerRef}
                  multiple={false}
                  name="city"
                />
                <div className="fieldinput">
                  <input
                    className="fieldinput__input"
                    type="text"
                    ref={this.zipCode}
                    name="zipCode"
                    id="zip-code"
                    value={this.state.zipCode}
                    onChange={this.onChangeHandler}
                  />
                  <label
                    htmlFor="zip-code"
                    className={
                      this.state.zipCode && this.state.zipCode.length
                        ? "active"
                        : null
                    }
                  >
                    ZIP / Postal code
                  </label>
                </div>
              </div>
              <input type="checkbox" name="rememberCard" id="remember" />
              <label htmlFor="remember" className="remember-password">
                {" "}
                Remember this card{" "}
              </label>
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
