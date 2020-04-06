import React, { Component } from "react";
import BarChart from "../../components/pharmacy/bar-chart";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";
import { connect } from "react-redux";
import * as actions from "../../actions/types";

const patientCard = [
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Home visit",
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Booking",
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Booking",
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Booking",
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Home visit",
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Home visit",
  },
];

class DoctorStatement extends Component {
  state = {
    filter: "All",
    menuVisiblity: -1,
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
  };

  componentDidMount() {
    this.props.getDoctorDashboard(this.props.api_token);
  }

  toggleMenuBox = (e, i) => {
    e.stopPropagation();
    let menuVisiblity = i;
    if (this.state.menuVisiblity === i) menuVisiblity = -1;
    this.setState({ menuVisiblity });
  };

  render() {
    return (
      <div
        className="doctorStatement"
        onClick={() => this.setState({ menuVisiblity: -1 })}
      >
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
            {patientCard.map((card, i) => (
              <PatientCard
                key={i}
                index={i}
                name={card.name}
                address={card.address}
                rate={card.rate}
                date={card.date}
                time={card.time}
                state={card.state}
                toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                menuVisibility={this.state.menuVisiblity}
                stopPropagation={(e) => e.stopPropagation()}
              />
            ))}
          </div>
          <Button className="btn btn-lg btn-blue center">See more</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
});

const mapDispatchToProps = (dispatch) => ({
  getDoctorDashboard: (api_token) =>
    dispatch({ type: actions.SAGA_GET_DOCTOR_STATEMENT, api_token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorStatement);
