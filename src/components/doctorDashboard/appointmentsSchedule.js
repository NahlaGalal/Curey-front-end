import React from "react";
import EditIcon from "../../assets/svg/edit.svg";

const AppointmentSchedule = props => (
  <div className="AppointmentSchedule">
    <h4>{props.title}</h4>
    <img src={EditIcon} alt="edit" className="AppointmentSchedule__icon" />

    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
  </div>
);

export default AppointmentSchedule;
