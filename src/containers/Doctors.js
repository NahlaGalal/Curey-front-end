import React, { Component } from "react";
import DoctorGrid from "../components/Doctors and medications/DoctorsGrid";
import Search from "../components/Doctors and medications/Search";
import { Filter } from "../components/Doctors and medications/Filter";

const doctors = [
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 3
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 4
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
    star: 5
  },
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 5
  }
];

class Doctors extends Component {
  state = {
    filterShown: "block"
  }

  openFilterBox = () => {

  }

  render() {
    return (
      <div>
        <Filter style={{display: this.state.filterShown}}/>
        <Search placeholder="Search Doctors, Specialty" type="doctors" openFilterBox={this.openFilterBox}/>
        <section className="topDoctors">
          <div className="topDoctors__container">
            <DoctorGrid doctors={doctors} />
          </div>
        </section>
      </div>
    );
  }
}

export default Doctors;
