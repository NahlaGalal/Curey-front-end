import React, { Component } from "react";
import BarChart from "../../components/pharmacy/bar-chart";
import OrderCard from "../../components/pharmacy/orderCard";
import Button from "../../components/Button";
import * as actions from "../../actions/types";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

class PharmacyStatement extends Component {
  state = {
    data: [
      { value: 370, month: "Jan" },
      { value: 70, month: "Feb" },
      { value: 350, month: "Mar" },
      { value: 600, month: "Apr" },
      { value: 250, month: "May" },
      { value: 50, month: "June" },
      { value: 70, month: "Feb2" },
      { value: 350, month: "Oct" },
      { value: 600, month: "Nov" },
      { value: 325, month: "Dec" },
    ],
    medications: [
      { name: "Flumox syrup", quantity: 3 },
      { name: "Antinal pills", quantity: 2 },
      { name: "Panadol extra pills", quantity: 1 },
    ],
  };

  componentDidMount() {
    this.props.getDashbaord(this.props.api_token, this.props.history);
  }

  render() {
    return (
      <div className="pharmacyStatment">
        <div className="pharmacyStatment__statisticis mb-56">
          <h2 className="heading-2 mb-32">Statistics</h2>
          {this.props.dashboard.length ? (
            <div className="pharmacyStatment__statisticis--grid">
              <BarChart
                data={this.state.data}
                title="Number of orders per month"
              />
              <BarChart
                data={this.state.data}
                title="Number of customers per month"
              />
              <BarChart
                data={this.state.data}
                title="Total earning per month by L.E"
              />
            </div>
          ) : this.props.errors.error ? (
            <p className="error"> No Statistics yet </p>
          ) : (
            <ReactLoading
              type="spokes"
              color="#0066ff"
              className="loading center mb-40"
            />
          )}
        </div>

        <div className="performedRequests mb-40">
          <h2 className="heading-2 mb-32">Performed requests</h2>
          <div className="performedRequests__grid">
            {this.props.dashboard.length ? (
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
            ) : this.props.errors.error ? (
              <p className="error"> No performed Requests yet </p>
            ) : (
              <ReactLoading
                type="spokes"
                color="#0066ff"
                className="loading center mb-40"
              />
            )}
          </div>
        </div>
        {this.props.dashboard.length ? (
          <Button className="btn btn-blue btn-lg center">See more</Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  errors: state.pharmacyData.errors,
  dashboard: state.pharmacyData.dashboard,
});

const mapDispatchToProps = (dispatch) => ({
  getDashbaord: (api_token, history) =>
    dispatch({ type: actions.SAGA_GET_DASHBOARD, api_token, history }),
});
export default connect(mapStateToProps, mapDispatchToProps)(PharmacyStatement);
