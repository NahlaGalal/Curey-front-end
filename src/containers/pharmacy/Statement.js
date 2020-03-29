import React, { Component } from "react";
import BarChart from "../../components/pharmacy/bar-chart";
import OrderCard from "../../components/pharmacy/orderCard";
import Button from "../../components/Button";

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
      { value: 325, month: "Dec" }
    ],
    medications: [
      { name: "Flumox syrup", quantity: 3 },
      { name: "Antinal pills", quantity: 2 },
      { name: "Panadol extra pills", quantity: 1 }
    ]
  };
  render() {
    return (
        <div className="pharmacyStatment">
          <div className="pharmacyStatment__statisticis mb-56">
            <h2 className="heading-2 mb-32">Statistics</h2>
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
          </div>

          <div className="performedRequests mb-40">
            <h2 className="heading-2 mb-32">Performed requests</h2>
            <div className="performedRequests__grid">
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
              <OrderCard
                name="MO Zayan"
                address="Mansoura City, Gehan St"
                medications={this.state.medications}
              />
            </div>
          </div>
          <Button className="btn btn-blue btn-lg center">See more</Button>
        </div>
    );
  }
}

export default PharmacyStatement;
