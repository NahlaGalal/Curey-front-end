import React, { Component } from "react";
import Button from "../../components/Button";
import Search from "../../components/Doctors and medications/Search";
import PharmacyCard from "../../components/pharmacy/PharmacyCard";
import PharmacyFilter from "../../components/pharmacy/PharmacyFilter";
import { connect } from "react-redux";
import { SAGA_GET_MEDICATIONS } from "../../actions/types";
import ReactLoading from "react-loading";

export class MedicationsList extends Component {
  state = {
    filterShown: "hidden",
    search: "",
    filters: {
      keywords: []
    }
  };

  componentDidMount() {
    this.props.getMedicationsList(this.props.api_token, this.props.history);
  }

  openFilterBox = () => this.setState({ filterShown: "visible" });
  cancelFilters = () => this.setState({ filterShown: "hidden" });
  applyFilters = () => {};

  render() {
    const companies = [
      { name: "Company1", id: 1 },
      { name: "Company2", id: 2 },
      { name: "Company3", id: 3 }
    ];
    const generics = [
      { name: "generic1", id: 1 },
      { name: "generic2", id: 2 },
      { name: "generic3", id: 3 }
    ];
    const pharmacologies = [
      { name: "pharmacology1", id: 1 },
      { name: "pharmacology2", id: 2 },
      { name: "pharmacology3", id: 3 }
    ];
    const types = [
      { name: "type1", id: 1 },
      { name: "type2", id: 2 },
      { name: "type3", id: 3 }
    ];

    return (
      <div className="pharamcyDashboardContainer">
        <Button className="btn btn-green-dark btn-connect">
          Connect with local data
        </Button>
        <PharmacyFilter
          filters={[]}
          display={this.state.filterShown}
          cancelFilters={this.cancelFilters}
          applyFilters={this.applyFilters}
          type="medications"
          companies={companies}
          generics={generics}
          pharmacologies={pharmacologies}
          types={types}
        />
        <Search
          placeholder="Search through the medications list"
          type="medications"
          openFilterBox={this.openFilterBox}
          withFilter
        />
        <div className="dashboardGrid">
          {this.props.medications.length ? (
            this.props.medications.slice(0, 12).map((medication, i) => (
              <PharmacyCard medication={medication} key={i} />
            ))
          ) : this.props.errors.error ? (
            <p className="error"> No medications yet </p>
          ) : (
            <ReactLoading
              type="spokes"
              color="#0066ff"
              className="loading center mb-40"
            />
          )}
        </div>
        {this.props.medications.length ? (
          <Button className="btn btn-blue btn-lg">See more</Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api_token: state.user.api_token,
  medications: state.pharmacyData.medications,
  errors: state.pharmacyData.errors
});

const mapDispatchToProps = dispatch => ({
  getMedicationsList: (api_token, history) =>
    dispatch({ type: SAGA_GET_MEDICATIONS, api_token, history })
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicationsList);
