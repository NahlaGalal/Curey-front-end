import React, { Component } from "react";
import Location from "../../assets/svg/location.svg";
import Pharmacy from "../../assets/images/roshdy.png";
import Button from "../../components/Button";
import * as actions from "../../actions/types";
import { connect } from "react-redux";

const orders = [
  {
    logo: Pharmacy,
    name: "Roshdy pharmacies",
    address: "Mansoura City, Gehan St",
    state: "Delivered",
    total: 85,
    orderList: [
      "Antinal pills",
      "Flumox syrup",
      "Emetrex pills",
      "Cefatax syrup"
    ]
  },
  {
    logo: Pharmacy,
    name: "Roshdy pharmacies",
    address: "Mansoura City, Gehan St",
    state: "Failed",
    total: 85,
    orderList: [
      "Antinal pills",
      "Flumox syrup",
      "Emetrex pills",
      "Cefatax syrup",
      "Cefatax syrup",
      "Cefatax syrup"
    ]
  },
  {
    logo: Pharmacy,
    name: "Roshdy pharmacies",
    address: "Mansoura City, Gehan St",
    state: "Pending",
    total: 85,
    orderList: [
      "Antinal pills",
      "Flumox syrup",
      "Emetrex pills",
      "Cefatax syrup"
    ]
  },
  {
    logo: Pharmacy,
    name: "Roshdy pharmacies",
    address: "Mansoura City, Gehan St",
    state: "Delivered",
    total: 85,
    orderList: [
      "Antinal pills",
      "Flumox syrup",
      "Emetrex pills",
      "Cefatax syrup"
    ]
  },
  {
    logo: Pharmacy,
    name: "Roshdy pharmacies",
    address: "Mansoura City, Gehan St",
    state: "Delivered",
    total: 85,
    orderList: [
      "Antinal pills",
      "Flumox syrup",
      "Emetrex pills",
      "Cefatax syrup"
    ]
  },
  {
    logo: Pharmacy,
    name: "Roshdy pharmacies",
    address: "Mansoura City, Gehan St",
    state: "Delivered",
    total: 85,
    orderList: [
      "Antinal pills",
      "Flumox syrup",
      "Emetrex pills",
      "Cefatax syrup"
    ]
  },
  {
    logo: Pharmacy,
    name: "Roshdy pharmacies",
    address: "Mansoura City, Gehan St",
    state: "Delivered",
    total: 85,
    orderList: [
      "Antinal pills",
      "Flumox syrup",
      "Emetrex pills",
      "Cefatax syrup"
    ]
  },
  {
    logo: Pharmacy,
    name: "Roshdy pharmacies",
    address: "Mansoura City, Gehan St",
    state: "Delivered",
    total: 85,
    orderList: [
      "Antinal pills",
      "Flumox syrup",
      "Emetrex pills",
      "Cefatax syrup"
    ]
  },
  {
    logo: Pharmacy,
    name: "Roshdy pharmacies",
    address: "Mansoura City, Gehan St",
    state: "Delivered",
    total: 85,
    orderList: [
      "Antinal pills",
      "Flumox syrup",
      "Emetrex pills",
      "Cefatax syrup"
    ]
  }
];

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders,
      filter: "All"
    };
  }

  componentDidMount() {
    this.props.onRequestOrders(this.props.api_token);
  }

  filterOrders = filter => {
    if (filter === "All") return this.setState({ orders, filter });
    return this.setState({
      orders: orders.filter(order => order.state === filter),
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
            className={`btn ${
              this.state.filter === "Delivered" ? "active" : ""
            }`}
            onClick={() => this.filterOrders("Delivered")}
          >
            Delivered
          </Button>
          <Button
            className={`btn ${this.state.filter === "Pending" ? "active" : ""}`}
            onClick={() => this.filterOrders("Pending")}
          >
            Pending
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
        <main className="Orders__container">
          {this.state.orders.map((order, i) => (
            <section className="Orders__container__box" key={i}>
              <header className="Orders__container__box__header">
                <img src={order.logo} alt={`${order.name}`} />
                <div>
                  <div className="Orders__container__box__header--heading">
                    <p>{order.name}</p>
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
                      alt={`location icon for ${order.name}`}
                    />
                    <span> {order.address} </span>
                  </p>
                </div>
              </header>
              <div className="Orders__container__box__order">
                <div className="Orders__container__box__order--heading">
                  <h3> Order list </h3>
                  <p> {order.total} L.E </p>
                </div>
                <ul>
                  {order.orderList.map((medication, i) => (
                    <li key={i}> {medication} </li>
                  ))}
                </ul>
                <Button className="btn btn-xxs btn-green-dark">
                  {" "}
                  {order.state !== "Failed" ? "Trace Order" : "Reorder"}{" "}
                </Button>
              </div>
            </section>
          ))}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    api_token: state.user.api_token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestOrders: api_token =>
      dispatch({ type: actions.REQUEST_ORDERS, api_token })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
