import React, { Component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import validator from "validator";
import SelectBox from "../components/SelectBox";

const CompleteSignup = (props) => {
  const [city, setCity] = useState({ city_id: null, city: "" });
  const [cityBoxOpened, setCityBoxOpened] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  let { register, handleSubmit, errors, watch } = useForm();
  let citiesContainerRef = React.createRef();

  const uploadImage = async (e) => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (file) reader.readAsDataURL(file);
        setImageName(file.name);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
      });

    const imageUrl = await toBase64(e.target.files[0]);
    setImageUrl(imageUrl);
  };

  const onSubmitHandler = (data) => {
    props.postCompleteSignup({
      api_token: props.api_token,
      address: data.address,
      phone: data.phone,
      city_id: +city.city_id,
      image: data.image,
    });
  };

  useEffect(() => {
    if (props.success) props.redirectToDashboard();
  });

  const closeCitySelectBox = () => {
    const inputChecked = Array.from(
      citiesContainerRef.current.querySelectorAll("input[type=radio]")
    ).find((input) => input.checked);
    errors.city_id = undefined;
    setCityBoxOpened(false);
    if (inputChecked && inputChecked.id) {
      setCity({
        city_id: inputChecked.id.split("_")[0],
        city: inputChecked.value,
      });
    }
  };

  return (
    <section className="signup__container__forms__user">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          onSubmitHandler(data);
        })}
      >
        <h4 className="heading-4">Image preview</h4>
        <img src={imageUrl || props.image} alt={`${props.name} profile-pic`} />
        <div className="fieldinput fieldinput-image">
          <span
            className={`fieldinput__input fieldinput-image__input${
              imageUrl ? " active" : ""
            }`}
          >
            {imageName || "Upload an image"}
          </span>
          <input
            name="image"
            id="image"
            type="file"
            hidden
            onChange={uploadImage}
            accept="image/*"
            ref={register({ required: true })}
          />
          <label htmlFor="image">Upload</label>
          {errors.image && (
            <p className="fieldinput__error">You must upload pharmacy logo</p>
          )}
        </div>

        <SelectBox
          name="city_id"
          onClick={closeCitySelectBox}
          openBox={() => setCityBoxOpened(!cityBoxOpened)}
          className={`${city.city_id ? "hasValue" : null}`}
          listChecked={city.city_id ? city.city : ""}
          header="City"
          boxOpened={cityBoxOpened}
          list={props.cities}
          optionsContainerRef={citiesContainerRef}
          isError={errors.City || props.errors.city_id}
          error={
            errors.City ? "You must choose your city" : props.errors.city_id
          }
          refe={register({
            validate: () => city.city_id !== null,
          })}
        />

        <Input
          type="text"
          name="address"
          value={watch("address")}
          id="address"
          placeholder="Pharmacy address"
          isError={errors.address || props.errors.address}
          error={
            errors.address
              ? "Your address must be between 15 and 200 characters"
              : props.errors.address
          }
          refe={register({
            required: true,
            minLength: 15,
            maxLength: 200,
          })}
        />

        <Input
          type="text"
          name="phone"
          value={watch("phone")}
          id="phone"
          placeholder="Phone"
          isError={errors.phone || props.errors.phone}
          error={
            errors.phone
              ? "Your phone must be a valid phone number"
              : props.errors.email
          }
          refe={register({
            required: true,
            validate: (value) => validator.isMobilePhone(value),
          })}
          onKeyPress={(e) =>
            !e.key.toString().match(/[0-9]/) ? e.preventDefault() : null
          }
        />
        <button className="btn btn-md btn-green" type="submit">
          Save
        </button>
      </form>
    </section>
  );
};

/*********************************** */

class PharmCompSignup extends Component {
  componentDidMount() {
    this.props.getCompleteSignup(this.props.api_token, this.props.history);
  }

  render() {
    return (
      <section className="signup">
        <section className="signup__container">
          <section
            className="signup__container__forms"
            style={{ marginTop: "3.6rem" }}
          >
            <h1>
              Hi,
              <span>Complete your profile</span>
            </h1>
            <div className={"signup__container__forms__slider"}>
              <CompleteSignup
                cities={this.props.user.cities}
                image={this.props.image}
                postCompleteSignup={(data) =>
                  this.props.postCompleteSignup(data, this.props.history)
                }
                success={this.props.success}
                errors={this.props.errors}
                api_token={this.props.api_token}
                redirectToDashboard={() =>
                  this.props.history.push("/pharmacy/statement")
                }
              />
            </div>
          </section>
          <footer className="signup__container__footer">
            <p>All Rights Reserved © Curey</p>
          </footer>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  api_token: state.user.api_token,
  image: state.user.image,
  success: state.pharmacyData.success,
  errors: state.pharmacyData.errors,
});

const mapDispatchToProps = (dispatch) => ({
  postCompleteSignup: (data, history) =>
    dispatch({ type: actions.SAGA_COMPLETE_PHARM_SIGNUP, data, history }),
  getCompleteSignup: (api_token, history) =>
    dispatch({ type: actions.SAGA_GET_COMPLETE_SIGNUP, api_token, history }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PharmCompSignup);
