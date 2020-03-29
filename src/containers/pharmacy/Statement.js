import React, { Component } from "react";
import BarChart from "../../components/pharmacy/bar-chart";

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
    ]
  };
  render() {
    return (
      <div>
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
        </div>
      </div>
    );
  }
}

export default PharmacyStatement;
