import React from "react";
import Button from "../Button";

const Search = props => {
  return (
    <header className="Searchbar">
      <div className="Searchbar__input">
        <input type="text" placeholder={props.placeholder} />
        <img
          className={`Searchbar__input--icon ${
            props.type === "medications"
              ? "Searchbar__input--icon--medications"
              : null
          }`}
          src={require("../../assets/svg/search.svg")}
          alt="logo"
        />
        {props.type === "doctors" ? (
          <Button className="btn btn-transparent btn-search">Search map</Button>
        ) : null}
      </div>

      {props.withFilter ? (
        <Button
          className="btn btn-search btn-popup"
          onClick={props.openFilterBox}
        >
          Filter
        </Button>
      ) : null}
    </header>
  );
};

export default Search;
