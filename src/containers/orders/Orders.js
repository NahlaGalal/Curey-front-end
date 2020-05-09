import React, { Component } from "react";
import Location from "../../assets/svg/location.svg";
import Button from "../../components/Button";
import * as actions from "../../actions/types";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import OrderTracing from "../../components/Pop-ups/OrderTracing";

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      filter: "All",
      orderTracingBox: false
    };
  }

  componentDidMount() {
    this.props.onRequestOrders(this.props.api_token);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.orders) !== JSON.stringify(this.props.orders)
    ) {
      this.setState({ orders: this.props.orders });
    }
  }

  filterOrders = filter => {
    if (filter === "All")
      return this.setState({ orders: this.props.orders, filter });
    return this.setState({
      orders: this.props.orders.filter(order => order.state === filter),
      filter
    });
  };

  render() {
    return (
      <div className="Orders">
        <div className="toggler">
          <Button
            className={`btn ${this.state.filter === "All" ? "active" : ""}`}
            onClick={() => this.filterOrders("All")}
          >
            All
          </Button>
          <Button
            className={`btn btn-filter ${
              this.state.filter === "Waiting" ? "active" : ""
            }`}
            onClick={() => this.filterOrders("Waiting")}
          >
            Waiting
          </Button>
          <Button
            className={`btn ${this.state.filter === "Pending" ? "active" : ""}`}
            onClick={() => this.filterOrders("Pending")}
          >
            Pending
          </Button>
          <Button
            className={`btn ${
              this.state.filter === "Delivered" ? "active" : ""
            }`}
            onClick={() => this.filterOrders("Delivered")}
          >
            Delivered
          </Button>
          <Button
            className={`btn btn-filter ${
              this.state.filter === "Failed" ? "active" : ""
            }`}
            onClick={() => this.filterOrders("Failed")}
          >
            Failed
          </Button>
        </div>
        {this.props.orders.length ? (
          <main className="Orders__container">
            {this.state.orders.map((order, i) => {
              order.state = order.state || "Waiting";
              return (
                <section className="Orders__container__box" key={i}>
                  <header className="Orders__container__box__header">
                    <img
                      src={order.image}
                      alt={`${order.pharmacy} Logo`}
                      className="Orders__container__box__header__logo"
                    />
                    <div>
                      <div className="Orders__container__box__header--heading">
                        <p>{order.pharmacy}</p>
                        <p
                          className={`${
                            order.state !== "Failed" ? "state" : "state-failed"
                          }`}
                        >
                          {order.state}
                        </p>
                      </div>
                      <p className="Orders__container__box__header--address">
                        <img
                          src={Location}
                          alt={`location icon for ${order.pharmacy}`}
                        />
                        <span>
                          {order.address || "Mansoura City, Gehan St"}
                        </span>
                      </p>
                    </div>
                  </header>
                  <div className="Orders__container__box__order">
                    <div className="Orders__container__box__order--heading">
                      <h3> Order list </h3>
                      <p> {order.total_price} L.E </p>
                    </div>
                    <ul>
                      {order.products.map((medication, i) => (
                        <li key={i}> {medication.name} </li>
                      ))}
                    </ul>
                    {order.state === "Waiting" ? (
                      <Button
                        className="btn btn-xxs btn-warning"
                        onClick={() =>
                          this.props.onCancelOrder(
                            this.props.api_token,
                            order.id
                          )
                        }
                      >
                        Cancel Order
                      </Button>
                    ) : order.state === "Failed" ? (
                      <Button className="btn btn-xxs btn-green-dark">
                        Reorder
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-xxs btn-green-dark"
                        onClick={() => this.setState({ orderTracingBox: true })}
                      >
                        Trace Order
                      </Button>
                    )}
                  </div>
                </section>
              );
            })}
          </main>
        ) : this.props.medicationsDataError.length ? (
          <p className="error">No orders yet</p>
        ) : (
          <ReactLoading
            type="spokes"
            color="#0066ff"
            className="loading center mb-40"
          />
        )}
        {this.state.orderTracingBox && (
          <OrderTracing
            closePopup={() => this.setState({ orderTracingBox: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    api_token: state.user.api_token,
    orders: state.medicationsData.orders,
    medicationsDataError: state.medicationsData.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestOrders: api_token =>
      dispatch({ type: actions.REQUEST_ORDERS, api_token }),
    onCancelOrder: (api_token, order_id) =>
      dispatch({ type: actions.SAGA_CANCEL_ORDER, api_token, order_id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
