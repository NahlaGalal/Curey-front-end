import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import DoctorBox from "../components/Doctors and medications/DoctorBox";
import AvailableAppointments from "../components/Doctors and medications/AvailabeAppointments";
import ReactLoading from "react-loading";

class VisitDoctor extends Component {
  state = {
    doctor: {},
    error: ""
  };

  componentDidMount() {
    if (this.props.match.params.id !== this.props.doctor.id) {
      this.props.getDoctorData(
        this.props.match.params.id,
        this.props.api_token
      );
      this.setState({ doctor: {} });
    } else this.setState({ doctor: this.props.doctor });
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.doctor) !== JSON.stringify(this.props.doctor)
    ) {
      if (this.props.doctor.callup_fees)
        this.setState({ doctor: this.props.doctor });
      else
        this.setState({
          docctor: {},
          error: "This doctor isn't available for home visit services"
        });
    }
  }

  onBookAppointment = appointment_time => {
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
          <h2 className="heading-2">Home visit service</h2>
        </div>
        <div className="bookingDoctorContainer">
          {Object.keys(this.state.doctor).length ? (
            <React.Fragment>
              <DoctorBox
                name={this.state.doctor.full_name}
                speciality={this.state.doctor.speciality}
                address={this.state.doctor.address}
                price={this.state.doctor.callup_fees}
                image={this.state.doctor.image}
              />

              <AvailableAppointments
                getAvailableAppointments={this.availableAppontments}
                onBookAppointment={appointment_time =>
                  this.onBookAppointment(appointment_time)
                }
              />
            </React.Fragment>
          ) : this.state.error ? (
            <p className="bookingDoctorContainer__error">{this.state.error}</p>
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
    doctor: state.doctors.doctorData
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
      dispatch({ type: actions.SAGA_GET_DOCTOR, id, api_token })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitDoctor);
