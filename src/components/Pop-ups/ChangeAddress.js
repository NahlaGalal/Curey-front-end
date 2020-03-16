import React, { Component } from "react";
import Button from "../Button";
import SelectBox from "../SelectBox";
import FieldInput from "../FieldInput";

const cityList = [
  {
    name: "Mansoura",
    id: 1
  },
  {
    name: "El-Mahalla",
    id: 2
  },
  { name: "Bilqas", id: 3 },
  { name: "El-Manzalah", id: 4 }
];

class ChangeAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      cityBoxOpened: false,
      city: "",
      activeToggler: 0
    };

    this.citiesContainerRef = React.createRef();
  }

  onChangeHandler = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  toggleCitySelectBox = () => {
    const prev = this.state.cityBoxOpened;
    let city = "";
    if (prev) {
      const inputChecked = Array.from(
        this.citiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter(input => input.checked)[0];
      city = inputChecked ? inputChecked.value : "";
    }
    this.setState({
      cityBoxOpened: !prev,
      city
    });
  };

  render() {
    return (
      <section className="Popup">
        <div className="Popup__box">
          <h2 className="heading-2">Change address</h2>
          <div className="Popup__box__toggler toggler address-toggler">
            <Button
              className={this.state.activeToggler ? "btn" : "btn active"}
              onClick={() => this.setState({ activeToggler: 0 })}
            >
              Set a new address
            </Button>
            <Button
              className={this.state.activeToggler ? "btn active" : "btn"}
              onClick={() => this.setState({ activeToggler: 1 })}
            >
              Just for this order
            </Button>
          </div>
          <form className="Popup__box__details">
            <SelectBox
              name="city_id"
              onClick={this.toggleCitySelectBox}
              className={`${this.state.city ? "hasValue" : null}`}
              listChecked={this.state.city ? [this.state.city] : []}
              header="City"
              boxOpened={this.state.cityBoxOpened}
              list={cityList}
              optionsContainerRef={this.citiesContainerRef}
              multiSelect={false}
            />
            <FieldInput
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.onChangeHandler}
              placeholder="The delivery address is..."
            />
          </form>
          <div className="Popup__box__footer buttons">
            <Button
              className="btn btn-xxs btn-green-dark btn-apply"
              onClick={this.props.closePopup}
            >
              Confirm
            </Button>
            <Button
              className="btn btn-xxs btn-cancel btn-transparent"
              onClick={this.props.closePopup}
            >
              Cancel
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

export default ChangeAddress;
