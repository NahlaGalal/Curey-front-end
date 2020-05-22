import React, { Component } from "react";
import BarChart from "../../components/pharmacy/bar-chart";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";
import { connect } from "react-redux";
import {
  SAGA_SEND_PRESCRIPTION,
  SAGA_SET_RE_EXAMINAION,
  SAGA_GET_DOCTOR_STATEMENT,
  SAGA_SEARCH_MEDICATION,
} from "../../actions/types";
import ReactLoading from "react-loading";

class DoctorStatement extends Component {
  state = {
    filter: "All",
    menuVisiblity: -1,
    pageNum: 0,
    data: [
      { value: 370, month: "Jan" },
      { value: 70, month: "Feb" },
      { value: 350, month: "Mar" },
      { value: 600, month: "Apr" },
      { value: 250, month: "May" },
      { value: 50, month: "June" },
      { value: 70, month: "Feb2" },
      { value: 350, month: "Oct" },
      { value: 600, month: "Nov" },
      { value: 325, month: "Dec" },
    ],
  };

  componentDidMount() {
    this.props.getDoctorDashboard(this.props.api_token, this.props.history);
  }

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
    }, this.props.history);
  };

  togglePageNumber = (pageNo) => {
    if (this.state.pageNum !== pageNo) {
      this.setState({
        pageNum: pageNo,
      });
    }
  };

  generatePatientCard = (card, i) => (
    <PatientCard
      key={i}
      index={i}
      user_id={card.id}
      name={card.patient}
      address={card.address}
      image={card.image}
      rate={card.rate}
      date={card.date}
      time={card.time}
      home_visit={card.home_visit}
      re_examination={card.re_examination}
      request={false}
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
        }, this.props.history);
        this.setState({ menuVisiblity: -1 });
      }}
      getSearchMedication={(value) =>
        this.props.getSearchMedication(this.props.api_token, value, this.props.history)
      }
      submitTime={(time, user_id) => this.submitTime(time, user_id)}
    />
  );

  render() {
    const currentPage = ["All", "Bookings", "Home visits", "Re-examinations"];

    return (
      <div
        className="doctorStatement"
        onClick={() => this.setState({ menuVisiblity: -1 })}
      >
        <div className="pharmacyStatment__statisticis mb-56">
          <h2 className="heading-2 mb-32">Statistics</h2>
          <div className="pharmacyStatment__statisticis--grid">
            <BarChart
              data={this.state.data}
              title="Number of bookings per month"
            />
            <BarChart
              data={this.state.data}
              title="Number of home visits per month"
            />
            <BarChart
              data={this.state.data}
              title="Number of Re-examinations per month"
            />
          </div>
        </div>

        <div className="performedRequests mb-40">
          <h2 className="heading-2 mb-32">Performed requests</h2>
          <div
            className={
              "mb-40 signup__container__forms__toggler four-parts toggler active-" +
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
          {this.props.statement.length ? (
            <div className="performedRequests__grid mt-41 mb-40">
              {this.state.pageNum === 0
                ? this.props.statement.map((card, i) =>
                    this.generatePatientCard(card, i)
                  )
                : this.state.pageNum === 1
                ? this.props.statement
                    .filter((card) => !card.home_visit)
                    .map((card, i) => this.generatePatientCard(card, i))
                : this.state.pageNum === 2
                ? this.props.statement
                    .filter((card) => card.home_visit)
                    .map((card, i) => this.generatePatientCard(card, i))
                : this.props.statement
                    .filter((card) => card.re_examination && !card.home_visit)
                    .map((card, i) => this.generatePatientCard(card, i))}
            </div>
          ) : !this.props.error ? (
            <ReactLoading
              type="spokes"
              color="#0066ff"
              className="loading center mb-40"
            />
          ) : (
            <p className="error"> You didn't have any appointmnents</p>
          )}
          {this.props.statement.length > 12 ? (
            <Button className="btn btn-lg btn-blue center">See more</Button>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  statement: state.doctorData.statement,
  medications: state.doctorData.searchMedication,
  error: state.doctorData.errors.error,
});

const mapDispatchToProps = (dispatch) => ({
  submitTime: (data, history) => dispatch({ type: SAGA_SET_RE_EXAMINAION, data, history }),
  sendPrescription: (data, history) => dispatch({ type: SAGA_SEND_PRESCRIPTION, data, history }),
  getDoctorDashboard: (api_token, history) =>
    dispatch({ type: SAGA_GET_DOCTOR_STATEMENT, api_token, history }),
  getSearchMedication: (api_token, name, history) =>
    dispatch({ type: SAGA_SEARCH_MEDICATION, api_token, name, history }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorStatement);
