import React from "react";
import EditIcon from "../../assets/svg/Union-3.svg";
import { Link } from "react-router-dom";

const AvailableAppointments = props => (
  <div className="availableAppointments">
    {console.log(props)}
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
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>1:15 PM to 1:30 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>1:30 PM to 1:45 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>1:00 PM to 1:15 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>2:00 PM to 2:15 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>2:15 PM to 2:30 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>2:45 PM to 3:00 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>3:00 PM to 3:15 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>
      </div>

      <div className="appointmentsGrid__box">
        <h3 className="heading-3">Tomorrow's appointments </h3>
        <div className="appointment">
          <span>1:00 PM to 1:15 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>1:15 PM to 1:30 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>1:30 PM to 1:45 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>1:00 PM to 1:15 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>2:00 PM to 2:15 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>2:15 PM to 2:30 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>2:45 PM to 3:00 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>

        <div className="appointment">
          <span>3:00 PM to 3:15 PM</span>
          <button className="btn btn-blue" onClick={props.bookDoctor}>
            Book
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AvailableAppointments;
