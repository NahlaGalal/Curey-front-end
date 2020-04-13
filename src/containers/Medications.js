import React, { Component } from "react";
import MedicineCard from "../components/Doctors and medications/MedicineCard";
import Search from "../components/Doctors and medications/Search";
import Filter from "../components/Doctors and medications/Filter";
import RequestMedication from "../components/Pop-ups/RequestMedication";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import ReactLoading from "react-loading";
import Button from "../components/Button";

class Medications extends Component {
  state = {
    filterShown: "hidden",
    hovered: [],
    requestMedicationBox: false,
    medications: [],
    error: false,
    search: "",
    filters: {
      keywords: []
    }
  };

  componentDidMount() {
    this.props.onRequestData(this.props.api_token, 0, 16);
    this.setState({
      medications: this.props.medications,
      hovered: new Array(this.props.medications.length).fill(false)
    });
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.medications) !==
      JSON.stringify(this.props.medications)
    ) {
      this.setState({
        medications: this.props.medications,
        hovered: new Array(this.props.medications.length).fill(false)
      });
    }
    if (
      JSON.stringify(prevProps.medicationsSearch) !==
      JSON.stringify(this.props.medicationsSearch)
    ) {
      this.setState({
        medications: this.props.medicationsSearch,
        hovered: new Array(this.props.medicationsSearch.length).fill(false)
      });
    }
    if (prevProps.error.length !== this.props.error.length) {
      if (this.props.error.length && this.props.error[0].error === "no results")
        this.setState({ medications: [] });
    }
  }

  openFilterBox = () => this.setState({ filterShown: "visible" });
  cancelFilters = () => this.setState({ filterShown: "hidden" });
  applyFilters = filters => {
    if (!this.state.search) {
      let keywords;
      if (filters.keywords && !filters.keywords.length)
        keywords = this.props.keywords.map(keyword => keyword.id);
      else keywords = filters.keywords.map(keyword => keyword.id);
      const medications = this.props.medications.filter(medication =>
        medication.keywords.some(key => keywords.includes(key))
      );
      this.setState({
        filterShown: "hidden",
        medications,
        filters,
        error: medications.length ? false : true
      });
    } else {
      this.props.getMedicationsSearch(
        this.props.api_token,
        this.state.search,
        0,
        16,
        filters.keywords.map(key => key.id)
      );
      this.setState({
        filterShown: "hidden",
        filters
      });
    }
  };

  searchMedications = search => {
    if (search) {
      this.props.getMedicationsSearch(
        this.props.api_token,
        search,
        0,
        16,
        this.state.filters.keywords.map(key => key.id)
      );
    } else {
      this.setState({
        medications: this.props.medications,
        hovered: new Array(this.props.medications.length).fill(false)
      });
    }
    this.setState({ search });
  };

  deleteFavouriteMedication = product_id => {
    this.props.deleteFavouriteMedication(
      {
        api_token: this.props.api_token,
        product_id
      },
      "MedicationsPage"
    );
  };

  addFavouriteMedication = product_id => {
    this.props.addFavouriteMedication(
      {
        api_token: this.props.api_token,
        product_id
      },
      "MedicationsPage"
    );
  };

  seeMoreMedications = () => {
    if(this.state.search) {
      this.props.getMedicationsSearch(
        this.props.api_token,
        this.state.search,
        this.state.medications.length,
        8,
        this.state.filters.keywords.map(key => key.id)
      );
    }else {
      this.props.onRequestData(
        this.props.api_token,
        this.state.medications.length,
        8
      );
    }
  }

  render() {
    return (
      <div>
        <Filter
          filters={this.props.keywords}
          display={this.state.filterShown}
          cancelFilters={this.cancelFilters}
          applyFilters={this.applyFilters}
          type="medications"
          scanPrescription={formData => this.props.scanPrescription(formData)}
          prescription={this.props.prescription}
        />
        <Search
          placeholder="Search Medication, desease...etc"
          type="medications"
          openFilterBox={this.openFilterBox}
          withFilter
          searchfunction={this.searchMedications}
        />
        <section className="topMedications">
          <div className="topMedications__container">
            {this.state.medications.length ? (
              <React.Fragment>
                <div className="medicationGrid mb-40">
                  {this.state.medications.map((medication, i) => (
                    <MedicineCard
                      key={i}
                      id={medication.id}
                      name={medication.name}
                      price={medication.price}
                      image={medication.image}
                      description={medication.description}
                      isFavourite={medication.is_favourite}
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
                      deleteFavouriteMedication={() =>
                        this.deleteFavouriteMedication(medication.id)
                      }
                      addFavouriteMedication={() =>
                        this.addFavouriteMedication(medication.id)
                      }
                    />
                  ))}
                </div>
                {!this.props.medicationsDone && (
                  <Button
                    className="btn btn-blue btn-lg"
                    onClick={this.seeMoreMedications}
                  >
                    {" "}
                    See more
                  </Button>
                )}
              </React.Fragment>
            ) : this.props.error.length || this.state.error ? (
              <div className="topMedications__container--no-medication">
                <p>
                  OPPS, This medication isn't found at any any pharmacy in your
                  district
                </p>
                <Button
                  className="btn btn-green-dark btn-lg"
                  onClick={() => this.setState({ requestMedicationBox: true })}
                >
                  Request the medication
                </Button>
              </div>
            ) : (
              <ReactLoading
                type="spokes"
                color="#0066ff"
                className="loading center mb-40"
              />
            )}
          </div>
        </section>
        {this.state.requestMedicationBox && (
          <RequestMedication
            closePopup={() => this.setState({ requestMedicationBox: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    api_token: state.user.api_token,
    medications: state.medicationsData.products,
    keywords: state.medicationsData.keywords,
    medicationsSearch: state.medicationsData.medicationsSearch,
    prescription: state.prescription.medications,
    error: state.medicationsData.errors,
    medicationsDone: state.medicationsData.medicationsDone
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestData: (api_token, skip, limit) =>
      dispatch({ type: actions.REQUEST_MEDICATIONS, api_token, skip, limit }),
    getMedicationsSearch: (api_token, search, skip, limit, keywords) =>
      dispatch({ type: actions.SEARCH_MEDICATIONS, api_token, search, skip, limit, keywords }),
    deleteFavouriteMedication: (data, source) =>
      dispatch({ type: actions.SAGA_DELETE_FAVOURITE, data, source }),
    addFavouriteMedication: (data, source) =>
      dispatch({ type: actions.SAGA_ADD_FAVOURITE, data, source }),
    scanPrescription: file =>
      dispatch({ type: actions.SCAN_PRESCRIPTION, file })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Medications);
