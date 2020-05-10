import React, { Component } from "react";
import Button from "../Button";
import ChangePhoto from "../Settings/ChangePhoto";
import ChangePhone from "../Settings/ChangePhone";
import ChangePassword from "../Settings/ChangePassword";
import ChangeEmail from "../Settings/ChangeEmail";

class DoctorAccountSettings extends Component {
  state = {
    boxShown: "Photo",
  };

  toggleBoxShown = (e) =>
    this.setState({ boxShown: e.target.textContent.trim() });

  render() {
    return (
      <section className="Popup">
        <div
          className="Popup__box-grid Popup__box"
          onClick={(e) => e.stopPropagation()}
        >
          <aside className="Popup__box__aside">
            <div className="Popup__box__aside__image">
              <img
                src={this.props.image}
                alt={`${this.props.name} profile-pic`}
              />
            </div>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Photo" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Photo{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Phone number" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Phone number{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Change password" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Change password{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Email address" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Email address{" "}
            </Button>
            <Button className="btn btn-transparent btn-transparent-warning">
              {" "}
              Delete account{" "}
            </Button>
          </aside>
          <div className="Popup__box__settings">
            {this.state.boxShown === "Photo" ? (
              <ChangePhoto
                api_token={this.props.api_token}
                image={this.props.image}
                changeImage={(data) => this.props.changeImage(data)}
              />
            ) : this.state.boxShown === "Phone number" ? (
              <ChangePhone
                phone={this.props.phone}
                changePhone={(data) => this.props.changePhone(data)}
              />
            ) : this.state.boxShown === "Change password" ? (
              <ChangePassword
                changePassword={(data) => this.props.changePassword(data)}
              />
            ) : (
              <ChangeEmail
                email={this.props.email}
                changeEmail={(data) => this.props.changeEmail(data)}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default DoctorAccountSettings;
