import React, { Component } from "react";
import EditIcon from "../../assets/svg/Union-3.svg";
import { Link } from "react-router-dom";
import Button from "../Button";

class AvailableAppointments extends Component {
  doctorBookingHandler = () => {
    let appointment_time = "2020-03-18 12:10:00";
    this.props.onBookAppointment(appointment_time);
  };

  render() {
    return (
      <div className="availableAppointments">
        <div className="availableAppointments__header">
          <h3 className="heading-3">Available appointments</h3>
          <Link to="/payment-method">
            <img src={EditIcon} alt="edit icon" /> Edit payment method
          </Link>
        </div>
        <div className="appointmentsGrid">
          <div className="appointmentsGrid__box">
            <h3 className="heading-3">Today's appointments</h3>

            <div className="appointment">
              <span>1:00 PM to 1:15 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>1:15 PM to 1:30 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>1:30 PM to 1:45 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>1:00 PM to 1:15 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>2:00 PM to 2:15 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>2:15 PM to 2:30 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>2:45 PM to 3:00 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>3:00 PM to 3:15 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>
          </div>

          <div className="appointmentsGrid__box">
            <h3 className="heading-3">Tomorrow's appointments </h3>
            <div className="appointment">
              <span>1:00 PM to 1:15 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>1:15 PM to 1:30 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>1:30 PM to 1:45 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>1:00 PM to 1:15 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>2:00 PM to 2:15 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>2:15 PM to 2:30 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>2:45 PM to 3:00 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>

            <div className="appointment">
              <span>3:00 PM to 3:15 PM</span>
              <Button
                className="btn btn-blue"
                onClick={this.doctorBookingHandler}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AvailableAppointments;
