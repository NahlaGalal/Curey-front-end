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
    this.props.getRequests(this.props.api_token, this.props.history);
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
                  this.props.acceptRequest(
                    {
                      api_token: this.props.api_token,
                      order_id: request.id,
                    },
                    this.props.history
                  )
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
  getRequests: (api_token, history) =>
    dispatch({ type: actions.SAGA_GET_REQUESTS, api_token, history }),
  acceptRequest: (data, history) =>
    dispatch({ type: actions.SAGA_ACCEPT_REQUEST, data, history }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
