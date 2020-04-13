import React, { Component } from "react";
import Button from "../Button";
import ConfirmPrescription from "./ConfirmPrescription";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import cartImg from "../../assets/svg/shopping-cart-white.svg";

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
          <div>
            {this.props.notifications.length ? (
              this.props.notifications.map((notification, i) => (
                <React.Fragment key={i}>
                  <Button
                    className="Notifications__notification btn"
                    // onClick={() =>
                    //   this.setState({ confirmPrescriptionBox: true })
                    // }
                  >
                    {notification.order ? (
                      <img
                        className="Notifications__notification__img"
                        src={notification.medicationImage}
                        alt={notification.medicationName}
                      />
                    ) : (
                      <div className="Notifications__notification__img cart">
                        <img src={cartImg} alt="Shopping cart icon" />
                      </div>
                    )}
                    {/* <img src={notification.doctorImg} alt="Hassan Ali" /> */}
                    <div>
                      {/* {notification.doctorName}
                    <span> sent you a prescripton </span> */}
                      {notification.order ? (
                        <div>
                          {" "}
                          {notification.medicationName}{" "}
                          <span> order request sent to </span>{" "}
                          <p className="Notifications__notification__pharmacy">
                            {" "}
                            {notification.pharmacy}
                          </p>
                          <span> Pharmacy and wait for its response</span>{" "}
                        </div>
                      ) : (
                        <p>
                          {" "}
                          Shopping cart{" "}
                          <span>
                            {" "}
                            request sent to its destination and wait for
                            response
                          </span>{" "}
                        </p>
                      )}
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
