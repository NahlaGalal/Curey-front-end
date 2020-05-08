import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import DoctorBox from "../components/Doctors and medications/DoctorBox";
import AvailableAppointments from "../components/Doctors and medications/AvailabeAppointments";
import ReactLoading from "react-loading";

class BookingDoctor extends Component {
  state = {
    doctor: {},
    bookedOrder: [],
    bookId: null
  };

  componentDidMount() {
    if (this.props.match.params.id !== this.props.doctor.id) {
      this.props.getDoctorData(
        this.props.match.params.id,
        this.props.api_token
      );
      this.setState({ doctor: {} });
    } else this.setState({ doctor: this.props.doctor });

    this.props.getAvailableAppointments(
      this.props.api_token,
      this.props.match.params.id
    );
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.doctor) !== JSON.stringify(this.props.doctor)
    ) {
      if (
        this.props.doctor.appointments &&
        this.props.doctor.appointments.first_day.available
      ) {
        const arr = new Array(
          this.props.doctor.appointments.first_day.available.length +
            this.props.doctor.appointments.second_day.available.length
        ).fill(0);
        this.setState({
          bookedOrder: arr,
          doctor: this.props.doctor
        });
      } else this.setState({ doctor: this.props.doctor });
    }
    if (
      JSON.stringify(prevProps.success) !==
        JSON.stringify(this.props.success) &&
      this.props.success
    ) {
      this.setState({
        bookedOrder: this.state.bookedOrder.fill(
          1,
          +this.state.bookId,
          +this.state.bookId + 1
        )
      });
    }
  }

  onBookAppointment = (appointment_time, i, day) => {
    this.setState({
      bookId:
        day === 1
          ? +i
          : +i + +this.props.doctor.appointments.first_day.available.length
    });
    const is_callup =
      this.props.match.url.split("/")[1] === "bookingDoctor" ? 0 : 1;
    this.props.onBookAppointment(
      this.props.api_token,
      this.props.doctor.id,
      is_callup,
      appointment_time
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="pageHeader">
          <h2 className="heading-2">Booking the doctor</h2>
        </div>
        <div className="bookingDoctorContainer">
          {Object.keys(this.state.doctor).length ? (
            <React.Fragment>
              <DoctorBox
                name={this.state.doctor.full_name}
                speciality={this.state.doctor.speciality}
                address={this.state.doctor.address}
                price={this.state.doctor.fees}
                image={this.state.doctor.image}
              />

              <AvailableAppointments
                onBookAppointment={(appointment_time, i, day) =>
                  this.onBookAppointment(appointment_time, i, day)
                }
                firstDay={
                  this.props.doctor.appointments
                    ? this.props.doctor.appointments.first_day
                    : {}
                }
                secondDay={
                  this.props.doctor.appointments
                    ? this.props.doctor.appointments.second_day
                    : {}
                }
                bookedOrder={this.state.bookedOrder}
              />
            </React.Fragment>
          ) : (
            <ReactLoading type="spokes" color="#0066ff" className="loading" />
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    api_token: state.user.api_token,
    doctor: state.doctors.doctorData,
    success: state.appointments.success,
    error: state.appointments.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBookAppointment: (api_token, doctor_id, is_callup, appointment_time) =>
      dispatch({
        type: actions.BOOK_APPOINTMENT,
        data: { api_token, doctor_id, is_callup, appointment_time }
      }),
    getDoctorData: (id, api_token) =>
      dispatch({ type: actions.SAGA_GET_DOCTOR, id, api_token }),
    getAvailableAppointments: (api_token, doctor_id) =>
      dispatch({
        type: actions.SAGA_GET_DOCTOR_APPOINTMENTS,
        api_token,
        doctor_id
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDoctor);
