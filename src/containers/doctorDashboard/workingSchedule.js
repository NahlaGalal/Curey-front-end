import React, { Component } from "react";
import Button from "../../components/Button";
import Next from "../../assets/svg/next.svg";
import Prev from "../../assets/svg/prev.svg";
import AppointmentSchedule from "../../components/doctorDashboard/appointmentsSchedule";

class WorkingSchedule extends Component {
  state = {};
  render() {
    return (
      <div className="workingSchedule">
        <div className="scheduleBox">
          <div className="flex">
            <h3 className="heading-3">
              Your working schdule for bookings service
            </h3>
            <Button className="btn btn-green-dark scheduleBox__btn">
              Add schedule
            </Button>
          </div>
          <p className="scheduleBox__indicators">
            <img className="icon" src={Prev} alt="icon" />
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <img alt="icon" src={Next} />
          </p>
          <div className="scheduleBox__grid">
            <AppointmentSchedule title="Today's appointments" />
            <AppointmentSchedule title="Mar, 21 appointments" />
            <AppointmentSchedule title="Mar, 22 appointments" />
            <AppointmentSchedule title="Mar, 23 appointments" />
          </div>
        </div>
        <div className="homeVisit">
          <input type="checkbox" id="homeVisit" />
          <label htmlFor="homeVisit">
            <span></span> Home visit srevice
          </label>
        </div>
      </div>
    );
  }
}

export default WorkingSchedule;
