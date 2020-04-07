import React, { Component } from "react";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import ReactLoading from "react-loading";

// const patientCard = [
//   {
//     name: "Margot Maggio",
//     address: "570 Doyle Avenue West Kalebbury",
//     rate: 5,
//     date: "JAN 23, 2020",
//     time: "4:30 PM",
//     state: "Home visit",
//   },
//   {
//     name: "Margot Maggio",
//     address: "570 Doyle Avenue West Kalebbury",
//     rate: 5,
//     date: "JAN 23, 2020",
//     time: "4:30 PM",
//     state: "Booking",
//   },
//   {
//     name: "Margot Maggio",
//     address: "570 Doyle Avenue West Kalebbury",
//     rate: 5,
//     date: "JAN 23, 2020",
//     time: "4:30 PM",
//     state: "Booking",
//   },
//   {
//     name: "Margot Maggio",
//     address: "570 Doyle Avenue West Kalebbury",
//     rate: 5,
//     date: "JAN 23, 2020",
//     time: "4:30 PM",
//     state: "Booking",
//   },
//   {
//     name: "Margot Maggio",
//     address: "570 Doyle Avenue West Kalebbury",
//     rate: 5,
//     date: "JAN 23, 2020",
//     time: "4:30 PM",
//     state: "Home visit",
//   },
//   {
//     name: "Margot Maggio",
//     address: "570 Doyle Avenue West Kalebbury",
//     rate: 5,
//     date: "JAN 23, 2020",
//     time: "4:30 PM",
//     state: "Home visit",
//   },
// ];

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
                toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                menuVisibility={this.state.menuVisiblity}
                stopPropagation={(e) => e.stopPropagation()}
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
                  toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                  menuVisibility={this.state.menuVisiblity}
                  stopPropagation={(e) => e.stopPropagation()}
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
                  toggleMenuBox={(e) => this.toggleMenuBox(e, i)}
                  menuVisibility={this.state.menuVisiblity}
                  stopPropagation={(e) => e.stopPropagation()}
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
  getRequests: (api_token) =>
    dispatch({ type: actions.SAGA_GET_DOCTOR_REQUESTS, api_token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRequests);
