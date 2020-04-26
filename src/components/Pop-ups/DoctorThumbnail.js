import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { deleteState } from "../../configureStore";
import locationIcon from "../../assets/svg/location.svg";
import DoctorAccountSettings from "./DoctorAccountSettings";
import DoctorPersonalSettings from "./DoctorPersonalSettings";

class DoctorThumbnail extends Component {
  state = {
    accountSettingsBox: false,
    pesronalSettingsBox: false,
  };

  logout = () => {
    deleteState();
    this.props.logout();
  };

  render() {
    return (
      <React.Fragment>
        <div className="Thumbnail" onClick={(e) => e.stopPropagation()}>
          <header>
            <div className="Thumbnail__profile-img">
              <img src={this.props.doctorImage} alt={this.props.doctorName} />
            </div>
            <div>
              <p className="user-name">{this.props.doctorName}</p>
              <p className="user-email">{this.props.doctorSpeciality}</p>
              <p className="user-email">
                <img src={locationIcon} alt="Location icon" />{" "}
                {this.props.doctorAddress}
              </p>
            </div>
          </header>
          <hr />
          <div className="Thumbnail__settings">
            <Button onClick={() => this.setState({ accountSettingsBox: true })}>
              Account
            </Button>
            <Button
              onClick={() => this.setState({ pesronalSettingsBox: true })}
            >
              Personal
            </Button>
            <Button>
              <Link to="/home" onClick={this.props.hideLists}>
                Browse as a customer
              </Link>
            </Button>
          </div>
          <hr />
          <footer>
            <Button className="btn" onClick={this.logout}>
              {" "}
              Logout{" "}
            </Button>
          </footer>
        </div>
        {this.state.accountSettingsBox && (
          <DoctorAccountSettings
            closePopup={() => this.setState({ accountSettingsBox: false })}
          />
        )}
        {this.state.pesronalSettingsBox && (
          <DoctorPersonalSettings
            closePopup={() => this.setState({ pesronalSettingsBox: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

export default DoctorThumbnail;
