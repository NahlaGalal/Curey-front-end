import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { deleteState } from "../../configureStore";
import locationIcon from "../../assets/svg/location.svg";
import AccountSettings from "./AccountSettings";

class PharmacyThumbnail extends Component {
  state = {
    accountSettingsBox: false,
  };

  componentDidMount() {
    this.props.getUserData();
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
              {this.props.work_address && (
                <p className="user-email">
                  <img src={locationIcon} alt="Location icon" />{" "}
                  {this.props.work_address}
                </p>
              )}
            </div>
          </header>
          <hr />
          <div className="Thumbnail__settings">
            <Button onClick={() => this.setState({ accountSettingsBox: true })}>
              Settings
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
          <AccountSettings
            image={this.props.image}
            name={this.props.name}
            changeName={(data) => {
              this.props.changeName(data);
              this.setState({ accountSettingsBox: false });
            }}
            email={this.props.email}
            changeEmail={(data) => {
              this.props.changeEmail(data);
              this.setState({ accountSettingsBox: false });
            }}
            phone={this.props.phone}
            changePhone={(data) => {
              this.props.changePhone(data);
              this.setState({ accountSettingsBox: false });
            }}
            changePassword={(data) => {
              this.props.changePassword(data);
              this.setState({ accountSettingsBox: false });
            }}
            cities={this.props.cities}
            city_id={this.props.city_id}
            address={this.props.address}
            work_address={this.props.work_address}
            changeAddress={(data) => {
              this.props.changeAddress(data);
              this.setState({ accountSettingsBox: false });
            }}
            closePopup={() => this.setState({ accountSettingsBox: false })}
            pharmacy={true}
          />
        )}
      </React.Fragment>
    );
  }
}

export default PharmacyThumbnail;
