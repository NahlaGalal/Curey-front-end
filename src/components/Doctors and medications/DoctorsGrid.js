import React from "react";
import Doctor from "../../assets/images/doctor1.png";
import Star from "../../assets/svg/heart.svg";
import Button from "../Button";

class DoctorsGrid extends React.Component {
  state = { doctorRate: [] };

  componentDidMount() {
    let doctorRate = [];
    this.props.doctors.map((doctor, index) => {
      doctorRate.push([]);
      for (let i = 0; i < doctor.star; i++) {
        doctorRate[index].push("");
      }
      return doctorRate;
    });
    this.setState({ doctorRate });
  }

  render() {
    return (
      <div className="doctorsGrid mb-40">
        {this.props.doctors.map((doctor, i) => (
          <div className="doctorCard" key={i}>
            <img alt="doctor" src={Doctor} className="center" />

            <div className="doctorCard__info">
              <h3 className="doctorCard__name">{doctor.name}</h3>
              <span className="doctorCard__price">{doctor.price}</span>
            </div>
            <p className="doctorCard__speciality">{doctor.speciality}</p>
            <div className="doctorCard__rate">
              {this.state.doctorRate.length
                ? this.state.doctorRate[i].map((star, j) => (
                    <img src={Star} alt="star" className="doctorCard__star" key={`${i} ${j}`}/>
                  ))
                : null}
              <span>{doctor.star}</span>
            </div>
            <Button className="btn btn-lg btn-green center">choose</Button>
          </div>
        ))}
      </div>
    );
  }
}

// const DoctorsGrid = props => {
//   const doctorRate = [];
//   for (let i = 0; i < props.doctor.star; i++) {
//     doctorRate.push("");
//   }

//   return (
//     <div className="doctorsGrid mb-40">
//       {props.doctors.map((doctor, i) => (
//         <div className="doctorCard">
//           <img alt="doctor" src={Doctor} className="center" />

//           <div className="doctorCard__info">
//             <h3 className="doctorCard__name">{doctor.name}</h3>
//             <span className="doctorCard__price">{doctor.price}</span>
//           </div>
//           <p className="doctorCard__speciality">{doctor.speciality}</p>
//           <div className="doctorCard__rate">
//             {doctorRate.map(star => (
//               <img src={Star} alt="star" className="doctorCard__star" />
//             ))}
//             <span>{doctor.star}</span>
//           </div>
//           <Button className="btn btn-lg btn-green center">choose</Button>
//         </div>
//       ))}
//     </div>
//   );
// };

export default DoctorsGrid;
