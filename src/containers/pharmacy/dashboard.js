import React, { Component } from "react";
import PharmacyNavbar from "../../components/layout/pharmacyNavbar";
import Footer from "../../components/layout/Footer";
import OrderCard from "../../components/pharmacy/orderCard";

class Dashboard extends Component {
  state = {
    medications: [
      { name: "Flumox syrup", quantity: 3 },
      { name: "Antinal pills", quantity: 2 },
      { name: "Panadol extra pills", quantity: 1 }
    ]
  };
  render() {
    return (
      <React.Fragment>
        <PharmacyNavbar />
        <div className="pharamcyDashboardContainer">
          <div className="dashboardGrid">
            <OrderCard
              name="MO Zayan"
              address="Mansoura City, Gehan St"
              day="JAN 23, 2020"
              hour="4:30 PM"
              medications={this.state.medications}
            />
            <OrderCard
              name="MO Zayan"
              address="Mansoura City, Gehan St"
              day="JAN 23, 2020"
              hour="4:30 PM"
              medications={this.state.medications}
            />
            <OrderCard
              name="MO Zayan"
              address="Mansoura City, Gehan St"
              day="JAN 23, 2020"
              hour="4:30 PM"
              medications={this.state.medications}
            />
            <OrderCard
              name="MO Zayan"
              address="Mansoura City, Gehan St"
              day="JAN 23, 2020"
              hour="4:30 PM"
              medications={this.state.medications}
            />
            <OrderCard
              name="MO Zayan"
              address="Mansoura City, Gehan St"
              day="JAN 23, 2020"
              hour="4:30 PM"
              medications={this.state.medications}
            />
            <OrderCard
              name="MO Zayan"
              address="Mansoura City, Gehan St"
              day="JAN 23, 2020"
              hour="4:30 PM"
              medications={this.state.medications}
            />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Dashboard;
