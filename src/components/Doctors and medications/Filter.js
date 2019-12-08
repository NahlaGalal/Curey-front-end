import React, { Component } from "react";
import Button from "../Button";

export default class Filter extends Component {
  state = {
    filtersChecked: [],
    filtersOptionsClass: []
  };

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

  render() {
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
          <div className="Filter__Checkbox"></div>
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
