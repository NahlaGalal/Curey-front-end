import React, { Component } from "react";
import { connect } from "react-redux";
import DoctorGrid from "../components/Doctors and medications/DoctorsGrid";
import Search from "../components/Doctors and medications/Search";
import Filter from "../components/Doctors and medications/Filter";
import * as actions from "../actions/types";
import ReactLoading from "react-loading";
import Button from "../components/Button";

class Doctors extends Component {
  state = {
    filterShown: "hidden",
    doctors: [],
    filters: {
      cities: [],
      specialities: [],
      specialities_id: []
    }
  };

  componentDidMount() {
    this.setState({ doctors: this.props.doctors });
    this.props.getAllDoctors(this.props.api_token, 0, 16);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.doctors) !== JSON.stringify(this.props.doctors)
    ) {
      this.setState({ doctors: this.props.doctors });
    }
    if (
      JSON.stringify(prevProps.doctorsSearch) !==
      JSON.stringify(this.props.doctorsSearch)
    ) {
      this.setState({ doctors: this.props.doctorsSearch });
    }
  }

  openFilterBox = () => this.setState({ filterShown: "visible" });
  cancelFilters = () => this.setState({ filterShown: "hidden" });
  applyFilters = filters => {
    let cities = filters.cities,
      specialities = filters.specialities,
      specialities_id = filters.specialities_id;
    if (!filters.cities.length)
      cities = this.props.cities.map(city => city.id.toString());
    if (!filters.specialities.length)
      specialities = this.props.specialities.map(speciality => speciality.name);
    const doctors = this.props.doctors
      .filter(doctor => cities.includes(doctor.city_id.toString()))
      .filter(doctor => specialities.includes(doctor.speciality));
    this.setState({
      filterShown: "hidden",
      doctors,
      filters: {
        cities: filters.cities,
        specialities: filters.specialities,
        specialities_id
      }
    });
  };

  searchDoctor = search => {
    this.props.getDoctorsSearch(
      this.props.api_token,
      search,
      0,
      16,
      this.state.filters.cities[0] || "",
      this.state.filters.specialities_id[0] || ""
    );
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
          searchfunction={this.searchDoctor}
        />
        <section className="topDoctors">
          <div className="topDoctors__container">
            {this.state.doctors.length ? (
              <React.Fragment>
                <DoctorGrid doctors={this.state.doctors} />
                {!this.props.doctorsDone && (
                  <Button
                    className="btn btn-blue btn-lg"
                    onClick={() =>
                      this.props.getAllDoctors(
                        this.props.api_token,
                        this.props.doctors.length,
                        8
                      )
                    }
                  >
                    {" "}
                    See more
                  </Button>
                )}
              </React.Fragment>
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
  doctorsSearch: state.doctors.doctorsSearch,
  doctorsDone: state.doctors.doctorsDone
});

const mapDispatchToProps = dispatch => ({
  getAllDoctors: (api_token, skip, limit) =>
    dispatch({
      type: actions.SAGA_GET_DOCTORS,
      api_token,
      skip,
      limit
    }),
  getDoctorsSearch: (api_token, search, skip, limit, city_id, speciality_id) =>
    dispatch({
      type: actions.SAGA_SEARCH_DOCTORS,
      search,
      api_token,
      skip,
      limit,
      city_id,
      speciality_id
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
