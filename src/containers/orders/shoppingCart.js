import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/order";
import Button from "../../components/Button";
import OrderDetails from "../../components/Pop-ups/OrderDetails";
import * as actions from "../../actions/types";
import ReactLoading from "react-loading";

class ShoppingCart extends Component {
  state = {
    orderDetailsBox: false,
    cart: [],
    orderDetails: [],
  };

  componentDidMount() {
    this.setState({ cart: this.props.cart });
    this.props.showCart(this.props.api_token, this.props.history);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.cart) !== JSON.stringify(this.props.cart)) {
      this.setState({ cart: this.props.cart });
    }
  }

  openOrderDetailsBox = () => {
    const orderDetails = [];
    this.state.cart.forEach((item) => {
      const orderIndex = orderDetails.findIndex(
        (order) => order.pharmacy.name === item.pharmacy.name
      );
      if (orderIndex === -1) {
        orderDetails.push({
          pharmacy: { ...item.pharmacy },
          medications: [{ ...item }],
        });
      } else {
        orderDetails[orderIndex].medications.push({ ...item });
      }
    });
    this.setState({ orderDetailsBox: true, orderDetails });
  };

  applyOrder = () => {
    const products = this.state.cart.map((cart) => ({
      id: cart.pharmacy.product_pharmacy_id,
      amount: 1,
    }));
    this.props.submitOrder(
      this.props.api_token,
      products,
      { order: 0 },
      this.props.history
    );
    this.setState({ orderDetailsBox: false, cart: [] });
  };

  render() {
    const totalPrice = this.state.cart
      .map((cart) => +cart.price)
      .reduce((total, price) => (total += price), 0)
      .toFixed(2);

    return (
      <React.Fragment>
        <div className="pageHeader">
          <h2 className="heading-2">Shopping cart</h2>
        </div>
        <div className="shoppingCartContainer">
          {this.state.cart.length ? (
            <React.Fragment>
              <div className="medicationsContainer medicationGrid">
                {this.state.cart.map((cart, i) => (
                  <Order
                    key={i}
                    name={cart.name}
                    price={cart.price}
                    image={cart.image}
                    pharmacy={cart.pharmacy.name}
                    address={cart.pharmacy.address}
                    phImage={cart.pharmacy.image}
                    remove={() =>
                      this.props.removeFromCart(
                        this.props.api_token,
                        cart.pharmacy.product_pharmacy_id,
                        this.props.history
                      )
                    }
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
            </React.Fragment>
          ) : !this.props.error ? (
            <ReactLoading type="spokes" color="#0066ff" className="loading" />
          ) : (
            <p className="error"> No items in shopping cart </p>
          )}
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

const mapStateToProps = (state) => ({
  cart: state.user.cart,
  api_token: state.user.api_token,
  error: state.user.errors.error,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (api_token, product_id, history) =>
    dispatch({
      type: actions.SAGA_REMOVE_FROM_CART,
      api_token,
      product_id,
      history,
    }),
  submitOrder: (api_token, data, notificationData, history) =>
    dispatch({
      type: actions.SUBMIT_MEDICATION_ORDER,
      api_token,
      data,
      notificationData,
      history,
    }),
  showCart: (api_token, history) =>
    dispatch({ type: actions.SAGA_SHOW_CART, api_token, history }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
