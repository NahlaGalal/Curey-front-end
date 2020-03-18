import React, { Component } from "react";
import DoctorBookingCard from "../components/Doctors and medications/DoctorBookingCard";
import Button from "../components/Button";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import ReactLoading from "react-loading";

const bookings = [
  {
    doctorName: "Hassan Ali",
    doctorPrice: 125,
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    date: "JAN 32, 2020",
    time: "4: 30 PM",
    status: "Booking"
  },
  {
    doctorName: "Hassan Ali",
    doctorPrice: 125,
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    date: "JAN 32, 2020",
    time: "4: 30 PM",
    status: "Re-examination"
  },
  {
    doctorName: "Hassan Ali",
    doctorPrice: 125,
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    date: "JAN 32, 2020",
    time: "4: 30 PM",
    status: "Booking"
  },
  {
    doctorName: "Hassan Ali",
    doctorPrice: 125,
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    date: "JAN 32, 2020",
    time: "4: 30 PM",
    status: "Booking"
  },
  {
    doctorName: "Hassan Ali",
    doctorPrice: 125,
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    date: "JAN 32, 2020",
    time: "4: 30 PM",
    status: "Re-examination"
  },
  {
    doctorName: "Hassan Ali",
    doctorPrice: 125,
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    date: "JAN 32, 2020",
    time: "4: 30 PM",
    status: "Booking"
  },
  {
    doctorName: "Hassan Ali",
    doctorPrice: 125,
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    date: "JAN 32, 2020",
    time: "4: 30 PM",
    status: "Home visit"
  },
  {
    doctorName: "Hassan Ali",
    doctorPrice: 125,
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    date: "JAN 32, 2020",
    time: "4: 30 PM",
    status: "Home visit"
  }
];

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "All",
      bookings
    };
  }

  componentDidMount() {
    this.props.onRequestAppointments(this.props.api_token);
  }

  arr = this.props.appointments.map((booking, i) => [...booking]);

  filterBookings = filter => {
    if (filter === "All") return this.setState({ filter, bookings });
    return this.setState({
      filter,
      bookings: this.props.appointments.filter(
        booking => booking.status === filter
      )
    });
  };

  render() {
    console.log(this.arr);
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

        <div className="Appointments__Grid">
          {this.props.appointments.length ? (
            this.props.appointments.map((booking, i) => (
              <DoctorBookingCard
                key={i}
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
            ))
          ) : !this.props.appointmentsError.length ? (
            <ReactLoading
              type="spokes"
              color="#0066ff"
              className="loading center mb-40"
            />
          ) : null}
        </div>
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
