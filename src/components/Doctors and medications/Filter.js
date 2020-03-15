import React, { Component } from "react";
import { connect } from "react-redux";
import { scanPrescription } from "../../actions/prescriptionAction";
import Button from "../Button";
import SelectBox from "../SelectBox";
import FilterScanning from "../Pop-ups/FilterScanning";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersChecked: [],
      citiesChecked: [],
      citiesChecked_id: [],
      specialitiesChecked: [],
      filtersOptionsClass: [],
      cityBoxOpened: false,
      specialityBoxOpened: false,
      scanningOutcomeOpened: false
    };
    this.citiesContainerRef = React.createRef();
    this.specialitiesContainerRef = React.createRef();
    this.prescriptionScanned = React.createRef();
  }

  componentDidMount() {
    let filtersOptionsClass = [];
    this.props.filters.forEach(filter => filtersOptionsClass.push(false));
    this.setState({ filtersOptionsClass });
  }

  checkFilter = (e, i) => {
    let { filtersChecked, filtersOptionsClass } = this.state;
    const filter = e.target.textContent;
    const isChecked = filtersChecked.findIndex(
      filterChecked => filter.trim() === filterChecked
    );
    // Uncheck filter
    if (i === -1) {
      // If filter from common search
      i = this.props.filters.findIndex(filterOption => filter === filterOption);
      if (i === -1) {
        // If filter from cities
        let cityIndex = this.state.citiesChecked.findIndex(
          city => filter === city
        );
        if (cityIndex === -1) {
          // If filter from specialities
          let specialityIndex = this.state.specialitiesChecked.findIndex(
            speciality => filter === speciality
          );
          if (specialityIndex === -1) {
            // If filter from scanning prescription
            filtersChecked = filtersChecked
              .slice(0, isChecked)
              .concat(filtersChecked.slice(isChecked + 1));
            this.setState({ filtersChecked });
            return;
          }
          let { specialitiesChecked } = this.state;
          // Remove selected filter (speciality)
          specialitiesChecked = specialitiesChecked
            .slice(0, specialityIndex)
            .concat(specialitiesChecked.slice(specialityIndex + 1));
          this.setState({ specialitiesChecked });
          // Uncheck selected filter (speciality)
          Array.from(
            this.specialitiesContainerRef.current.querySelectorAll(
              "input[type=checkbox]"
            )
          ).filter(input => input.value === filter)[0].checked = false;
          return;
        }
        let { citiesChecked, citiesChecked_id } = this.state;
        // Remove selected filter (city)
        citiesChecked = citiesChecked
          .slice(0, cityIndex)
          .concat(citiesChecked.slice(cityIndex + 1));
        citiesChecked_id = citiesChecked_id
          .slice(0, cityIndex)
          .concat(citiesChecked_id.slice(cityIndex + 1));
        this.setState({ citiesChecked, citiesChecked_id });
        // Uncheck selected filter (city)
        Array.from(
          this.citiesContainerRef.current.querySelectorAll(
            "input[type=checkbox]"
          )
        ).filter(input => input.value === filter)[0].checked = false;
        return;
      }
    }
    filtersOptionsClass[i] = !filtersOptionsClass[i];
    if (isChecked === -1) {
      filtersChecked.push(filter);
    } else {
      filtersChecked = filtersChecked
        .slice(0, isChecked)
        .concat(filtersChecked.slice(isChecked + 1));
    }
    this.setState({ filtersChecked, filtersOptionsClass });
  };

  toggleCitySelectBox = () => {
    const { cityBoxOpened } = this.state;
    let citiesChecked = [],
      citiesChecked_id = [];
    if (cityBoxOpened) {
      citiesChecked = Array.from(
        this.citiesContainerRef.current.querySelectorAll("input[type=checkbox]")
      )
        .filter(input => input.checked)
        .map(el => el.value);
      citiesChecked_id = Array.from(
        this.citiesContainerRef.current.querySelectorAll("input[type=checkbox]")
      )
        .filter(input => input.checked)
        .map(el => el.id.split("_")[0]);
    }
    this.setState({
      cityBoxOpened: !cityBoxOpened,
      citiesChecked,
      citiesChecked_id
    });
  };

  toggleSpecialitySelectBox = () => {
    const { specialityBoxOpened } = this.state;
    let specialitiesChecked = [];
    if (specialityBoxOpened) {
      specialitiesChecked = Array.from(
        this.specialitiesContainerRef.current.querySelectorAll(
          "input[type=checkbox]"
        )
      )
        .filter(input => input.checked)
        .map(el => el.value);
    }
    this.setState({
      specialityBoxOpened: !specialityBoxOpened,
      specialitiesChecked
    });
  };

  scanPrescription = e => {
    if (e.target.files.length) {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      this.props.scanPrescription(formData);
      this.setState({ scanningOutcomeOpened: true });
    }
  };

  cancelScanning = () => {
    this.setState({ scanningOutcomeOpened: false });
  };

  applyScanning = () => {
    const medications = Array.from(
      this.prescriptionScanned.current.children
    ).map(element => element.textContent);
    this.setState({
      filtersChecked: [...this.state.filtersChecked, ...medications],
      scanningOutcomeOpened: false
    });
  };

  deleteMedication = e => {
    const element = e.target.parentNode.parentNode;
    element.parentNode.removeChild(element);
  };

  editMedication = e => {
    const medication = e.target.parentNode.parentNode.children[0];
    medication.classList.toggle("editable");
    medication.contentEditable =
      medication.contentEditable === "true" ? false : true;
  };

  render() {
    const keywords = [
      ...this.state.filtersChecked,
      ...this.state.citiesChecked,
      ...this.state.specialitiesChecked
    ];

    return (
      <div className={`Filter ${this.props.display}`}>
        <section className="Filter__filterBox">
          <header>
            <h2> Filter </h2>
          </header>
          <div className="Filter__checked">
            {keywords.map((filter, i) => (
              <Button
                className="btn btn-filter active"
                key={i}
                onClick={e => this.checkFilter(e, -1)}
              >
                {filter}
              </Button>
            ))}
          </div>
          {this.props.type === "medications" ? (
            <form className="Filter__prescription">
              <input
                type="file"
                name="image"
                id="prescription"
                hidden
                accept="image/*"
                onChange={e => this.scanPrescription(e)}
              />
              <label
                htmlFor="prescription"
                className="btn checkout-btn Filter__prescription__label"
              >
                Filter by prescription
              </label>
            </form>
          ) : null}
          <div className="Filter__options">
            <h3> Common search </h3>
            {this.props.filters.map((filter, i) => (
              <Button
                className={`btn btn-filter ${
                  this.state.filtersOptionsClass[i] ? "active" : null
                }`}
                key={i}
                onClick={e => this.checkFilter(e, i)}
              >
                {filter}
              </Button>
            ))}
          </div>
          {this.props.type === "doctors" ? (
            <div className="Filter__checkbox">
              <h3> City & Speciality </h3>
              <div>
                <SelectBox
                  onClick={this.toggleCitySelectBox}
                  className={`${
                    this.state.citiesChecked.length ? "hasValue" : null
                  }`}
                  listChecked={this.state.citiesChecked}
                  header="Cities"
                  boxOpened={this.state.cityBoxOpened}
                  list={this.props.cities}
                  optionsContainerRef={this.citiesContainerRef}
                  multiple={true}
                />
              </div>
              <div>
                <SelectBox
                  onClick={this.toggleSpecialitySelectBox}
                  className={`${
                    this.state.specialitiesChecked.length ? "hasValue" : null
                  }`}
                  listChecked={this.state.specialitiesChecked}
                  header="Specialities"
                  boxOpened={this.state.specialityBoxOpened}
                  list={this.props.specialities}
                  optionsContainerRef={this.specialitiesContainerRef}
                  multiple={true}
                />
              </div>
            </div>
          ) : null}
          <div className="Filter__buttons">
            <Button
              className="btn btn-green-dark btn-apply btn-xxs"
              onClick={() =>
                this.props.applyFilters({
                  cities: [...this.state.citiesChecked_id] || [],
                  specialities: [...this.state.specialitiesChecked] || []
                })
              }
            >
              {" "}
              Apply{" "}
            </Button>
            <Button
              className="btn btn-transparent btn-cancel btn-xxs"
              onClick={this.props.cancelFilters}
            >
              {" "}
              Cancel{" "}
            </Button>
          </div>
        </section>
        {this.state.scanningOutcomeOpened && (
          <FilterScanning
            prescription={this.props.prescription}
            prescriptionScanned={this.prescriptionScanned}
            editMedication={this.editMedication}
            deleteMedication={this.deleteMedication}
            applyScanning={this.applyScanning}
            cancelScanning={this.cancelScanning}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  prescription: state.prescription.medications || []
});

const mapDispatchToProps = dispatch => ({
  scanPrescription: file => dispatch(scanPrescription(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
