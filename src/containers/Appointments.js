import React, { Component } from "react";
import DoctorBookingCard from "../components/Doctors and medications/DoctorBookingCard";
import Button from "../components/Button";

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
    }
  }

  filterBookings = (filter) => {
    if(filter === "All") return this.setState({filter, bookings});
    return this.setState({filter, bookings: bookings.filter(booking => booking.status === filter)});
  }

  render() {
    return (
      <div className="Appointments">
        <div className="toggler">
          <Button className={`btn ${this.state.filter==="All" ? "active" : ""}`} onClick={() => this.filterBookings("All")}> All </Button>
          <Button className={`btn ${this.state.filter==="Booking" ? "active" : ""}`} onClick={() => this.filterBookings("Booking")}> Bookings </Button>
          <Button className={`btn ${this.state.filter==="Home visit" ? "active" : ""}`} onClick={() => this.filterBookings("Home visit")}> Home visits </Button>
          <Button className={`btn ${this.state.filter==="Re-examination" ? "active" : ""}`} onClick={() => this.filterBookings("Re-examination")}> Re-examinations </Button>
        </div>

        <div className="Appointments__Grid">
          {this.state.bookings.map((booking, i) => (
            <DoctorBookingCard
              key={i}
              name={booking.doctorName}
              price={booking.doctorPrice}
              speciality={booking.speciality}
              address={booking.address}
              date={booking.date}
              time={booking.time}
              status={booking.status}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Appointments;
