import React, { Component } from "react";
import DoctorGrid from "../components/Doctors and medications/DoctorsGrid";
import Search from "../components/Doctors and medications/Search";
import Filter from "../components/Doctors and medications/Filter";

const doctors = [
  {
    name: "Mo Zayan",
    price: 129,
    speciality: "Pediatric Surgery",
    star: 3,
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
    star: 5
  }
];

const Filters = [
  "Pediatrics",
  "General Surgery",
  "El-Mahalla",
  "Keyword2",
  "Physchiatry",
  "Keyword3",
  "Dental",
  "Children",
  "keyword",
  "Keyword5",
  "Keyword6",
  "Keyword7"
];

class Doctors extends Component {
  state = {
    filterShown: "hidden"
  };

  openFilterBox = () => this.setState({ filterShown: "visible" });
  cancelFilters = () => this.setState({ filterShown: "hidden" });
  applyFilters = filters => {
    this.setState({ filterShown: "hidden" });
  };

  render() {
    return (
      <div>
        <Filter
          filters={Filters}
          display={this.state.filterShown}
          cancelFilters={this.cancelFilters}
          applyFilters={this.applyFilters}
          type="doctors"
        />
        <Search
          placeholder="Search Doctors, Specialty"
          type="doctors"
          openFilterBox={this.openFilterBox}
        />
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
