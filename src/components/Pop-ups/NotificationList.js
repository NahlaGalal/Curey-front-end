import React, { Component } from "react";
// import doctorImg from "../../assets/images/Hassan.png";
import Button from "../Button";
import ConfirmPrescription from "./ConfirmPrescription";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

class NotificationList extends Component {
  state = {
    confirmPrescriptionBox: false
  };

  render() {
    TimeAgo.addLocale(en);
    const time = new TimeAgo("en-US");

    return (
      <React.Fragment>
        <div className="Notifications" onClick={e => e.stopPropagation()}>
          {this.props.notifications.length ? (
            this.props.notifications.map((notification, i) => (
              <React.Fragment key={i}>
                <Button
                  className="Notifications__notification btn"
                  // onClick={() =>
                  //   this.setState({ confirmPrescriptionBox: true })
                  // }
                >
                  {/* <img src={notification.doctorImg} alt="Hassan Ali" /> */}
                  <div>
                    <p>
                      {/* {notification.doctorName}
                    <span> sent you a prescripton </span> */}
                      <span>{notification.text}</span>
                    </p>
                    <p className="Notifications__notification__time">
                      {time.format(notification.time)}
                    </p>
                  </div>
                </Button>
                {this.props.notifications.length !== i + 1 && <hr />}
              </React.Fragment>
            ))
          ) : (
            <p className="Notifications__error"> No new notifications </p>
          )}
        </div>
        {this.state.confirmPrescriptionBox && (
          <ConfirmPrescription
            closePopup={() => {
              this.setState({ confirmPrescriptionBox: false });
              this.props.hideLists();
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default NotificationList;
