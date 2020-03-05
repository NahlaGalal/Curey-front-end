import React, { Component } from "react";
import doctorImg from "../../assets/images/Hassan.png";
import Button from "../Button";
import ConfirmPrescription from "./ConfirmPrescription";

const notifications = [
  {
    doctorImg,
    doctorName: "Dr Hassan Ali",
    time: "20 minutes ago"
  },
  {
    doctorImg,
    doctorName: "Dr Hassan Ali",
    time: "20 minutes ago"
  },
  {
    doctorImg,
    doctorName: "Dr Hassan Ali",
    time: "20 minutes ago"
  },
  {
    doctorImg,
    doctorName: "Dr Hassan Ali",
    time: "20 minutes ago"
  }
];

class NotificationList extends Component {
  state = {
    confirmPrescriptionBox: false
  };

  render() {
    return (
      <React.Fragment>
        <div className="Notifications">
          {notifications.map((notification, i) => (
            <React.Fragment key={i}>
              <Button
                className="Notifications__notification btn"
                onClick={() => this.setState({ confirmPrescriptionBox: true })}
              >
                <img src={notification.doctorImg} alt="Hassan Ali" />
                <div>
                  <p>
                    {notification.doctorName}
                    <span> sent you a prescripton </span>
                  </p>
                  <p className="Notifications__notification__time">
                    {notification.time}
                  </p>
                </div>
              </Button>
              {notifications.length !== i + 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
        {this.state.confirmPrescriptionBox && (
          <ConfirmPrescription
            closePopup={() => this.setState({ confirmPrescriptionBox: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

export default NotificationList;
