import React, { Component } from "react";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";
import { connect } from "react-redux";
import {
  SAGA_SEND_PRESCRIPTION,
  SAGA_SET_RE_EXAMINAION,
  SAGA_GET_DOCTOR_REQUESTS,
} from "../../actions/types";
import ReactLoading from "react-loading";

class DoctorRequests extends Component {
  state = {
    pageNum: 0,
    menuVisiblity: -1,
  };

  componentDidMount() {
    this.props.getRequests(this.props.api_token);
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

  submitTime = (time) => {
    this.props.submitTime({
      api_token: this.props.api_token,
      appointment_time: time,
      is_callup: this.props.state === "Home visit" ? 1 : 0,
      user_id: 5,
    });
  };

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
        <div className="re-examination__grid">
          {this.state.pageNum === 0 && this.props.requests.length ? (
            this.props.requests.map((card, i) => (
              <PatientCard
                key={card.id}
                index={card.id}
                name={card.patient}
                address={card.address}
                rate={4}
                date={card.date}
                time={card.timestamp}
                home_visit={card.home_visit}
                type="examination"
                request={true}
                toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                menuVisibility={this.state.menuVisiblity}
                stopPropagation={(e) => e.stopPropagation()}
                sendPrescription={(medications) =>
                  this.props.sendPrescription({
                    api_token: this.props.api_token,
                    // appointment_id: med.id,
                    appointment_id: 381,
                    items: medications.map((med) => ({
                      // product_id: med.name,
                      product_id: 5,
                      dosage: med.frequency,
                      per: med.per,
                    })),
                  })
                }
                submitTime={(time) => this.submitTime(time)}
              />
            ))
          ) : this.state.pageNum === 1 && this.props.requests.length ? (
            this.props.requests
              .filter((card) => card.home_visit === 0)
              .map((card, i) => (
                <PatientCard
                  key={card.id}
                  index={card.id}
                  name={card.patient}
                  address={card.address}
                  rate={4}
                  date={card.date}
                  time={card.timestamp}
                  home_visit={card.home_visit}
                  type="examination"
                  request={true}
                  toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                  menuVisibility={this.state.menuVisiblity}
                  stopPropagation={(e) => e.stopPropagation()}
                  sendPrescription={(medications) =>
                    this.props.sendPrescription({
                      api_token: this.props.api_token,
                      // appointment_id: med.id,
                      appointment_id: 381,
                      items: medications.map((med) => ({
                        // product_id: med.name,
                        product_id: 5,
                        dosage: med.frequency,
                        per: med.per,
                      })),
                    })
                  }
                  submitTime={(time) => this.submitTime(time)}
                />
              ))
          ) : this.props.requests.length ? (
            this.props.requests
              .filter((card) => card.home_visit === 1)
              .map((card, i) => (
                <PatientCard
                  key={card.id}
                  index={card.id}
                  name={card.patient}
                  address={card.address}
                  rate={4}
                  date={card.date}
                  time={card.timestamp}
                  home_visit={card.home_visit}
                  type="examination"
                  request={true}
                  toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                  menuVisibility={this.state.menuVisiblity}
                  stopPropagation={(e) => e.stopPropagation()}
                  sendPrescription={(medications) =>
                    this.props.sendPrescription({
                      api_token: this.props.api_token,
                      // appointment_id: med.id,
                      appointment_id: 381,
                      items: medications.map((med) => ({
                        // product_id: med.name,
                        product_id: 5,
                        dosage: med.frequency,
                        per: med.per,
                      })),
                    })
                  }
                  submitTime={(time) => this.submitTime(time)}
                />
              ))
          ) : (
            <ReactLoading
              type="spokes"
              color="#0066ff"
              className="loading center mb-40"
            />
          )}
        </div>
        <Button className="btn btn-blue btn-lg see-more">See more</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  requests: state.doctorDashboard.requests,
});

const mapDispatchToProps = (dispatch) => ({
  submitTime: (data) => dispatch({ type: SAGA_SET_RE_EXAMINAION, data }),
  sendPrescription: (data) => dispatch({ type: SAGA_SEND_PRESCRIPTION, data }),
  getRequests: (api_token) =>
    dispatch({ type: SAGA_GET_DOCTOR_REQUESTS, api_token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRequests);
