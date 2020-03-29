import React, { Component } from "react";
import OrderCard from "../../components/pharmacy/orderCard";
import Button from "../../components/Button";

class Requests extends Component {
  state = {
    medications: [
      { name: "Flumox syrup", quantity: 3 },
      { name: "Antinal pills", quantity: 2 },
      { name: "Panadol extra pills", quantity: 1 }
    ]
  };
  render() {
    return (
      <div className="pharamcyDashboardContainer">
        <div className="dashboardGrid">
          <OrderCard
            name="MO Zayan"
            address="Mansoura City, Gehan St"
            day="JAN 23, 2020"
            hour="4:30 PM"
            medications={this.state.medications}
            request="request"
          />
          <OrderCard
            name="MO Zayan"
            address="Mansoura City, Gehan St"
            day="JAN 23, 2020"
            hour="4:30 PM"
            medications={this.state.medications}
            request="request"
          />
          <OrderCard
            name="MO Zayan"
            address="Mansoura City, Gehan St"
            day="JAN 23, 2020"
            hour="4:30 PM"
            medications={this.state.medications}
            request="request"
          />
          <OrderCard
            name="MO Zayan"
            address="Mansoura City, Gehan St"
            day="JAN 23, 2020"
            hour="4:30 PM"
            medications={this.state.medications}
            request="request"
          />
          <OrderCard
            name="MO Zayan"
            address="Mansoura City, Gehan St"
            day="JAN 23, 2020"
            hour="4:30 PM"
            medications={this.state.medications}
            request="request"
          />
          <OrderCard
            name="MO Zayan"
            address="Mansoura City, Gehan St"
            day="JAN 23, 2020"
            hour="4:30 PM"
            medications={this.state.medications}
            request="request"
          />
        </div>
        <Button className="btn btn-blue btn-lg">See more</Button>
      </div>
    );
  }
}

export default Requests;
