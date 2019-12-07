import React from "react";
import Button from "../Button";

const Filters = [
  "Injection",
  "Keyword",
  "Keyword",
  "Keyword",
  "Pill",
  "Keyword",
  "Keyword",
  "Anti-tussive",
  "Cold",
  "Keyword",
  "Keyword",
  "Keyword"
];

export const Filter = props => {
  const filtersChecked = ["Keyword", "Pill", "Injection"];

  return (
    <div className="Filter">
      <section className="Filter__filterBox">
        <header>
          <h2> Filter </h2>
        </header>
        <div className="Filter__checked">
          {filtersChecked.map((filter, i) => (
            <Button className="btn btn-filter active" key={i}>
              {filter}
            </Button>
          ))}
        </div>
        <div className="Filter__options">
          <h3> Common search </h3>
          {Filters.map((filter, i) => (
            <Button className="btn btn-filter" key={i}>
              {filter}
            </Button>
          ))}
        </div>
        <div className="Filter__buttons">
          <Button
            className="btn btn-popup btn-apply"
            onClick={() => props.applyFilters(filtersChecked)}
          >
            {" "}
            Apply{" "}
          </Button>
          <Button
            className="btn btn-transparent btn-cancel"
            onClick={props.cancelFilters}
          >
            {" "}
            Cancel{" "}
          </Button>
        </div>
      </section>
    </div>
  );
};
