import React, { Component } from "react";
import OrderCard from "../../components/pharmacy/orderCard";
import Button from "../../components/Button";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import ReactLoading from "react-loading";

class Requests extends Component {
  state = {
    medications: [
      { name: "Flumox syrup", quantity: 3 },
      { name: "Antinal pills", quantity: 2 },
      { name: "Panadol extra pills", quantity: 1 },
    ],
  };

  componentDidMount() {
    this.props.getRequests(this.props.api_token);
  }
  render() {
    return (
      <div className="pharamcyDashboardContainer">
        <div className="dashboardGrid">
          {this.props.requests.length ? (
            this.props.requests.map((request) => (
              <OrderCard
                key={request.id}
                name={request.buyer}
                address={request.address}
                image={request.image}
                day="JAN 23, 2020"
                hour="4:30 PM"
                medications={this.state.medications}
                request="request"
                requestAccepted={() =>
                  this.props.acceptRequest(this.props.api_token, request.id)
                }
              />
            ))
          ) : this.props.errors.error ? (
            <p className="error"> No requests yet </p>
          ) : (
            <ReactLoading
              type="spokes"
              color="#0066ff"
              className="loading center mb-40"
            />
          )}
        </div>
        {this.props.requests.length ? (
          <Button className="btn btn-blue btn-lg">See more</Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  requests: state.pharmacyData.requests,
  errors: state.pharmacyData.errors,
});

const mapDispatchToProps = (dispatch) => ({
  getRequests: (api_token) =>
    dispatch({ type: actions.SAGA_GET_REQUESTS, api_token }),
  acceptRequest: (api_token, id) =>
    dispatch({ type: actions.SAGA_ACCEPT_REQUEST, api_token, id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
