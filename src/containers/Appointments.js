import React, { Component } from "react";
import DoctorBookingCard from "../components/Doctors and medications/DoctorBookingCard";
import Button from "../components/Button";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import ReactLoading from "react-loading";

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "All",
      bookings: []
    };
  }

  componentDidMount() {
    this.setState({ bookings: this.props.appointments });
    this.props.onRequestAppointments(this.props.api_token);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.appointments) !==
      JSON.stringify(this.props.appointments)
    ) {
      this.setState({ bookings: this.props.appointments });
    }
  }

  filterBookings = filter => {
    if (filter === "All")
      return this.setState({ filter, bookings: this.props.appointments });
    else if (filter === "Home visit")
      return this.setState({
        filter,
        bookings: this.props.appointments.filter(booking => booking.is_callup)
      });
    else if (filter === "Re-examination")
      return this.setState({
        filter,
        bookings: this.props.appointments.filter(
          booking => booking.re_exam && !booking.is_callup
        )
      });
    else
      return this.setState({
        filter,
        bookings: this.props.appointments.filter(
          booking => !booking.is_callup && !booking.re_exam
        )
      });
  };

  render() {
    return (
      <div className="Appointments">
        <div className="toggler">
          <Button
            className={`btn ${this.state.filter === "All" ? "active" : ""}`}
            onClick={() => this.filterBookings("All")}
          >
            {" "}
            All{" "}
          </Button>
          <Button
            className={`btn ${this.state.filter === "Booking" ? "active" : ""}`}
            onClick={() => this.filterBookings("Booking")}
          >
            {" "}
            Bookings{" "}
          </Button>
          <Button
            className={`btn ${
              this.state.filter === "Home visit" ? "active" : ""
            }`}
            onClick={() => this.filterBookings("Home visit")}
          >
            {" "}
            Home visits{" "}
          </Button>
          <Button
            className={`btn ${
              this.state.filter === "Re-examination" ? "active" : ""
            }`}
            onClick={() => this.filterBookings("Re-examination")}
          >
            {" "}
            Re-examinations{" "}
          </Button>
        </div>

        {this.props.appointments.length ? (
          <div className="Appointments__Grid">
            {this.state.bookings.map((booking, i) => (
              <DoctorBookingCard
                key={i}
                image={booking.image}
                name={booking.full_name}
                price={booking.fees}
                speciality={booking.speciality}
                address={booking.address}
                date={booking.app_time}
                time={booking.duration}
                status={
                  booking.is_callup
                    ? "Home visit"
                    : booking.re_exam
                    ? "Re-examination"
                    : "Booking"
                }
              />
            ))}
          </div>
        ) : !this.props.appointmentsError.error ? (
          <ReactLoading
            type="spokes"
            color="#0066ff"
            className="loading center mb-40"
          />
        ) : (
          <p className="error"> No appointments yet </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    api_token: state.user.api_token,
    appointments: state.appointments.appointments,
    appointmentsError: state.appointments.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestAppointments: api_token =>
      dispatch({ type: actions.REQUEST_APPOINTMENTS, api_token })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
