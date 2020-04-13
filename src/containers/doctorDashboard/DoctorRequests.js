import React, { Component } from "react";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";
import { connect } from "react-redux";
import {
  SAGA_SEND_PRESCRIPTION,
  SAGA_SET_RE_EXAMINAION,
} from "../../actions/types";

const patientCard = [
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Home visit"
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Booking"
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Booking"
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Booking"
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Home visit"
  },
  {
    name: "Margot Maggio",
    address: "570 Doyle Avenue West Kalebbury",
    rate: 5,
    date: "JAN 23, 2020",
    time: "4:30 PM",
    state: "Home visit"
  }
];

class DoctorRequests extends Component {
  state = {
    pageNum: 0,
    menuVisiblity: -1,
  };

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
          {this.state.pageNum === 0
            ? patientCard.map((card, i) => (
                <PatientCard
                  key={i}
                  index={i}
                  name={card.name}
                  address={card.address}
                  rate={card.rate}
                  date={card.date}
                  time={card.time}
                  state={card.state}
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
            : this.state.pageNum === 1
            ? patientCard
                .filter((card) => card.state === "Booking")
                .map((card, i) => (
                  <PatientCard
                    key={i}
                    index={i}
                    name={card.name}
                    address={card.address}
                    rate={card.rate}
                    date={card.date}
                    time={card.time}
                    state={card.state}
                    type="examination"
                    request={true}
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
            : patientCard
                .filter((card) => card.state === "Home visit")
                .map((card, i) => (
                  <PatientCard
                    key={i}
                    index={i}
                    name={card.name}
                    address={card.address}
                    rate={card.rate}
                    date={card.date}
                    time={card.time}
                    state={card.state}
                    type="examination"
                    request={true}
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
        <Button className="btn btn-blue btn-lg see-more">See more</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
});

const mapDispatchToProps = (dispatch) => ({
  submitTime: (data) => dispatch({ type: SAGA_SET_RE_EXAMINAION, data }),
  sendPrescription: (data) => dispatch({ type: SAGA_SEND_PRESCRIPTION, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRequests);
