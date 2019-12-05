import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import DoctorCard from "../components/DoctorCard";

export class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar />

        <Navbar />
        <section className="g">
          <DoctorCard
            name="Mo Zayan"
            price={129 + " L.E"}
            speciality="Pediatric Surgery"
          />
          <DoctorCard
            name="Mo Zayan"
            price={129 + " L.E"}
            speciality="Pediatric Surgery"
          />
          <DoctorCard
            name="Mo Zayan"
            price={129 + " L.E"}
            speciality="Pediatric Surgery"
          />
          <DoctorCard
            name="Mo Zayan"
            price={129 + " L.E"}
            speciality="Pediatric Surgery"
          />
          <DoctorCard
            name="Mo Zayan"
            price={129 + " L.E"}
            speciality="Pediatric Surgery"
          />
        </section>

        {/* <button className="btn btn-green btn-lg">bla bla</button> */}
        <Footer />
      </div>
    );
  }
}

export default Home;
