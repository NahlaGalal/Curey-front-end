import React from "react";
import EditIcon from "../../assets/svg/Union-3.svg";
import { Link } from "react-router-dom";
import Button from "../Button";

const AvailableAppointments = (props) => {
  const doctorBookingHandler = (appointment_time, i, day) => {
    props.onBookAppointment(appointment_time, i, day);
  };

  const firstDay = props.firstDay.date
    ? new Date(`${props.firstDay.date} 00:00:00`) < new Date()
      ? "Today's appointments"
      : new Date(`${props.firstDay.date} 00:00:00`) <
        new Date().setDate(new Date().getDate() + 1)
      ? "Tomorrow's appointments"
      : `${new Date(props.firstDay.date)
          .toDateString()
          .split(" ")
          .slice(1, 3)
          .join(", ")} appointments`
    : "";
  const secondDay = props.secondDay.date
    ? new Date(`${props.secondDay.date} 00:00:00`) <
      new Date().setDate(new Date().getDate() + 1)
      ? "Tomorrow's appointments"
      : `${new Date(props.secondDay.date)
          .toDateString()
          .split(" ")
          .slice(1, 3)
          .join(", ")} appointments`
    : "";

  return (
    <div className="availableAppointments">
      <div className="availableAppointments__header">
        <h3 className="heading-3">Available appointments</h3>
        <Link to="/payment-method">
          <img src={EditIcon} alt="edit icon" /> Edit payment method
        </Link>
      </div>
      {Object.keys(props.firstDay).length ? (
        <div className="appointmentsGrid">
          <div className="appointmentsGrid__box">
            <h3 className="heading-3">{firstDay}</h3>
            {props.firstDay.available &&
              props.firstDay.available.map((time, i) => {
                let startTime = time.split(":");
                let endTime = [...startTime];
                let startHourPeriod = "AM", endHourPeriod = "AM";
                if (+startTime[0] > 12) {
                  startTime[0] = +startTime[0] - 12;
                  endTime[0] = +startTime[0] + 1;
                  startHourPeriod = "PM";
                  if(+startTime[0] !== 11) endHourPeriod = "PM";
                } else if(+startTime[0] === 0) {
                  startTime[0] = 12;
                  endTime[0] = 1;
                } else if(+startTime[0] === 12) {
                  endTime[0] = 1;
                  startHourPeriod = "PM";
                  endHourPeriod = "PM"
                } else {
                  endTime[0] = +startTime[0] + 1;
                  if(+startTime[0] === 11) endHourPeriod = "PM";
                }
                startTime = `${startTime[0]}:${startTime[1]}`;
                endTime = `${endTime[0]}:${endTime[1]}`;

                return (
                  <div className="appointment" key={time}>
                    <span>{`${startTime} ${startHourPeriod} to ${endTime} ${endHourPeriod}`}</span>
                    {!props.bookedOrder[i] ? (
                      <Button
                        className="btn btn-blue"
                        onClick={() =>
                          doctorBookingHandler(
                            `${props.firstDay.date} ${time}`,
                            i,
                            1
                          )
                        }
                      >
                        Book
                      </Button>
                    ) : (
                      <React.Fragment>
                        <Link to="/appointments">
                          <Button className="btn btn-green">Booked</Button>
                        </Link>
                        <div className="appointment__booked">
                          Click on this button to go to appoinments
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="appointmentsGrid__box">
            <h3 className="heading-3">{secondDay}</h3>
            {props.secondDay.available &&
              props.secondDay.available.map((time, i) => {
                let startTime = time.split(":");
                let endTime = [...startTime];
                let startHourPeriod = "AM",
                  endHourPeriod = "AM";
                if (+startTime[0] > 12) {
                  startTime[0] = +startTime[0] - 12;
                  endTime[0] = +startTime[0] + 1;
                  startHourPeriod = "PM";
                  if (+startTime[0] !== 11) endHourPeriod = "PM";
                } else if (+startTime[0] === 0) {
                  startTime[0] = 12;
                  endTime[0] = 1;
                } else if (+startTime[0] === 12) {
                  endTime[0] = 1;
                  startHourPeriod = "PM";
                  endHourPeriod = "PM";
                } else {
                  endTime[0] = +startTime[0] + 1;
                  if (+startTime[0] === 11) endHourPeriod = "PM";
                }
                startTime = `${startTime[0]}:${startTime[1]}`;
                endTime = `${endTime[0]}:${endTime[1]}`;

                return (
                  <div className="appointment" key={time}>
                    <span>{`${startTime} ${startHourPeriod} to ${endTime} ${endHourPeriod}`}</span>
                    {!props.bookedOrder[props.firstDay.available.length + i] ? (
                      <Button
                        className="btn btn-blue"
                        onClick={() =>
                          doctorBookingHandler(
                            `${props.secondDay.date} ${time}`,
                            i,
                            2
                          )
                        }
                      >
                        Book
                      </Button>
                    ) : (
                      <React.Fragment>
                        <Link to="/appointments">
                          <Button className="btn btn-green">Booked</Button>
                        </Link>
                        <div className="appointment__booked">
                          Click on this button to go to appoinments
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <p className="error">
          {" "}
          No appointments available
        </p>
      )}
    </div>
  );
};

export default AvailableAppointments;
