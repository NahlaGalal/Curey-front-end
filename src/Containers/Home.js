import React, { Component } from "react";
import DoctorsGrid from "../components/Doctors and medications/DoctorsGrid";
import MedicationGrid from "../components/Doctors and medications/MedicationGrid";
import Button from "../components/Button";

const doctors = [
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 5,
    isCallup: true
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 5,
    isCallup: true
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 5
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 5
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 5,
    isCallup: true
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 5,
    isCallup: true
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 5
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 5
  }
];

const medications = [
  {
    name: "Antinal",
    price: 12,
    isFavourite: true
  },
  {
    name: "Antinal",
    price: 12
  },
  {
    name: "Antinal",
    price: 12
  },
  {
    name: "Antinal",
    price: 12,
    isFavourite: true
  },
  {
    name: "Antinal",
    price: 12,
    isFavourite: true
  },
  {
    name: "Antinal",
    price: 12
  },
  {
    name: "Antinal",
    price: 12
  },
  {
    name: "Antinal",
    price: 12
  }
];

export class Home extends Component {
  render() {
    return (
      <section className="topDoctors">
        <div className="topDoctors__container">
          <h2 className="heading-2 mb-52">Top doctors</h2>
          <DoctorsGrid doctors={doctors} />
          <Button
            className="btn btn-lg btn-green center mb-56"
            onClick={() => this.props.history.push("/doctors")}
          >
            See more
          </Button>
        </div>

        <div className="topMedications__container">
          <h2 className="heading-2 mb-52">Top medications</h2>
          <MedicationGrid medications={medications} />
        </div>
        <Button
          className="btn btn-lg btn-green center"
          onClick={() => this.props.history.push("/medications")}
        >
          See more
        </Button>
      </section>
    );
  }
}

export default Home;
