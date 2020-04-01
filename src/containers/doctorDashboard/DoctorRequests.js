import React, { Component } from "react";
import Button from "../../components/Button";
import PatientCard from "../../components/doctorDashboard/patientCard";

class DoctorRequests extends Component {
  state = {
    pageNum: 0
  };

  togglePageNumber = pageNo => {
    if (this.state.pageNum !== pageNo) {
      this.setState({
        pageNum: pageNo
      });
    }
  };
  render() {
    const currentPage = ["All", "Bookings", "Home visits"];

    return (
      <div className="re-examination">
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
          {this.state.pageNum === 0 ? (
            <React.Fragment>
              {" "}
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={5}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Booking"
                reExamination={false}
              />
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={4.3}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Booking"
                reExamination={false}
              />
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={3.7}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Booking"
                reExamination={false}
              />
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={1}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Home visit"
                reExamination={false}
              />
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={2.35}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Home visit"
                reExamination={false}
              />
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={0}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Home visit"
                reExamination={false}
              />
            </React.Fragment>
          ) : this.state.pageNum === 1 ? (
            <React.Fragment>
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={5}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Booking"
                reExamination={false}
              />
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={5}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Booking"
                reExamination={false}
              />
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={5}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Booking"
                reExamination={false}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={5}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Home visit"
                reExamination={false}
              />
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={5}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Home visit"
                reExamination={false}
              />
              <PatientCard
                name="Margot Maggio"
                address="570 Doyle Avenue West Kalebbury"
                rate={5}
                date="JAN 23, 2020"
                time="4:30 PM"
                state="Home visit"
                reExamination={false}
              />
            </React.Fragment>
          )}
        </div>
        <Button className="btn btn-blue btn-lg see-more">See more</Button>
      </div>
    );
  }
}

export default DoctorRequests;
