import React, { Component } from "react";
import Button from "../Button";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import ChangePhoto from "../Settings/ChangePhoto";
import ChangePhone from "../Settings/ChangePhone";
import ChangePassword from "../Settings/ChangePassword";
import ChangeEmail from "../Settings/ChangeEmail";

class DoctorAccountSettings extends Component {
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
            ) : (
              <ChangeEmail email={this.props.user.email} />
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getCities: () => dispatch({ type: actions.SAGA_GET_CITIES }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorAccountSettings);
