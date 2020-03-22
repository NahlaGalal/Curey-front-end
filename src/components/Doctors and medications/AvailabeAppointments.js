import React, { Component } from "react";
import EditIcon from "../../assets/svg/Union-3.svg";
import { Link } from "react-router-dom";
import Button from "../Button";

class AvailableAppointments extends Component {
  state = { showPopup: false };

  doctorBookingHandler = (appointment_time, i, day) => {
    this.props.onBookAppointment(appointment_time, i, day);
  };

  render() {
    // const today = new Date();
    // let tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    const firstDay = this.props.firstDay.date
      ? new Date(`${this.props.firstDay.date} 00:00:00`) < new Date()
        ? "Today's appointments"
        : new Date(`${this.props.firstDay.date} 00:00:00`) <
          new Date().setDate(new Date().getDate() + 1)
        ? "Tomorrow's appointments"
        : `${new Date(this.props.firstDay.date)
            .toDateString()
            .split(" ")
            .slice(1, 3)
            .join(", ")} appointments`
      : "";
    const secondDay = this.props.secondDay.date
      ? new Date(`${this.props.secondDay.date} 00:00:00`) <
        new Date().setDate(new Date().getDate() + 1)
        ? "Tomorrow's appointments"
        : `${new Date(this.props.secondDay.date)
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
        {Object.keys(this.props.firstDay).length ? (
          <div className="appointmentsGrid">
            <div className="appointmentsGrid__box">
              <h3 className="heading-3">{firstDay}</h3>
              {this.props.firstDay.available &&
                this.props.firstDay.available.map((time, i) => {
                  let startTime = time.split(":");
                  let endTime = [...startTime];
                  let hourPeriod = "AM";
                  if (+startTime[0] > 12) {
                    startTime[0] = +startTime[0] - 12;
                    endTime[0] = +startTime[0] + 1;
                    hourPeriod = "PM";
                  }
                  startTime = `${startTime[0]}:${startTime[1]}`;
                  endTime = `${endTime[0]}:${endTime[1]}`;

                  return (
                    <div className="appointment" key={time}>
                      <span>{`${startTime} ${hourPeriod} to ${endTime} ${hourPeriod}`}</span>
                      {!this.props.bookedOrder[i] ? (
                        <Button
                          className="btn btn-blue"
                          onClick={() =>
                            this.doctorBookingHandler(
                              `${this.props.firstDay.date} ${time}`,
                              i,
                              1
                            )
                          }
                        >
                          Book
                        </Button>
                      ) : (
                        <React.Fragment>
                          <Link
                            to="/appointments"
                            onMouseMove={() =>
                              this.setState({ showPopup: true })
                            }
                            onMouseLeave={() =>
                              this.setState({ showPopup: false })
                            }
                          >
                            <Button className="btn btn-green">Booked</Button>
                          </Link>
                          <div
                            className={`appointment__booked ${
                              !this.state.showPopup ? "hidden" : ""
                            }`}
                          >
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
              {this.props.secondDay.available &&
                this.props.secondDay.available.map((time, i) => {
                  let startTime = time.split(":");
                  let endTime = [...startTime];
                  let hourPeriod = "AM";
                  if (+startTime[0] > 12) {
                    startTime[0] = +startTime[0] - 12;
                    endTime[0] = +startTime[0] + 1;
                    hourPeriod = "PM";
                  }
                  startTime = `${startTime[0]}:${startTime[1]}`;
                  endTime = `${endTime[0]}:${endTime[1]}`;

                  return (
                    <div className="appointment" key={time}>
                      <span>{`${startTime} ${hourPeriod} to ${endTime} ${hourPeriod}`}</span>
                      {!this.props.bookedOrder[
                        this.props.firstDay.available.length + i
                      ] ? (
                        <Button
                          className="btn btn-blue"
                          onClick={() =>
                            this.doctorBookingHandler(
                              `${this.props.secondDay.date} ${time}`,
                              i,
                              2
                            )
                          }
                        >
                          Book
                        </Button>
                      ) : (
                        <React.Fragment>
                          <Link
                            to="/appointments"
                            onMouseMove={() =>
                              this.setState({ showPopup: true })
                            }
                            onMouseLeave={() =>
                              this.setState({ showPopup: false })
                            }
                          >
                            <Button className="btn btn-green">Booked</Button>
                          </Link>
                          <div
                            className={`appointment__booked ${
                              !this.state.showPopup ? "hidden" : ""
                            }`}
                          >
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
          <p className="availableAppointments__error"> No appointments available</p>
        )}
      </div>
    );
  }
}

export default AvailableAppointments;
