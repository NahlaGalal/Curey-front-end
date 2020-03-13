import React, { Component } from "react";
import { Link } from "react-router-dom";
import DoctorsGrid from "../components/Doctors and medications/DoctorsGrid";
import MedicineCard from "../components/Doctors and medications/MedicineCard";
import Button from "../components/Button";
import {loadState} from "../configureStore";
import LandingPage from "./Landing-page";

const doctors = [
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 2.5,
    isCallup: true
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 4,
    isCallup: true
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 1
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 2.2
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 0,
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
  state = { hovered: [] };

  componentDidMount() {
    this.setState({
      hovered: new Array(medications.length).fill(false)
    });
  }

  render() {
    const isAuthenticated = loadState().api_token;
    return (isAuthenticated ? (
      <section className="topDoctors">
        <div className="topDoctors__container">
          <h2 className="heading-2 mb-52">Top doctors</h2>
          <DoctorsGrid doctors={doctors} />
          <Link to="/doctors">
            <Button className="btn btn-lg btn-green center mb-56">
              See more
            </Button>
          </Link>
        </div>
        <div className="topMedications__container">
          <h2 className="heading-2 mb-52">Top medications</h2>
          <div className="medicationGrid mb-40">
            {medications.map((medication, i) => (
              <MedicineCard
                key={i}
                name={medication.name}
                price={medication.price}
                description={medication.description}
                isFavourite={medication.isFavourite}
                onMouseMove={() =>
                  this.setState({
                    hovered: this.state.hovered.fill(true, i, i + 1)
                  })
                }
                onMouseLeave={() =>
                  this.setState({
                    hovered: this.state.hovered.fill(false, i, i + 1)
                  })
                }
                hovered={this.state.hovered[i]}
                link
              />
            ))}
          </div>
          <Link to="/medications">
            <Button className="btn btn-lg btn-green center">See more</Button>
          </Link>
        </div>
      </section>
    ): <LandingPage />);
  }
}

export default Home;
