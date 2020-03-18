import React, { Component } from "react";
import DoctorBox from "./DoctorBox";
import AvailableAppointments from "./AvailabeAppointments";
import { connect } from "react-redux";
import * as actions from "../../actions/types";

class BookingDoctor extends Component {
  doctorBookingHandler = () => {
    this.props.onBookAppointment(
      this.props.api_token,
      this.props.doctor_id,
      this.props.is_callup
    );
    console.log("test");
  };

  render() {
    return (
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

          <AvailableAppointments bookDoctor={this.doctorBookingHandler} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    api_token: state.user.api_token,
    doctor_id: state.doctors.doctorData.id,
    is_callup: state.doctors.doctorData.is_callup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBookAppointment: (api_token, doctor_id, is_callup) =>
      dispatch({
        type: actions.BOOK_APPOINTMENT,
        data: { api_token, doctor_id, is_callup }
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookingDoctor);
