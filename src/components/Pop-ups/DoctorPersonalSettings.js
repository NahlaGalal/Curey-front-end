import React, { Component } from "react";
import Button from "../Button";
import { connect } from "react-redux";
import * as actions from "../../actions/types";
import ChangeFullName from "../Settings/ChangeFullName";
import ChangeAddress from "../Settings/ChangeAddress";
import {
  ChangeDegrees,
  ChangeDuartion,
  ChangeFees,
  ChangeHomeVisit,
  ChangeSpeciality,
} from "../Settings/DoctorSettings";

class DoctorPersonalSettings extends Component {
  state = {
    boxShown: "Full name",
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
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Full name" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Full name{" "}
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
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Speciality" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Speciality{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Fees" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Fees{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Duration" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Duration{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Home visits" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Home visits{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Degrees" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Degrees{" "}
            </Button>
          </aside>
          <div className="Popup__box__settings">
            {this.state.boxShown === "Full name" ? (
              <ChangeFullName name={this.props.user.full_name} />
            ) : this.state.boxShown === "Address" ? (
              <ChangeAddress cities={this.props.cities} />
            ) : this.state.boxShown === "Speciality" ? (
              <ChangeSpeciality />
            ) : this.state.boxShown === "Fees" ? (
              <ChangeFees />
            ) : this.state.boxShown === "Duration" ? (
              <ChangeDuartion />
            ) : this.state.boxShown === "Home visits" ? (
              <ChangeHomeVisit />
            ) : (
              <ChangeDegrees />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorPersonalSettings);
