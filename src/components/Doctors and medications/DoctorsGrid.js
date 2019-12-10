import React from "react";
import Doctor from "../../assets/images/doctor1.png";
import Home_icon from "../../assets/svg/home.svg";
import Button from "../Button";
import { Rate } from '../../util/rate';

class DoctorsGrid extends React.Component {
  state = {isCallupInfo: [] };

  componentDidMount() {
    let isCallupInfo = [];
    this.props.doctors.map((doctor, index) => isCallupInfo.push("hidden"))
    this.setState({ isCallupInfo });
  }

  hideCallupInfo = i => {
    const { isCallupInfo } = this.state;
    isCallupInfo[i] = "visible";
    this.setState({isCallupInfo});
  }
  showCallupInfo = i => {
    const { isCallupInfo } = this.state;
    isCallupInfo[i] = "hidden";
    this.setState({isCallupInfo});
  }

  render() {
    return (
      <div className="doctorsGrid mb-40">
        {this.props.doctors.map((doctor, i) => (
          <div className="doctorCard" key={i}>
            <div className="doctorCard__main">
              <img
                alt={doctor.name}
                src={Doctor}
                className="center doctorCard__main__doctorImg"
              />
              {doctor.isCallup ? (
                <img
                  src={Home_icon}
                  alt={`&{doctor.name} is available for home servicies`}
                  onMouseMove={() => this.hideCallupInfo(i)}
                  onMouseOut={() => this.showCallupInfo(i)}
                />
              ) : null}
            </div>

            <div className="doctorCard__info">
              <h3 className="doctorCard__name">{doctor.name}</h3>
              <span className="doctorCard__price">{doctor.price} L.E.</span>
            </div>
            <p className="doctorCard__speciality">{doctor.speciality}</p>
            <div className="doctorCard__rate">
              <Rate rate={doctor.star} />
            </div>
            <Button className="btn btn-lg btn-green center">choose</Button>
            <div className={`iscallup-doctor-info ${this.state.isCallupInfo[i]}`}>
              <p>This doctor is available for home services</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default DoctorsGrid;
