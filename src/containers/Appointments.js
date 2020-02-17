import React, { Component } from "react";
import DoctorBookingCard from "../components/Doctors and medications/DoctorBookingCard";

class Appointments extends Component {
  state = { BookingNo: 1 };
  render() {
    const booking_types = ["All", "Bookings", "Home visits", "Re-examinations"];

    return (
      <div className="Appointments">
        <div
          className={
            "signup__container__forms__toggler active-" + this.state.BookingNo
          }
        >
          {booking_types.map((type, i) => (
            <button
              key={i}
              type="button"
              // onClick={() => {
              //   this.toggleUserForm(i + 1);
              // }}
            >
              {type}
            </button>
          ))}
          <span className="signup__container__forms__toggler__pointer"></span>
        </div>

        <div className="Appointments__Grid">
          <DoctorBookingCard
            name="Hassan Ali"
            price={125}
            speciality="General Surgery"
            address="Mansoura City, Gehan St"
            date="JAN 23, 2020"
            time="4:30 PM"
            status="Booking"
          />
          <DoctorBookingCard
            name="Hassan Ali"
            price={125}
            speciality="General Surgery"
            address="Mansoura City, Gehan St"
            date="JAN 23, 2020"
            time="4:30 PM"
            status="Booking"
          />
          <DoctorBookingCard
            name="Hassan Ali"
            price={125}
            speciality="General Surgery"
            address="Mansoura City, Gehan St"
            date="JAN 23, 2020"
            time="4:30 PM"
            status="Booking"
          />
          <DoctorBookingCard
            name="Hassan Ali"
            price={125}
            speciality="General Surgery"
            address="Mansoura City, Gehan St"
            date="JAN 23, 2020"
            time="4:30 PM"
            status="Booking"
          />
          <DoctorBookingCard
            name="Hassan Ali"
            price={125}
            speciality="General Surgery"
            address="Mansoura City, Gehan St"
            date="JAN 23, 2020"
            time="4:30 PM"
            status="Booking"
          />
          <DoctorBookingCard
            name="Hassan Ali"
            price={125}
            speciality="General Surgery"
            address="Mansoura City, Gehan St"
            date="JAN 23, 2020"
            time="4:30 PM"
            status="Booking"
          />
          <DoctorBookingCard
            name="Hassan Ali"
            price={125}
            speciality="General Surgery"
            address="Mansoura City, Gehan St"
            date="JAN 23, 2020"
            time="4:30 PM"
            status="Booking"
          />
          <DoctorBookingCard
            name="Hassan Ali"
            price={125}
            speciality="General Surgery"
            address="Mansoura City, Gehan St"
            date="JAN 23, 2020"
            time="4:30 PM"
            status="Booking"
          />
          <DoctorBookingCard
            name="Hassan Ali"
            price={125}
            speciality="General Surgery"
            address="Mansoura City, Gehan St"
            date="JAN 23, 2020"
            time="4:30 PM"
            status="Booking"
          />
        </div>
      </div>
    );
  }
}

export default Appointments;
