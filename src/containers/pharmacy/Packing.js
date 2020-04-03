import React, { Component } from "react";
import OrderCard from "../../components/pharmacy/orderCard";
import Button from "../../components/Button";
import { connect } from "react-redux";
import { SAGA_GET_PACKING, SAGA_MOVE_TO_DELIVERY } from "../../actions/types";
import ReactLoading from "react-loading";

class Packing extends Component {
  componentDidMount() {
    this.props.getPackingList(this.props.api_token);
  }

  moveToDelivery = order_id => {
    this.props.moveToDelivery({ api_token: this.props.api_token, order_id });
  };

  render() {
    return (
      <div className="pharamcyDashboardContainer">
        <div className="dashboardGrid">
          {this.props.packing.length ? (
            this.props.packing.map(order => (
              <OrderCard
                key={order.id}
                name={order.buyer}
                address={order.address}
                image={order.image}
                day="JAN 23, 2020"
                hour="4:30 PM"
                medications={order.details}
                request="packing"
                moveToDelivery={() => this.moveToDelivery(order.id)}
              />
            ))
          ) : this.props.errors.error ? (
            <p className="dashboardGrid__error"> No medications yet </p>
          ) : (
            <ReactLoading
              type="spokes"
              color="#0066ff"
              className="loading center mb-40"
            />
          )}
        </div>
        {this.props.packing.length ? (
          <Button className="btn btn-blue btn-lg">See more</Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api_token: state.user.api_token,
  packing: state.pharmacyData.packing,
  errors: state.pharmacyData.errors
});

const mapDispatchToProps = dispatch => ({
  getPackingList: api_token => dispatch({ type: SAGA_GET_PACKING, api_token }),
  moveToDelivery: data => dispatch({ type: SAGA_MOVE_TO_DELIVERY, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Packing);
