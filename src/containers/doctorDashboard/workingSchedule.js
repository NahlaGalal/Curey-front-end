import React, { Component } from "react";
import Button from "../../components/Button";
import Next from "../../assets/svg/next (1) (1).svg";
import Prev from "../../assets/svg/next (1).svg";
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
            <Button className=" btn btn-green scheduleBox__btn">
              Add schedule
            </Button>
          </div>
          <span className="scheduleBox__indicators">
            <img className="icon" src={Prev} alt="icon" />1 2 3 4 5{" "}
            <img alt="icon" src={Next} />
          </span>
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
