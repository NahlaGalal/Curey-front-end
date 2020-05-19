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

  componentDidMount() {
    this.props.getProfileData(this.props.api_token);
  }

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
              <img src={this.props.image} alt={this.props.name} />
            </div>
            <div>
              <p className="user-name">{this.props.name}</p>
              {this.props.speciality && (
                <p className="user-email">
                  {
                    this.props.specialities.find(
                      (speciality) => speciality.id === this.props.speciality
                    ).name
                  }
                </p>
              )}
              <p className="user-email">
                <img src={locationIcon} alt="Location icon" />{" "}
                {this.props.work_address}
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
            phone={this.props.phone}
            changePhone={(data) => {
              this.props.changePhone(data);
              this.setState({ accountSettingsBox: false });
            }}
            changePassword={(data) => {
              this.props.changePassword(data);
              this.setState({ accountSettingsBox: false });
            }}
            email={this.props.email}
            changeEmail={(data) => {
              this.props.changeEmail(data);
              this.setState({ accountSettingsBox: false });
            }}
            api_token={this.props.api_token}
            image={this.props.image}
            changeImage={(data) => {
              this.props.changeImage(data);
              this.setState({ accountSettingsBox: false });
            }}
            name={this.props.name}
            closePopup={() => this.setState({ accountSettingsBox: false })}
          />
        )}
        {this.state.pesronalSettingsBox && (
          <DoctorPersonalSettings
            name={this.props.name}
            changeName={(data) => {
              this.props.changeName(data);
              this.setState({ pesronalSettingsBox: false });
            }}
            fees={this.props.fees}
            changeFees={(data) => {
              this.props.changeFees(data);
              this.setState({ pesronalSettingsBox: false });
            }}
            duration={this.props.duration}
            changeDuration={(data) => {
              this.props.changeDuration(data);
              this.setState({ pesronalSettingsBox: false });
            }}
            callup={this.props.callup}
            callup_fees={this.props.callup_fees}
            changeHomeVisit={(data) => {
              this.props.changeHomeVisit(data);
              this.setState({ pesronalSettingsBox: false });
            }}
            cities={this.props.cities}
            city_id={this.props.city_id}
            address={this.props.address}
            work_address={this.props.work_address}
            changeAddress={(data) => {
              this.props.changeAddress(data);
              this.setState({ pesronalSettingsBox: false });
            }}
            specialities={this.props.specialities}
            speciality={this.props.speciality}
            changeSpeciality={(data) => {
              this.props.changeSpeciality(data);
              this.setState({ pesronalSettingsBox: false });
            }}
            closePopup={() => this.setState({ pesronalSettingsBox: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

export default DoctorThumbnail;
