import React, { Component } from "react";
import { connect } from "react-redux";
import DoctorGrid from "../components/Doctors and medications/DoctorsGrid";
import Search from "../components/Doctors and medications/Search";
import Filter from "../components/Doctors and medications/Filter";
import { getAllDoctors, getDoctorsSearch } from "../actions/getDoctorsAction";
import ReactLoading from "react-loading";

class Doctors extends Component {
  state = {
    filterShown: "hidden",
    doctors: []
  };

  componentDidMount() {
    this.setState({ doctors: this.props.doctors });
    this.props.getAllDoctors(this.props.api_token);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.doctors) !== JSON.stringify(this.props.doctors)
    ) {
      this.setState({ doctors: this.props.doctors });
    }
    if (
      JSON.stringify(prevProps.doctorsSearch) !== JSON.stringify(this.props.doctorsSearch)
    ) {
      this.setState({ doctors: this.props.doctorsSearch });
    }
  }

  openFilterBox = () => this.setState({ filterShown: "visible" });
  cancelFilters = () => this.setState({ filterShown: "hidden" });
  applyFilters = filters => {
    let cities = filters.cities,
      specialities = filters.specialities;
    if (!filters.cities.length)
      cities = this.props.cities.map(city => city.id.toString());
    if (!filters.specialities.length)
      specialities = this.props.specialities.map(speciality => speciality.name);
    const doctors = this.props.doctors
      .filter(doctor => cities.includes(doctor.city_id.toString()))
      .filter(doctor => specialities.includes(doctor.speciality));
    this.setState({ filterShown: "hidden", doctors });
  };

  searchDoctor = search => {
    this.props.getDoctorsSearch(this.props.api_token, search);
  };

  render() {
    return (
      <div>
        <Filter
          filters={[]}
          display={this.state.filterShown}
          cancelFilters={this.cancelFilters}
          applyFilters={this.applyFilters}
          type="doctors"
          specialities={this.props.specialities}
          cities={this.props.cities}
        />
        <Search
          placeholder="Search Doctors, Specialty"
          type="doctors"
          openFilterBox={this.openFilterBox}
          withFilter
          searchDoctor={this.searchDoctor}
        />
        <section className="topDoctors">
          <div className="topDoctors__container">
            {this.state.doctors.length ? (
              <DoctorGrid doctors={this.state.doctors} />
            ) : (
              <ReactLoading type="spokes" color="#0066ff" className="loading" />
            )}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api_token: state.user.api_token,
  doctors: state.doctors.doctorsData,
  specialities: state.doctors.specialities,
  cities: state.doctors.cities,
  doctorsSearch: state.doctors.doctorsSearch
});

const mapDispatchToProps = dispatch => ({
  getAllDoctors: api_token => dispatch(getAllDoctors(api_token)),
  getDoctorsSearch: (api_token, search) =>
    dispatch(getDoctorsSearch({ search, api_token }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
