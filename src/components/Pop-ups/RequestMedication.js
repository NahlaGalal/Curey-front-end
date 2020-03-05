import React, { Component } from "react";
import Button from "../Button";
import FieldInput from "../FieldInput";
import SelectBox from "../SelectBox";

const medicationTypes = [
  "Anti-tussive",
  "Anti-viral",
  "Appetizer",
  "Artificial Sweetner"
]

class RequestMedication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medication: "",
      medicationTypeBox: false,
      medicationType: ""
    };
  
    this.medicationTypeRef = React.createRef();
  }

  onChangeHandler = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  toggleMedicationType = () => {
    const prev = this.state.medicationTypeBox;
    let medicationType = "";
    if (prev) {
      const inputChecked = Array.from(
        this.medicationTypeRef.current.querySelectorAll("input[type=radio]")
      ).filter(input => input.checked)[0];
      medicationType = inputChecked ? inputChecked.value : "";
    }
    this.setState({
      medicationTypeBox: !prev,
      medicationType
    });
  };

  render() {
    return (
      <section className="Popup">
        <div className="Popup__box">
          <h2 className="heading-2">Request the medication</h2>
          <form className="Popup__box__details">
            <FieldInput
              type="text"
              name="medication"
              value={this.state.medication}
              onChange={this.onChangeHandler}
              placeholder="Medication name"
            />
            <SelectBox
              name="medication-type"
              onClick={this.toggleMedicationType}
              className={`${this.state.medicationType ? "hasValue" : null}`}
              listChecked={
                this.state.medicationType ? [this.state.medicationType] : []
              }
              header="Medication type"
              boxOpened={this.state.medicationTypeBox}
              list={medicationTypes}
              optionsContainerRef={this.medicationTypeRef}
              multiSelect={false}
            />
            <p className="Popup__box__details__note fades">
              We will search for this medication for you, and we'll inform you
              with the pharmacy where the medication existed
            </p>
            <div className="Popup__box__footer buttons">
              <Button
                className="btn btn-xxs btn-green-dark btn-apply"
                onClick={this.props.closePopup}
              >
                Ok, Got it
              </Button>
              <Button
                className="btn btn-xxs btn-cancel btn-transparent"
                onClick={this.props.closePopup}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default RequestMedication;
