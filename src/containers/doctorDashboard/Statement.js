import React, { Component } from "react";
import BarChart from "../../components/pharmacy/bar-chart";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";
import { connect } from "react-redux";
import {
  SAGA_SEND_PRESCRIPTION,
  SAGA_SET_RE_EXAMINAION,
  SAGA_GET_DOCTOR_STATEMENT
} from "../../actions/types";

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

  submitTime = (time) => {
    this.props.submitTime({
      api_token: this.props.api_token,
      appointment_time: time,
      is_callup: this.props.state === "Home visit" ? 1 : 0,
      user_id: 5,
    });
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
            {this.props.statement.map((card, i) => (
              <PatientCard
                key={i}
                index={i}
                name={card.name}
                address={card.address}
                rate={card.rate}
                date={card.date}
                time={card.time}
                home_visit={card.home_visit}
                request={false}
                toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                menuVisibility={this.state.menuVisiblity}
                stopPropagation={(e) => e.stopPropagation()}
                sendPrescription={(medications) =>
                  this.props.sendPrescription({
                    api_token: this.props.api_token,
                    appointment_id: card.id,
                    items: medications.map((med) => ({
                      product_id: med.name,
                      dosage: med.frequency,
                      per: med.per,
                    })),
                  })
                }
                submitTime={(time) => this.submitTime(time)}
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
  statement: state.docorDashboard.statement
});

const mapDispatchToProps = (dispatch) => ({
  submitTime: (data) => dispatch({ type: SAGA_SET_RE_EXAMINAION, data }),
  sendPrescription: (data) => dispatch({ type: SAGA_SEND_PRESCRIPTION, data }),
  getDoctorDashboard: (api_token) =>
    dispatch({ type: SAGA_GET_DOCTOR_STATEMENT, api_token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorStatement);
