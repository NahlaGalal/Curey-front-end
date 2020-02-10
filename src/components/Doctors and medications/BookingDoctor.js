import React from "react";
import DoctorBox from "./DoctorBox";
import AvailableAppointments from "./AvailabeAppointments";

const BookingDoctor = () => (
  <React.Fragment>
    <div className="pageHeader">
      <h2 className="heading-2">Booking the doctor</h2>
    </div>

    <div className="bookingDoctorContainer">
      <DoctorBox
        name="Hassan Ali"
        speciality="Pediatric Surgery, General Surgery"
        address=" Mansoura City, Gehan St "
        price={125}
      />

      <AvailableAppointments />
    </div>
  </React.Fragment>
);

export default BookingDoctor;
