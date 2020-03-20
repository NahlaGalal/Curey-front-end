import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/order";
import Button from "../../components/Button";
import OrderDetails from "../../components/Pop-ups/OrderDetails";
import * as actions from "../../actions/types";

class ShoppingCart extends Component {
  state = {
    orderDetailsBox: false,
    cart: [],
    orderDetails: []
  };

  componentDidMount() {
    this.setState({ cart: this.props.cart });
  }

  removeMedication = index => {
    const cart = this.state.cart;
    cart.splice(index, 1);
    this.setState({ cart });
    this.props.removeFromCartStorage(this.state.cart);
  };

  openOrderDetailsBox = () => {
    const orderDetails = [];
    this.state.cart.forEach(item => {
      const orderIndex = orderDetails.findIndex(
        order => order.pharmacy.name === item.pharmacy.name
      );
      if (orderIndex === -1) {
        orderDetails.push({
          pharmacy: {...item.pharmacy},
          medications: [{...item.medication}]
        })
      }else {
        orderDetails[orderIndex].medications.push({...item.medication});
      }
    });
    this.setState({ orderDetailsBox: true, orderDetails });
  };

  applyOrder = () => {
    const products = this.state.cart.map(cart => ({
      id: cart.pharmacy.product_pharmacy_id,
      amount: 1
    }));
    this.props.submitOrder(this.props.api_token, products);
    this.props.removeFromCartStorage([]);
    this.setState({ orderDetailsBox: false, cart: [] });
  }

  render() {
    const totalPrice = this.state.cart
      .map(cart => +cart.medication.price)
      .reduce((total, price) => (total += price), 0)
      .toFixed(2);

    return (
      <React.Fragment>
        <div className="pageHeader">
          <h2 className="heading-2">Shopping cart</h2>
        </div>
        <div className="shoppingCartContainer">
          <div className="medicationsContainer medicationGrid">
            {this.state.cart.map((cart, i) => (
              <Order
                key={i}
                name={cart.medication.name}
                price={cart.medication.price}
                pharmacy={cart.pharmacy.name}
                address={cart.pharmacy.address}
                remove={() => this.removeMedication(i, this.state.cart)}
              />
            ))}
          </div>
          <div className="totalPriceCard">
            <h3>Total price</h3>
            <p>{totalPrice} L.E</p>
            {this.state.cart.length ? (
              <Button
                className="btn checkout-btn"
                onClick={this.openOrderDetailsBox}
              >
                Checkout
              </Button>
            ) : null}
          </div>
        </div>
        {this.state.orderDetailsBox && (
          <OrderDetails
            closePopup={() => this.setState({ orderDetailsBox: false })}
            orders={this.state.orderDetails}
            applyOrder={this.applyOrder}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.user.cart,
  api_token: state.user.api_token
});

const mapDispatchToProps = dispatch => ({
  removeFromCartStorage: cart =>
    dispatch({
      type: actions.REMOVE_FROM_CART,
      cart
    }),
  submitOrder: (api_token, data) =>
    dispatch({ type: actions.SUBMIT_MEDICATION_ORDER, api_token, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
