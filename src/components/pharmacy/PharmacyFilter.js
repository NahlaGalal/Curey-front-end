import React, { Component } from "react";
import Button from "../Button";
import SelectBox from "../SelectBox";

class PharmacyFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyChecked: [],
      genericChecked: [],
      pharmacologyChecked: [],
      typeChecked: [],
      companyBoxOpened: false,
      genericBoxOpened: false,
      pharmacologyBoxOpened: false,
      typeBoxOpened: false
    };
    this.companyContainerRef = React.createRef();
    this.genericContainerRef = React.createRef();
    this.pharmacologyContainerRef = React.createRef();
    this.typeContainerRef = React.createRef();
  }

  checkFilter = e => {
    const filter = e.target.textContent;
    let {
      companyChecked,
      genericChecked,
      pharmacologyChecked,
      typeChecked
    } = this.state;
    if (companyChecked.find(item => item.name === filter)) {
      companyChecked = [];
      Array.from(
        this.companyContainerRef.current.querySelectorAll("input[type=radio]")
      ).forEach(item => (item.checked = true));
    } else if (genericChecked.find(item => item.name === filter)) {
      genericChecked = [];
      Array.from(
        this.genericContainerRef.current.querySelectorAll("input[type=radio]")
      ).forEach(item => (item.checked = true));
    } else if (pharmacologyChecked.find(item => item.name === filter)) {
      pharmacologyChecked = [];
      Array.from(
        this.pharmacologyContainerRef.current.querySelectorAll(
          "input[type=radio]"
        )
      ).forEach(item => (item.checked = true));
    } else {
      typeChecked = [];
      Array.from(
        this.typeContainerRef.current.querySelectorAll("input[type=radio]")
      ).forEach(item => (item.checked = true));
    }
    this.setState({
      companyChecked,
      genericChecked,
      pharmacologyChecked,
      typeChecked
    });
  };

  toggleBoxSelectBox = box => {
    const boxOpened = this.state[`${box}BoxOpened`];
    let itemChecked = [];
    if (boxOpened) {
      itemChecked = Array.from(
        this[`${box}ContainerRef`].current.querySelectorAll("input[type=radio]")
      )
        .filter(input => input.checked)
        .map(el => ({
          name: el.value,
          id: el.id.split("_")[0]
        }));
    }
    this.setState({
      [`${box}BoxOpened`]: !boxOpened,
      [`${box}Checked`]: itemChecked
    });
  };

  render() {
    const keywords = [
      ...this.state.companyChecked,
      ...this.state.genericChecked,
      ...this.state.pharmacologyChecked,
      ...this.state.typeChecked
    ];

    return (
      <div className={`Filter ${this.props.display}`}>
        <section className="Filter__filterBox">
          <header>
            <h2> Filter </h2>
          </header>
          <div className="Filter__checked">
            {keywords.map(({ name, id }) => (
              <Button
                className="btn btn-filter active"
                key={id + name}
                onClick={e => this.checkFilter(e)}
              >
                {name}
              </Button>
            ))}
          </div>
          <div className="Filter__checkbox">
            <SelectBox
              onClick={() => this.toggleBoxSelectBox("company")}
              className={`${
                this.state.companyChecked.length ? "hasValue" : null
              }`}
              listChecked={this.state.companyChecked.map(item => item.name)}
              header="Company"
              boxOpened={this.state.companyBoxOpened}
              list={this.props.companies}
              optionsContainerRef={this.companyContainerRef}
              multiple={false}
            />
            <SelectBox
              onClick={() => this.toggleBoxSelectBox("generic")}
              className={`${
                this.state.genericChecked.length ? "hasValue" : null
              }`}
              listChecked={this.state.genericChecked.map(item => item.name)}
              header="Generic name"
              boxOpened={this.state.genericBoxOpened}
              list={this.props.generics}
              optionsContainerRef={this.genericContainerRef}
              multiple={false}
            />

            <SelectBox
              onClick={() => this.toggleBoxSelectBox("pharmacology")}
              className={`${
                this.state.pharmacologyChecked.length ? "hasValue" : null
              }`}
              listChecked={this.state.pharmacologyChecked.map(
                item => item.name
              )}
              header="Pharmacology"
              boxOpened={this.state.pharmacologyBoxOpened}
              list={this.props.pharmacologies}
              optionsContainerRef={this.pharmacologyContainerRef}
              multiple={false}
            />
            <SelectBox
              onClick={() => this.toggleBoxSelectBox("type")}
              className={`${this.state.typeChecked.length ? "hasValue" : null}`}
              listChecked={this.state.typeChecked.map(item => item.name)}
              header="Type"
              boxOpened={this.state.typeBoxOpened}
              list={this.props.types}
              optionsContainerRef={this.typeContainerRef}
              multiple={false}
            />
          </div>
          <div className="Filter__buttons">
            <Button
              className="btn btn-green-dark btn-apply btn-xxs"
              onClick={() =>
                this.props.applyFilters({
                  companies: [...this.state.companyChecked] || [],
                  generics: [...this.state.genericChecked] || [],
                  pharmacologies: [...this.state.pharmacologyChecked] || [],
                  types: [...this.state.typeChecked] || []
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
      </div>
    );
  }
}

export default PharmacyFilter;
