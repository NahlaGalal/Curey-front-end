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
    searchResults: false
  };

  componentDidMount() {
    this.props.onRequestData(this.props.api_token);
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
        hovered: new Array(this.props.medicationsSearch.length).fill(false),
        searchResults: true
      });
    }
  }

  openFilterBox = () => this.setState({ filterShown: "visible" });
  cancelFilters = () => this.setState({ filterShown: "hidden" });
  applyFilters = filters => {
    this.setState({ filterShown: "hidden" });
  };

  searchMedications = search => {
    this.setState({ searchResults: false });
    this.props.getMedicationsSearch(this.props.api_token, search);
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

  render() {
    return (
      <div>
        <Filter
          filters={this.props.keywords.map(key => key.name)}
          display={this.state.filterShown}
          cancelFilters={this.cancelFilters}
          applyFilters={this.applyFilters}
          type="medications"
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
              <div className="medicationGrid">
                {this.state.medications.slice(0, 16).map((medication, i) => (
                  <MedicineCard
                    key={i}
                    id={medication.id}
                    name={medication.name}
                    price={medication.price}
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
            ) : this.state.searchResults ? (
              <div className="topMedications__container--no-medication">
                <p>
                  OPPS, This medication isn't found at any any pharmacy in your
                  district
                </p>
                <Button
                  className="btn btn-green btn-lg"
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
    medicationsSearch: state.medicationsData.medicationsSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestData: api_token =>
      dispatch({ type: actions.REQUEST_MEDICATIONS, api_token }),
    getMedicationsSearch: (api_token, search) =>
      dispatch({ type: actions.SEARCH_MEDICATIONS, api_token, search }),
    deleteFavouriteMedication: (data, source) =>
      dispatch({ type: actions.SAGA_DELETE_FAVOURITE, data, source }),
    addFavouriteMedication: (data, source) =>
      dispatch({ type: actions.SAGA_ADD_FAVOURITE, data, source })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Medications);
