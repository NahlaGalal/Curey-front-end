import React from "react";
import Button from "../Button";

const Search = props => {
  return (
    <header className="Searchbar">
      <div
        className={`${
          props.withFilter ? "Searchbar__input" : "Searchbar__input--no-filter"
        }`}
      >
        <input type="text" placeholder={props.placeholder} />
        {props.withFilter ? (
          <img
            className={`Searchbar__input--icon ${
              props.type === "medications"
                ? "Searchbar__input--icon--medications"
                : null
            }`}
            src={require("../../assets/svg/search.svg")}
            alt="logo"
          />
        ) : null}
        {props.type === "doctors" ? (
          <Button className="btn btn-transparent btn-search">Search map</Button>
        ) : null}
      </div>

      {props.withFilter ? (
        <Button
          className="btn btn-green-dark btn-filter"
          onClick={props.openFilterBox}
        >
          Filter
        </Button>
      ) : null}
    </header>
  );
};

export default Search;
