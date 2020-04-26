import React, { Component } from "react";
import Button from "../Button";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import ChangeAddress from "../Settings/ChangeAddress";
import ChangeFullName from "../Settings/ChangeFullName";
import ChangeEmail from "../Settings/ChangeEmail";
import ChangePassword from "../Settings/ChangePassword";
import ChangePhone from "../Settings/ChangePhone";
import ChangePhoto from "../Settings/ChangePhoto";
import ChangePharmacyName from "../Settings/ChangePharmacyName";

class AccountSettings extends Component {
  state = {
    boxShown: "Photo",
  };

  componentDidMount() {
    this.props.getCities();
  }

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
                src={this.props.user.image}
                alt={`${this.props.user.name} profile-pic`}
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
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Full name" ||
                this.state.boxShown === "Pharmacy name"
                  ? " active"
                  : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {this.props.pharmacy ? "Pharmacy name" : "Full name"}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Address" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Address{" "}
            </Button>
            <Button className="btn btn-transparent btn-transparent-warning">
              {" "}
              Delete account{" "}
            </Button>
          </aside>
          <div className="Popup__box__settings">
            {this.state.boxShown === "Photo" ? (
              <ChangePhoto image={this.props.user.image} />
            ) : this.state.boxShown === "Phone number" ? (
              <ChangePhone />
            ) : this.state.boxShown === "Change password" ? (
              <ChangePassword />
            ) : this.state.boxShown === "Email address" ? (
              <ChangeEmail email={this.props.user.email} />
            ) : this.state.boxShown === "Full name" ? (
              <ChangeFullName name={this.props.user.full_name} />
            ) : this.state.boxShown === "Pharmacy name" ? (
              <ChangePharmacyName name={this.props.user.full_name} />
            ) : (
              <ChangeAddress cities={this.props.cities} />
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.user.cities,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getCities: () => dispatch({ type: actions.SAGA_GET_CITIES }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
