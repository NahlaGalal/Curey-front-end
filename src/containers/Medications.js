import React, { Component } from "react";
import MedicineCard from "../components/Doctors and medications/MedicineCard";
import Search from "../components/Doctors and medications/Search";
import Filter from "../components/Doctors and medications/Filter";
// import Button from "../components/Button";
import RequestMedication from "../components/Pop-ups/RequestMedication";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import ReactLoading from "react-loading";

const medications = [
  {
    name: "Antinal",
    price: 12,
    isFavourite: true,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    isFavourite: true,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    isFavourite: true,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    isFavourite: true,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    isFavourite: true,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    isFavourite: true,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  }
];

// const medications = [];

const Filters = [
  "Injection",
  "Keyword0",
  "Keyword1",
  "Keyword2",
  "Pill",
  "Keyword3",
  "Keyword4",
  "Anti-tussive",
  "Cold",
  "Keyword5",
  "Keyword6",
  "Keyword7"
];

class Medications extends Component {
  state = {
    filterShown: "hidden",
    hovered: [],
    requestMedicationBox: false,
    medications: []
  };

  componentDidMount() {
    this.setState({ hovered: new Array(medications.length).fill(false) });
    this.props.onRequestData(this.props.api_token);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.medications) !==
      JSON.stringify(this.props.medications)
    ) {
      this.setState({ medications: this.props.medications });
    }
    if (
      JSON.stringify(prevProps.medicationsSearch) !==
      JSON.stringify(this.props.medicationsSearch)
    ) {
      this.setState({ medications: this.props.medicationsSearch });
    }
  }

  openFilterBox = () => this.setState({ filterShown: "visible" });
  cancelFilters = () => this.setState({ filterShown: "hidden" });
  applyFilters = filters => {
    this.setState({ filterShown: "hidden" });
  };

  searchMedications = search => {
    this.props.getMedicationsSearch(this.props.api_token, search);
  };

  render() {
    return (
      <div>
        <Filter
          filters={Filters}
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
                {this.state.medications.map((medication, i) => (
                  <MedicineCard
                    key={i}
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
                  />
                ))}
              </div>
            ) : (
              //   <div className="topMedications__container--no-medication">
              //     <p>
              //       OPPS, This medication isn't found at any any pharmacy in your
              //       district
              //     </p>
              //     <Button
              //       className="btn btn-green btn-lg"
              //       onClick={() => this.setState({ requestMedicationBox: true })}
              //     >
              //       Request the medication
              //     </Button>
              //   </div>
              // )
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
      dispatch({ type: actions.SEARCH_MEDICATIONS, api_token, search })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Medications);
