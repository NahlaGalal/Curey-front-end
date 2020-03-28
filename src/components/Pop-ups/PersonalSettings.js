import React, { Component, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import SelectBox from "../SelectBox";
import { connect } from "react-redux";
import * as actions from "../../actions/types";

const user = {
  name: "Nahla Galal"
};

const ChangeFullName = () => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      name: user.name
    }
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Full name</h2>
      <p className="Popup__box__settings__description">
        Edit your full name here
      </p>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <div className="fieldinput">
          <input
            name="name"
            type="text"
            id="name"
            className="fieldinput__input"
            ref={register({ required: true, minLength: 6, maxLength: 50 })}
          />
          <label htmlFor="name" className={watch("name") ? "active" : ""}>
            Full name
          </label>
          {errors.name && (
            <p className="fieldinput__error">
              {errors.name
                ? "Your name must be between 6 and 50 characters"
                : null}
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-green-dark btn-xxs">
          Change
        </button>
      </form>
    </React.Fragment>
  );
};

const ChangeCity = props => {
  let { register, handleSubmit, errors } = useForm({
    defaultValues: {
      City: "Mansoura"
    }
  });
  const [city, setCity] = useState({ city_id: 1, city: "Mansoura" });
  const [cityBoxOpened, setCityBoxOpened] = useState(false);
  let citiesContainerRef = React.createRef();

  const toggleCitySelectBox = () => {
    const prev = cityBoxOpened;
    let cityChosen = city.city,
      city_id = city.city_id;
    if (prev) {
      const inputChecked = Array.from(
        citiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter(input => input.checked)[0];
      cityChosen = inputChecked ? inputChecked.value : "";
      city_id = inputChecked ? inputChecked.id.split("_")[0] : "";
    }
    setCityBoxOpened(!prev);
    setCity({
      city_id,
      city: cityChosen
    });
  };

  return (
    <React.Fragment>
      <h2 className="heading-2">City</h2>
      <p className="Popup__box__settings__description">Edit your city here</p>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <SelectBox
          name="city_id"
          onClick={toggleCitySelectBox}
          className={`${city.city ? "hasValue" : null}`}
          listChecked={city.city_id ? [city.city] : []}
          header="City"
          boxOpened={cityBoxOpened}
          list={props.cities}
          optionsContainerRef={citiesContainerRef}
          multiSelect={false}
          isError={errors.City}
          error={errors.City ? "You must choose your city" : null}
          refe={register({
            validate: () => city.city_id !== null
          })}
        />
        <button type="submit" className="btn btn-green-dark btn-xxs">
          Change
        </button>
      </form>
    </React.Fragment>
  );
};

const ChangeAddress = () => {
  let { register, handleSubmit, errors, watch } = useForm();

  return (
    <React.Fragment>
      <h2 className="heading-2">Address</h2>
      <p className="Popup__box__settings__description">Add your address here</p>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <div className="fieldinput">
          <input
            name="address"
            type="text"
            id="address"
            className="fieldinput__input"
            ref={register({ required: true })}
          />
          <label htmlFor="address" className={watch("address") ? "active" : ""}>
            Address
          </label>
          {errors.address && (
            <p className="fieldinput__error">
              {errors.address ? "Your must type your address" : null}
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-green-dark btn-xxs">
          Save
        </button>
      </form>
    </React.Fragment>
  );
};

export class PersonalSettings extends Component {
  state = {
    boxShown: "Full name"
  };

  componentDidMount() {
    this.props.getCities();
  }

  toggleBoxShown = e =>
    this.setState({ boxShown: e.target.textContent.trim() });

  render() {
    return (
      <section className="Popup">
        <div
          className="Popup__box-grid Popup__box"
          onClick={e => e.stopPropagation()}
        >
          <aside className="Popup__box__aside">
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Full name" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Full name{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "City" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              City{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Address" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Address{" "}
            </Button>
          </aside>
          <div className="Popup__box__settings">
            {this.state.boxShown === "Full name" ? (
              <ChangeFullName />
            ) : this.state.boxShown === "City" ? (
              <ChangeCity cities={this.props.cities} />
            ) : (
              <ChangeAddress />
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  cities: state.user.cities
});

const mapDispatchToProps = dispatch => ({
  getCities: () => dispatch({ type: actions.SAGA_GET_CITIES })
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalSettings);
