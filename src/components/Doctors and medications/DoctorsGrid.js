import React from "react";
import { Link } from "react-router-dom";
import Home_icon from "../../assets/svg/home.svg";
import Button from "../Button";
import { Rate } from "../../util/rate";
import UserImg from "../../assets/svg/user.svg";

class DoctorsGrid extends React.Component {
  state = { isCallupInfo: [] };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.doctors) !== JSON.stringify(this.props.doctors)
    ) {
      let isCallupInfo = [];
      this.props.doctors.map(() => isCallupInfo.push("hidden"));
      this.setState({ isCallupInfo });
    }
  }

  hideCallupInfo = i => {
    const { isCallupInfo } = this.state;
    isCallupInfo[i] = "visible";
    this.setState({ isCallupInfo });
  };
  showCallupInfo = i => {
    const { isCallupInfo } = this.state;
    isCallupInfo[i] = "hidden";
    this.setState({ isCallupInfo });
  };

  render() {
    return (
      <div className="doctorsGrid mb-40">
        {this.props.doctors.map(
          (doctor, i) =>
            i < 16 && (
              <div key={i} className="doctorCard">
                <div className="doctorCard__main">
                  <img
                    alt={doctor.full_name}
                    src={doctor.image || UserImg}
                    className="center doctorCard__main__doctorImg"
                  />
                  {doctor.offers_callup ? (
                    <img
                      src={Home_icon}
                      alt={`${doctor.full_name} is available for home servicies`}
                      onMouseMove={() => this.hideCallupInfo(doctor.id)}
                      onMouseOut={() => this.showCallupInfo(doctor.id)}
                    />
                  ) : null}
                </div>

                <div className="doctorCard__info">
                  <h3 className="doctorCard__name">{doctor.full_name}</h3>
                  <span className="doctorCard__price">{doctor.fees} L.E.</span>
                </div>
                <p className="doctorCard__speciality">{doctor.speciality}</p>
                <div className="doctorCard__rate">
                  <Rate rate={doctor.overall_rating} />
                </div>
                <Link
                  to={`/doctor-profile/${doctor.id}`}
                  className="doctorCard__link"
                >
                  <Button className="btn btn-lg btn-green center">
                    choose
                  </Button>
                </Link>
                <div
                  className={`iscallup-doctor-info ${this.state.isCallupInfo[
                    doctor.id
                  ] || "hidden"}`}
                >
                  <p>This doctor is available for home services</p>
                </div>
              </div>
            )
        )}
      </div>
    );
  }
}

export default DoctorsGrid;
