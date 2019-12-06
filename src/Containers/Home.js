import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import DoctorsGrid from "./DoctorsGrid";
import MedicationGrid from "./MedicationGrid";
import Button from "../components/Button";
//import MedicationCard from "../components/MedicationCard";

export class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Navbar />

        <section className="topDoctors">
          <div className="topDoctors__container">
            <h2 className="heading-2 mb-52">Top doctors</h2>
            <DoctorsGrid />
            <Button className="btn btn-lg btn-green center mb-56">
              See more
            </Button>
          </div>

          <div className="topMedications__container">
            <h2 className="heading-2 mb-52">Top medications</h2>
            <MedicationGrid />
          </div>
          <Button className="btn btn-lg btn-green center">See more</Button>
        </section>
        {/* <MedicationCard name="baf" price="45" /> */}
        <Footer />
      </div>
    );
  }
}

export default Home;
