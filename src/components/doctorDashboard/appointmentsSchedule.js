import React from "react";
import EditIcon from "../../assets/svg/edit.svg";
import Button from "../Button";

const AppointmentSchedule = props => (
  <div className="AppointmentSchedule">
    <div className="flex">
      <h4>{props.title}</h4>
      <Button className="btn">
        <img src={EditIcon} alt="edit"/>
      </Button>
    </div>

    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
    <p>1:00 PM to 1:15 PM</p>
  </div>
);

export default AppointmentSchedule;
