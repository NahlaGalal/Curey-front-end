import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { deleteState } from "../../configureStore";
import AccountSettings from "./AccountSettings";

class UserThumbnail extends Component {
  state = { accountSettingsBox: false };

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
              <p className="user-email">{this.props.email}</p>
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
            changeAddress={(data) => {
              this.props.changeAddress(data);
              this.setState({ accountSettingsBox: false });
            }}
            closePopup={() => this.setState({ accountSettingsBox: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

export default UserThumbnail;
