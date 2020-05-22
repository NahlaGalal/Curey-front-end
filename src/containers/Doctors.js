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
    search: "",
    filters: {
      cities: [],
      specialities: [],
      specialities_id: [],
    },
  };

  componentDidMount() {
    this.setState({ doctors: this.props.doctors });
    this.props.getAllDoctors(this.props.api_token, 0, 16, this.props.history);
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
  applyFilters = (filters) => {
    if (!this.state.search) {
      let cities = filters.cities,
        specialities = filters.specialities;
      if (!filters.cities.length)
        cities = this.props.cities.map((city) => city.id.toString());
      if (!filters.specialities.length)
        specialities = this.props.specialities.map(
          (speciality) => speciality.name
        );
      const doctors = this.props.doctors
        .filter((doctor) => cities.includes(doctor.city_id.toString()))
        .filter((doctor) => specialities.includes(doctor.speciality));
      this.setState({
        filterShown: "hidden",
        doctors,
        filters,
      });
    } else {
      this.props.getDoctorsSearch(
        this.props.api_token,
        this.state.search,
        0,
        16,
        filters.cities[0] || "",
        filters.specialities_id[0] || "",
        this.props.history
      );
      this.setState({
        filterShown: "hidden",
        filters,
      });
    }
  };

  searchDoctor = (search) => {
    if (search) {
      this.props.getDoctorsSearch(
        this.props.api_token,
        search,
        0,
        16,
        this.state.filters.cities[0] || "",
        this.state.filters.specialities_id[0] || "",
        this.props.history
      );
    } else {
      this.setState({ doctors: this.props.doctors });
    }
    this.setState({ search });
  };

  seeMoreDoctors = () => {
    if (this.state.search) {
      this.props.getDoctorsSearch(
        this.props.api_token,
        this.state.search,
        this.state.doctors.length,
        16,
        this.state.filters.cities[0] || "",
        this.state.filters.specialities_id[0] || "",
        this.props.history
      );
    } else {
      this.props.getAllDoctors(
        this.props.api_token,
        this.state.doctors.length,
        8,
        this.props.history
      );
    }
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
                    onClick={this.seeMoreDoctors}
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

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  doctors: state.doctors.doctorsData,
  specialities: state.doctors.specialities,
  cities: state.doctors.cities,
  doctorsSearch: state.doctors.doctorsSearch,
  doctorsDone: state.doctors.doctorsDone,
});

const mapDispatchToProps = (dispatch) => ({
  getAllDoctors: (api_token, skip, limit, history) =>
    dispatch({
      type: actions.SAGA_GET_DOCTORS,
      api_token,
      skip,
      limit,
      history,
    }),
  getDoctorsSearch: (
    api_token,
    search,
    skip,
    limit,
    city_id,
    speciality_id,
    history
  ) =>
    dispatch({
      type: actions.SAGA_SEARCH_DOCTORS,
      search,
      api_token,
      skip,
      limit,
      city_id,
      speciality_id,
      history,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
