import React, { Component } from "react";
import Search from "../../components/Doctors and medications/Search";
import Button from "../../components/Button";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import ReactLoading from "react-loading";
import DoctoPrescriptionCard from "../../components/doctorDashboard/DoctorPrescriptionCard";

class PrescriptionList extends Component {
  componentDidMount() {
    this.props.getPrescriptions(this.props.api_token);
  }

  render() {
    return (
      <div className="PrescriptionList">
        <Search
          placeholder="Search through the list...."
          type="medications"
          withFilter
        />

        {this.props.prescriptions.length ? (
          <div className="PrescriptionList__grid">
            {this.props.prescriptions.map((el, index) => (
              <DoctoPrescriptionCard
                key={index}
                name={el.patient}
                image={el.image}
                address={el.address}
                medications={el.details}
              />
            ))}
          </div>
        ) : !this.props.error ? (
          <ReactLoading
            type="spokes"
            color="#0066ff"
            className="loading center mb-40"
          />
        ) : (
          <p className="error">
            You don't have any re-examination appointmnents
          </p>
        )}
        {this.props.prescriptions.length > 12 ? (
          <Button className="btn btn-lg btn-blue center">See more</Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  prescriptions: state.doctorData.prescriptions,
  error: state.doctorData.errors.error,
});

const mapDispatchToProps = (dispatch) => ({
  getPrescriptions: (api_token) =>
    dispatch({ type: actions.SAGA_GET_DOCTOR_PRESCRIPTIONS, api_token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionList);
