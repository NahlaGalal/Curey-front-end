import React, { Component } from "react";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";
import { connect } from "react-redux";
import {
  SAGA_SEND_PRESCRIPTION,
  SAGA_SET_RE_EXAMINAION,
  SAGA_GET_DOCTOR_REEXAMINATION,
} from "../../actions/types";
import ReactLoading from "react-loading";

class ReExamination extends Component {
  state = {
    pageNum: 0,
    menuVisiblity: -1,
  };

  componentDidMount() {
    this.props.getReExaminations(this.props.api_token);
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
        {this.props.re_examination.length ? (
          <div className="re-examination__grid">
            {this.state.pageNum === 0
              ? this.props.re_examination.map((card, i) => (
                  <PatientCard
                    key={i}
                    index={i}
                    name={card.name}
                    address={card.address}
                    rate={card.rate}
                    date={card.date}
                    time={card.time}
                    image={card.image}
                    home_visit={card.home_visit}
                    type="re-examination"
                    request={false}
                    toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                    menuVisibility={this.state.menuVisiblity}
                    stopPropagation={(e) => e.stopPropagation()}
                    sendPrescription={(medications) =>
                      this.props.sendPrescription({
                        api_token: this.props.api_token,
                        appointment_id: card.id,
                        items: medications.map((med) => ({
                          product_id: med.name,
                          dosage: med.frequency,
                          per: med.per,
                        })),
                      })
                    }
                    submitTime={(time) => this.submitTime(time)}
                  />
                ))
              : this.state.pageNum === 1
              ? this.props.re_examination
                  .filter((card) => !card.home_visit)
                  .map((card, i) => (
                    <PatientCard
                      key={i}
                      index={i}
                      name={card.name}
                      address={card.address}
                      rate={card.rate}
                      date={card.date}
                      time={card.time}
                      image={card.image}
                      home_visit={card.home_visit}
                      type="re-examination"
                      request={false}
                      toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                      menuVisibility={this.state.menuVisiblity}
                      stopPropagation={(e) => e.stopPropagation()}
                      sendPrescription={(medications) =>
                        this.props.sendPrescription({
                          api_token: this.props.api_token,
                          appointment_id: card.id,
                          items: medications.map((med) => ({
                            product_id: med.name,
                            dosage: med.frequency,
                            per: med.per,
                          })),
                        })
                      }
                      submitTime={(time) => this.submitTime(time)}
                    />
                  ))
              : this.props.re_examination
                  .filter((card) => card.home_visit)
                  .map((card, i) => (
                    <PatientCard
                      key={i}
                      index={i}
                      name={card.name}
                      address={card.address}
                      rate={card.rate}
                      date={card.date}
                      time={card.time}
                      image={card.image}
                      home_visit={card.home_visit}
                      type="re-examination"
                      request={false}
                      toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                      menuVisibility={this.state.menuVisiblity}
                      stopPropagation={(e) => e.stopPropagation()}
                      sendPrescription={(medications) =>
                        this.props.sendPrescription({
                          api_token: this.props.api_token,
                          appointment_id: card.id,
                          items: medications.map((med) => ({
                            product_id: med.name,
                            dosage: med.frequency,
                            per: med.per,
                          })),
                        })
                      }
                      submitTime={(time) => this.submitTime(time)}
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
          <p className="re-examination__error">
            {" "}
            You don't have any re-examination appointmnents
          </p>
        )}
        {this.props.re_examination.length > 12 ? (
          <Button className="btn btn-lg btn-blue center">See more</Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  re_examination: state.doctorData.re_examinations,
  error: state.doctorData.errors.error,
});

const mapDispatchToProps = (dispatch) => ({
  submitTime: (data) => dispatch({ type: SAGA_SET_RE_EXAMINAION, data }),
  sendPrescription: (data) => dispatch({ type: SAGA_SEND_PRESCRIPTION, data }),
  getReExaminations: (api_token) =>
    dispatch({ type: SAGA_GET_DOCTOR_REEXAMINATION, api_token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReExamination);
