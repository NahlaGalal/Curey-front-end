import React from "react";
import Doctor from "../../assets/images/doctor1.png";
import Full_Star from "../../assets/svg/star.svg";
import Half_Star from "../../assets/svg/half-star.svg";
import Empty_Star from "../../assets/svg/empty-star.svg";
import Home_icon from "../../assets/svg/home.svg";
import Button from "../Button";

class DoctorsGrid extends React.Component {
  state = { doctorRate: [], isCallupInfo: [] };

  /**
   * doctor.rate = 2
   * 1, 2 ==> full
   * 3, 4, 5 ==> empty
   * 
   * doctor.rate = 2.3
   * 1,2 ==> full
   * 3 ==> Half
   * 4, 5 ==> empty
   */

  componentDidMount() {
    let doctorRate = [], isCallupInfo = [];
    this.props.doctors.map((doctor, index) => {
      doctorRate.push([]);
      isCallupInfo.push("hidden");
      for (let i = 1; i <= 5; i++) {
        if(Math.ceil(doctor.star) === i && doctor.star !== i) doctorRate[index].push("half");
        else if(doctor.star < i) doctorRate[index].push("empty")
        else doctorRate[index].push("full");
      }
      return doctorRate;
    });
    this.setState({ doctorRate, isCallupInfo });
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
              {this.state.doctorRate.length
                ? this.state.doctorRate[i].map((star, j) => (
                    <img
                      src={star === "empty" ? Empty_Star : star === "half" ? Half_Star : Full_Star}
                      alt="star"
                      className="doctorCard__star"
                      key={`${i} ${j}`}
                    />
                  ))
                : null}
              <span>{doctor.star}</span>
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
