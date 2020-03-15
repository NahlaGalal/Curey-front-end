import React, { Component } from "react";
import Button from "../Button";

class Search extends Component {
  state = {
    search: ""
  };

  onChangeHandler = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <div
          className={`${
            this.props.withFilter
              ? "Searchbar__input"
              : "Searchbar__input--no-filter"
          }`}
        >
          <input
            type="text"
            name="search"
            placeholder={this.props.placeholder}
            onChange={this.onChangeHandler}
            value={this.state.search}
          />
          {this.props.withFilter ? (
            <img
              className={`Searchbar__input--icon ${
                this.props.type === "medications"
                  ? "Searchbar__input--icon--medications"
                  : null
              }`}
              src={require("../../assets/svg/search.svg")}
              alt="search-doctor"
              onClick={() => this.props.searchDoctor(this.state.search)}
            />
          ) : null}
          {this.props.type === "doctors" ? (
            <Button className="btn btn-transparent btn-search">
              Search map
            </Button>
          ) : null}
        </div>

        {this.props.withFilter ? (
          <Button
            className="btn btn-green-dark btn-filter"
            onClick={this.props.openFilterBox}
          >
            Filter
          </Button>
        ) : null}
      </header>
    );
  }
}

export default Search;
