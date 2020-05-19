import React, { Component } from "react";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";
import { connect } from "react-redux";
import {
  SAGA_SEND_PRESCRIPTION,
  SAGA_SET_RE_EXAMINAION,
  SAGA_GET_DOCTOR_REQUESTS,
  SAGA_SEARCH_MEDICATION,
} from "../../actions/types";
import ReactLoading from "react-loading";

class DoctorRequests extends Component {
  state = {
    pageNum: 0,
    menuVisiblity: -1,
  };

  componentDidMount() {
    this.props.getRequests(this.props.api_token, 0, 12);
  }

  togglePageNumber = (pageNo) => {
    if (this.state.pageNum !== pageNo) {
      this.setState({
        pageNum: pageNo,
      });
    }
  };

  toggleMenuBox = (e, i) => {
    e.stopPropagation();
    let menuVisiblity = i;
    if (this.state.menuVisiblity === i) menuVisiblity = -1;
    this.setState({ menuVisiblity });
  };

  submitTime = (appointment_time, user_id) => {
    this.props.submitTime({
      api_token: this.props.api_token,
      appointment_time,
      is_callup: this.props.state === "Home visit" ? 1 : 0,
      user_id,
    });
  };

  generatePatientCard = (card, i) => (
    <PatientCard
      key={card.id}
      index={i}
      user_id={card.id}
      name={card.patient}
      address={card.address}
      rate={4}
      date={card.date}
      time={card.time}
      image={card.image}
      home_visit={card.home_visit}
      type="examination"
      request={true}
      toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
      menuVisibility={this.state.menuVisiblity}
      stopPropagation={(e) => e.stopPropagation()}
      medications={this.props.medications}
      sendPrescription={(medications) => {
        this.props.sendPrescription({
          api_token: this.props.api_token,
          appointment_id: card.id,
          items: medications.map((med) => ({
            product_id: med.id,
            dosage: med.frequency,
            per_week: med.period === "week" ? true : false,
          })),
        });
        this.setState({ menuVisiblity: -1 });
      }}
      getSearchMedication={(value) =>
        this.props.getSearchMedication(this.props.api_token, value)
      }
      submitTime={(time, user_id) => this.submitTime(time, user_id)}
    />
  );

  render() {
    const currentPage = ["All", "Bookings", "Home visits"];

    return (
      <div
        className="re-examination"
        onClick={() => this.setState({ menuVisiblity: -1 })}
      >
        <div
          className={
            "mb-40 signup__container__forms__toggler toggler active-" +
            this.state.pageNum
          }
        >
          {currentPage.map((type, i) => (
            <Button
              key={i}
              className="btn"
              onClick={() => {
                this.togglePageNumber(i);
              }}
            >
              {type}
            </Button>
          ))}
          <span className="signup__container__forms__toggler__pointer"></span>
        </div>
        {this.props.requests.length ? (
          <div className="re-examination__grid">
            {this.state.pageNum === 0
              ? this.props.requests.map((card, i) =>
                  this.generatePatientCard(card, i)
                )
              : this.state.pageNum === 1
              ? this.props.requests
                  .filter((card) => !card.home_visit)
                  .map((card, i) => this.generatePatientCard(card, i))
              : this.props.requests
                  .filter((card) => card.home_visit)
                  .map((card, i) => this.generatePatientCard(card, i))}
          </div>
        ) : !this.props.error ? (
          <ReactLoading
            type="spokes"
            color="#0066ff"
            className="loading center mb-40"
          />
        ) : (
          <p className="error">
            {" "}
            You don't have any re-examination appointmnents
          </p>
        )}
        {this.props.requests.length > 12 ? (
          <Button className="btn btn-lg btn-blue center">See more</Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  requests: state.doctorData.requests,
  medications: state.doctorData.searchMedication,
  error: state.doctorData.errors.error,
});

const mapDispatchToProps = (dispatch) => ({
  submitTime: (data) => dispatch({ type: SAGA_SET_RE_EXAMINAION, data }),
  sendPrescription: (data) => dispatch({ type: SAGA_SEND_PRESCRIPTION, data }),
  getRequests: (api_token, skip, limit) =>
    dispatch({ type: SAGA_GET_DOCTOR_REQUESTS, api_token, skip, limit }),
  getSearchMedication: (api_token, name) =>
    dispatch({ type: SAGA_SEARCH_MEDICATION, api_token, name }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRequests);
