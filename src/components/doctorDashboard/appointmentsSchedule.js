import React from "react";
import EditIcon from "../../assets/svg/edit.svg";
import DeleteIcon from "../../assets/svg/delete.svg";
import Button from "../Button";

const AppointmentSchedule = (props) => {
  let appointments = [];
  props.scheduleBegining.forEach((time, i) => {
    let hour = +time.slice(0, 2);
    while (hour < +props.scheduleEnding[i].slice(0, 2)) {
      let start_time = !hour
        ? `12:00 AM`
        : hour > 12
        ? `${time.replace(time.slice(0, 2), hour - 12).slice(0, -3)} PM`
        : hour === 12
        ? `${time.slice(0, -3)} PM`
        : `${time.slice(0, -3)} AM`;
      let end_time =
        hour === 23
          ? `12:00:00 AM`
          : hour >= 12
          ? `${time.replace(time.slice(0, 2), hour - 11).slice(0, -3)} PM`
          : hour === 11
          ? `${time.replace(time.slice(0, 2), hour + 1).slice(0, -3)} PM`
          : `${time.replace(time.slice(0, 2), hour + 1).slice(0, -3)} AM`;
      appointments.push({
        from: start_time,
        to: end_time,
      });
      time = time.replace(time.slice(0, 2), +time.slice(0, 2) + 1);
      hour++;
    }
  });

  return (
    <div className="AppointmentSchedule">
      <div className="flex">
        <h4>{props.title}</h4>
        <Button className="btn" onClick={props.deleteDay}>
          <img src={DeleteIcon} alt="edit" style={{marginRight: 8}}/>
        </Button>
        <Button className="btn" onClick={props.updateDay}>
          <img src={EditIcon} alt="edit" />
        </Button>
      </div>
      {appointments.map((time, i) => (
        <p key={i}>
          {time.from} to {time.to}
        </p>
      ))}
    </div>
  );
};

export default AppointmentSchedule;
