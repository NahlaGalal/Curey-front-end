import React, { Component } from "react";
import BarChart from "../../components/pharmacy/bar-chart";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";

class DoctorStatement extends Component {
  state = {
    filter: "All",
    menuVisiblity: false,
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

  toggleMenuBox = (e, i) => {
    e.stopPropagation();
    let menuVisiblity = i;
    if (this.state.menuVisiblity === i) menuVisiblity = -1;
    this.setState({ menuVisiblity });
  };

  render() {
    return (
      <div className="doctorStatement">
        <div className="pharmacyStatment__statisticis mb-56">
          <h2 className="heading-2 mb-32">Statistics</h2>
          <div className="pharmacyStatment__statisticis--grid">
            <BarChart
              data={this.state.data}
              title="Number of bookings per month"
            />
            <BarChart
              data={this.state.data}
              title="Number of home visits per month"
            />
            <BarChart
              data={this.state.data}
              title="Number of Re-examinations per month"
            />
          </div>
        </div>

        <div className="performedRequests mb-40">
          <h2 className="heading-2 mb-32">Performed requests</h2>
          <div className="toggler">
            <Button
              className={`btn ${this.state.filter === "All" ? "active" : ""}`}
              //   onClick={() => this.filterBookings("All")}
            >
              {" "}
              All{" "}
            </Button>
            <Button
              className={`btn ${
                this.state.filter === "Booking" ? "active" : ""
              }`}
              //   onClick={() => this.filterBookings("Booking")}
            >
              {" "}
              Bookings{" "}
            </Button>
            <Button
              className={`btn ${
                this.state.filter === "Home visit" ? "active" : ""
              }`}
              //   onClick={() => this.filterBookings("Home visit")}
            >
              {" "}
              Home visits{" "}
            </Button>
            <Button
              className={`btn ${
                this.state.filter === "Re-examination" ? "active" : ""
              }`}
              //   onClick={() => this.filterBookings("Re-examination")}
            >
              {" "}
              Re-examinations{" "}
            </Button>
          </div>
          <div className="performedRequests__grid mt-41 mb-40">
            <PatientCard
              name="John Doe"
              address="Mansura City , Gehan ST"
              rate={5}
              date="JAN 23, 2020"
              time="4:30 PM"
              state="Booking"
              toggleMenuBox={e => this.toggleMenuBox(e)}
              menuVisibility={this.state.menuVisiblity}
              stopPropagation={e => e.stopPropagation()}
            />
            <PatientCard
              name="John Doe"
              address="Mansura City , Gehan ST"
              rate={5}
              date="JAN 23, 2020"
              time="4:30 PM"
              state="Booking"
              toggleMenuBox={e => this.toggleMenuBox(e)}
              menuVisibility={this.state.menuVisiblity}
              stopPropagation={e => e.stopPropagation()}
            />
            <PatientCard
              name="John Doe"
              address="Mansura City , Gehan ST"
              rate={5}
              date="JAN 23, 2020"
              time="4:30 PM"
              state="Booking"
              toggleMenuBox={e => this.toggleMenuBox(e)}
              menuVisibility={this.state.menuVisiblity}
              stopPropagation={e => e.stopPropagation()}
            />
            <PatientCard
              name="John Doe"
              address="Mansura City , Gehan ST"
              rate={5}
              date="JAN 23, 2020"
              time="4:30 PM"
              state="Booking"
              toggleMenuBox={e => this.toggleMenuBox(e)}
              menuVisibility={this.state.menuVisiblity}
              stopPropagation={e => e.stopPropagation()}
            />
            <PatientCard
              name="John Doe"
              address="Mansura City , Gehan ST"
              rate={5}
              date="JAN 23, 2020"
              time="4:30 PM"
              state="Booking"
              toggleMenuBox={e => this.toggleMenuBox(e)}
              menuVisibility={this.state.menuVisiblity}
              stopPropagation={e => e.stopPropagation()}
            />
            <PatientCard
              name="John Doe"
              address="Mansura City , Gehan ST"
              rate={5}
              date="JAN 23, 2020"
              time="4:30 PM"
              state="Booking"
              toggleMenuBox={e => this.toggleMenuBox(e)}
              menuVisibility={this.state.menuVisiblity}
              stopPropagation={e => e.stopPropagation()}
            />
          </div>
          <Button className="btn btn-lg btn-blue center">See more</Button>
        </div>
      </div>
    );
  }
}

export default DoctorStatement;
