import React, { Component } from "react";
import Button from "../Button";
import SelectBox from "../SelectBox";

class PharmacyFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyChecked: { name: "", id: null },
      genericChecked: { name: "", id: null },
      pharmacologyChecked: { name: "", id: null },
      typeChecked: { name: "", id: null },
      companyBoxOpened: false,
      genericBoxOpened: false,
      pharmacologyBoxOpened: false,
      typeBoxOpened: false,
    };
    this.companyContainerRef = React.createRef();
    this.genericContainerRef = React.createRef();
    this.pharmacologyContainerRef = React.createRef();
    this.typeContainerRef = React.createRef();
  }

  checkFilter = (e) => {
    const filter = e.target.textContent;
    let {
      companyChecked,
      genericChecked,
      pharmacologyChecked,
      typeChecked,
    } = this.state;
    if (companyChecked.name === filter) {
      companyChecked = { name: "", id: null };
      Array.from(
        this.companyContainerRef.current.querySelectorAll("input[type=radio]")
      ).forEach((item) => (item.checked = false));
    } else if (genericChecked.name === filter) {
      genericChecked = { name: "", id: null };
      Array.from(
        this.genericContainerRef.current.querySelectorAll("input[type=radio]")
      ).forEach((item) => (item.checked = false));
    } else if (pharmacologyChecked.name === filter) {
      pharmacologyChecked = { name: "", id: null };
      Array.from(
        this.pharmacologyContainerRef.current.querySelectorAll(
          "input[type=radio]"
        )
      ).forEach((item) => (item.checked = false));
    } else {
      typeChecked = { name: "", id: null };
      Array.from(
        this.typeContainerRef.current.querySelectorAll("input[type=radio]")
      ).forEach((item) => (item.checked = false));
    }
    this.setState({
      companyChecked,
      genericChecked,
      pharmacologyChecked,
      typeChecked,
    });
  };

  closeBoxSelectBox = (box) => {
    let itemChecked = "";
    itemChecked = Array.from(
      this[`${box}ContainerRef`].current.querySelectorAll("input[type=radio]")
    ).find((input) => input.checked);
    if (itemChecked && itemChecked.id) {
      this.setState({
        [`${box}Checked`]: {
          name: itemChecked.value,
          id: itemChecked.id.split("_")[0],
        },
      });
    }
    this.setState({
      [`${box}BoxOpened`]: false,
    });
  };

  render() {
    const keywords = [
      this.state.companyChecked,
      this.state.genericChecked,
      this.state.pharmacologyChecked,
      this.state.typeChecked,
    ];

    return (
      <div className={`Filter ${this.props.display}`}>
        <section className="Filter__filterBox">
          <header>
            <h2> Filter </h2>
          </header>
          <div className="Filter__checked">
            {keywords.map(({ name, id }) => id && (
              <Button
                className="btn btn-filter active"
                key={id + name}
                onClick={(e) => this.checkFilter(e)}
              >
                {name}
              </Button>
            ))}
          </div>
          <div className="Filter__checkbox">
            <SelectBox
              onClick={() => this.closeBoxSelectBox("company")}
              openBox={() => this.setState({ companyBoxOpened: !this.state.companyBoxOpened })}
              className={`${this.state.companyChecked.id ? "hasValue" : null}`}
              listChecked={this.state.companyChecked.name}
              header="Company"
              boxOpened={this.state.companyBoxOpened}
              list={this.props.companies}
              optionsContainerRef={this.companyContainerRef}
            />
            <SelectBox
              onClick={() => this.closeBoxSelectBox("generic")}
              openBox={() => this.setState({ genericBoxOpened: !this.state.genericBoxOpened })}
              className={`${this.state.genericChecked.id ? "hasValue" : null}`}
              listChecked={this.state.genericChecked.name}
              header="Generic name"
              boxOpened={this.state.genericBoxOpened}
              list={this.props.generics}
              optionsContainerRef={this.genericContainerRef}
            />

            <SelectBox
              onClick={() => this.closeBoxSelectBox("pharmacology")}
              openBox={() => this.setState({ pharmacologyBoxOpened: !this.state.pharmacologyBoxOpened })}
              className={`${
                this.state.pharmacologyChecked.id ? "hasValue" : null
              }`}
              listChecked={this.state.pharmacologyChecked.name}
              header="Pharmacology"
              boxOpened={this.state.pharmacologyBoxOpened}
              list={this.props.pharmacologies}
              optionsContainerRef={this.pharmacologyContainerRef}
            />
            <SelectBox
              onClick={() => this.closeBoxSelectBox("type")}
              openBox={() => this.setState({ typeBoxOpened: !this.state.typeBoxOpened })}
              className={`${this.state.typeChecked.id ? "hasValue" : null}`}
              listChecked={this.state.typeChecked.name}
              header="Type"
              boxOpened={this.state.typeBoxOpened}
              list={this.props.types}
              optionsContainerRef={this.typeContainerRef}
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
                  types: [...this.state.typeChecked] || [],
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
