import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { deleteState } from "../../configureStore";
import AccountSettings from "./AccountSettings";
import PersonalSettings from "./PersonalSettings";

class UserThumbnail extends Component {
  state = { accountSettingsBox: false, personalSettingsBox: false };

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
              <img src={this.props.userImg} alt={this.props.userName} />
            </div>
            <div>
              <p className="user-name">{this.props.userName}</p>
              <p className="user-email">{this.props.userEmail}</p>
            </div>
          </header>
          <hr />
          <div className="Thumbnail__settings">
            <h4 className="heading-4">Settings</h4>
            <Button onClick={() => this.setState({ accountSettingsBox: true })}>
              Account
            </Button>
            <Button
              to="/"
              onClick={() => this.setState({ personalSettingsBox: true })}
            >
              Personal
            </Button>
            <Button>
              <Link to="/payment-method" onClick={this.props.hideLists}>
                Online payment method
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
            closePopup={() => this.setState({ accountSettingsBox: false })}
            user={{
              name: this.props.userName,
              email: this.props.userEmail,
              image: this.props.userImg,
            }}
          />
        )}
        {this.state.personalSettingsBox && (
          <PersonalSettings
            closePopup={() => this.setState({ personalSettingsBox: false })}
            name={this.props.userName}
          />
        )}
      </React.Fragment>
    );
  }
}

export default UserThumbnail;
