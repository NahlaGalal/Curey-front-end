import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { deleteState } from "../../configureStore";
import locationIcon from "../../assets/svg/location.svg";

class DoctorThumbnail extends Component {
  logout = () => {
    deleteState();
    this.props.logout();
  };

  render() {
    return (
      <div className="Thumbnail" onClick={e => e.stopPropagation()}>
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
          <Button>Settings</Button>
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
    );
  }
}

export default DoctorThumbnail;
