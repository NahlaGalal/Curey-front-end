import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { deleteState } from "../../configureStore";
import AccountSettings from "./AccountSettings";

class UserThumbnail extends Component {
  state = { accountSettingsBox: false };

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
            <Button>
              <Link to="/payment-method" onClick={this.props.hideLists}>
                Online payment method
              </Link>
            </Button>
            {this.props.role !== 1 && (
              <Button>
                {this.props.role === 2 ? (
                  <Link to="/pharmacy"> Browse as a pharmacist </Link>
                ) : (
                  <Link to="/doctor"> Browse as a doctor </Link>
                )}
              </Button>
            )}
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
      </React.Fragment>
    );
  }
}

export default UserThumbnail;
