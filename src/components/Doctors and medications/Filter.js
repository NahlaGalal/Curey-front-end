import React, { Component } from "react";
import Button from "../Button";
import SelectBox from "../SelectBox";

export default class Filter extends Component {
  state = {
    filtersChecked: [],
    citiesChecked: [],
    specialitiesChecked: [],
    filtersOptionsClass: [],
    cityBoxOpened: false,
    specialityBoxOpened: false
  };

  citiesContainerRef = React.createRef();
  specialitiesContainerRef = React.createRef();

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
    if (i === -1) {
      i = this.props.filters.findIndex(filterOption => filter === filterOption);
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
    let citiesChecked = [];
    if (cityBoxOpened) {
      citiesChecked = Array.from(
        this.citiesContainerRef.current.querySelectorAll("input[type=checkbox]")
      )
        .filter(input => input.checked)
        .map(el => el.value);
    }
    this.setState({
      cityBoxOpened: !cityBoxOpened,
      citiesChecked
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

  render() {
    const cityList = ["Cairo", "Mansoura", "El-Mahalla", "Bilqas"];

    const specialityList = ["Surgery", "Children", "Dental"];

    return (
      <div className={`Filter ${this.props.display}`}>
        <section className="Filter__filterBox">
          <header>
            <h2> Filter </h2>
          </header>
          <div className="Filter__checked">
            {this.state.filtersChecked.map((filter, i) => (
              <Button
                className="btn btn-filter active"
                key={i}
                onClick={e => this.checkFilter(e, -1)}
              >
                {filter}
              </Button>
            ))}
          </div>
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
          <div className="Filter__checkbox">
            <h3> City & Speciality </h3>
            <div>
              <SelectBox
                onClick={this.toggleCitySelectBox}
                className={`${this.state.citiesChecked.length ? "hasValue" : null}`}
                listChecked={this.state.citiesChecked}
                header="Cities"
                boxOpened={this.state.cityBoxOpened}
                list={cityList}
                optionsContainerRef={this.citiesContainerRef}
              />
            </div>
            <div>
              <SelectBox
                onClick={this.toggleSpecialitySelectBox}
                className={
                  this.state.specialitiesChecked.length ? "hasValue" : null
                }
                listChecked={this.state.specialitiesChecked}
                header="Specialities"
                boxOpened={this.state.specialityBoxOpened}
                list={specialityList}
                optionsContainerRef={this.specialitiesContainerRef}
              />
            </div>
          </div>
          <div className="Filter__buttons">
            <Button
              className="btn btn-popup btn-apply"
              onClick={() => this.props.applyFilters(this.state.filtersChecked)}
            >
              {" "}
              Apply{" "}
            </Button>
            <Button
              className="btn btn-transparent btn-cancel"
              onClick={this.props.cancelFilters}
            >
              {" "}
              Cancel{" "}
            </Button>
          </div>
        </section>
      </div>
    );
  }
}
