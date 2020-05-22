import React, { Component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import Input from "../components/Input";
import { connect } from "react-redux";
import * as actions from "../actions/types";

import SelectBox from "../components/SelectBox";

const CompleteSignup = (props) => {
  const [city, setCity] = useState({ city_id: null, city: "" });
  const [cityBoxOpened, setCityBoxOpened] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [homeVisit, setHomeVisit] = useState(props.callup);
  const [speciality, setSpeciality] = useState({
    speciality_id: null,
    speciality: "",
  });
  const [specialityBoxOpened, setSpecialityBoxOpened] = useState(false);

  let { register, handleSubmit, errors, watch } = useForm();
  let citiesContainerRef = React.createRef();
  let specialitiesContainerRef = React.createRef();

  const toggleHomeVisit = () => {
    if (!homeVisit)
      register("callup_fees", { required: true, min: 10, max: 999999 });
    else register("callup_fees", { required: false });
    setHomeVisit(!homeVisit);
  };

  const toggleSpecialitySelectBox = () => {
    const prev = specialityBoxOpened;
    let specialityChosen = speciality.speciality,
      speciality_id = speciality.speciality_id;
    if (prev) {
      const inputChecked = Array.from(
        specialitiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter((input) => input.checked)[0];
      specialityChosen = inputChecked ? inputChecked.value : "";
      speciality_id = inputChecked ? inputChecked.id.split("_")[0] : "";
    }
    setSpecialityBoxOpened(!prev);
    setSpeciality({
      speciality_id,
      speciality: specialityChosen,
    });
  };

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
    props.postCompeleteSignup({
      api_token: props.api_token,
      address: data.address,
      phone: data.phone,
      city_id: +city.city_id,
      image: data.image,
      fees: data.fees,
      speciality_id: +speciality.speciality_id,
      offers_callup: data.offers_callup,
      callup_fees: data.callup_fees || 0,
      duration: data.duration,
    });
  };

  useEffect(() => {
    if (props.success) props.redirectToDashboard();
  });

  const toggleCitySelectBox = () => {
    const prev = cityBoxOpened;
    let city = "",
      city_id = "";
    if (prev) {
      const inputChecked = Array.from(
        citiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).filter((input) => input.checked)[0];
      city = inputChecked ? inputChecked.value : "";
      city_id = inputChecked ? inputChecked.id.split("_")[0] : "";
    }
    errors.city_id = undefined;
    setCityBoxOpened(!prev);
    setCity({
      city_id,
      city,
    });
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
            <p className="fieldinput__error">You must upload your image</p>
          )}
        </div>

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
          isError={errors.City || props.errors.city_id}
          error={
            errors.City ? "You must choose your city" : props.errors.city_id
          }
          refe={register({
            validate: () => city.city_id !== null,
          })}
        />

        <SelectBox
          name="speciality_id"
          onClick={toggleSpecialitySelectBox}
          className={`${speciality.speciality ? "hasValue" : null}`}
          listChecked={speciality.speciality_id ? [speciality.speciality] : []}
          header="Speciality"
          boxOpened={specialityBoxOpened}
          list={props.specialities}
          optionsContainerRef={specialitiesContainerRef}
          multiSelect={false}
          isError={errors.Speciality}
          error={errors.Speciality ? "You must choose your speciality" : null}
          refe={register({
            validate: () => speciality.speciality_id !== null,
          })}
        />

        <Input
          type="text"
          name="address"
          value={watch("address")}
          id="address"
          placeholder="address"
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

        <Input
          type="text"
          name="duration"
          value={watch("duration")}
          id="duration"
          placeholder="your duration"
          isError={errors.duration || props.errors.duration}
          error={
            errors.address
              ? "You must type your duration"
              : props.errors.address
          }
          onKeyPress={(e) =>
            !e.key.toString().match(/[0-9]/) ? e.preventDefault() : null
          }
          refe={register({ required: true })}
        />

        <Input
          type="text"
          name="fees"
          value={watch("fees")}
          id="fees"
          placeholder="your fees"
          isError={errors.fees || props.errors.fees}
          error={
            errors.address
              ? "You must type your fees from 10 to 999999"
              : props.errors.address
          }
          onKeyPress={(e) =>
            !e.key.toString().match(/[0-9]/) ? e.preventDefault() : null
          }
          refe={register({
            required: true,
            min: 10,
            max: 999999,
          })}
        />

        <div className="homeVisit">
          <input
            type="checkbox"
            id="homeVisit"
            name="offers_callup"
            ref={register}
            hidden
            onChange={toggleHomeVisit}
          />
          <label htmlFor="homeVisit">Home visit srevice</label>
        </div>
        <div className={`fieldinput${!homeVisit ? " hidden" : ""}`}>
          <input
            name="callup_fees"
            type="text"
            id="home-visit"
            className="fieldinput__input"
            onKeyPress={(e) =>
              !e.key.match(/[0-9]/) ? e.preventDefault() : null
            }
            ref={register}
          />
          <label
            htmlFor="home-visit"
            className={watch("callup_fees") ? "active" : ""}
          >
            Home visit fees
          </label>
          {errors.callup_fees && (
            <p className="fieldinput__error">
              {errors.callup_fees
                ? "You must type your home visit fees from 10 to 999999"
                : null}
            </p>
          )}
        </div>

        <button className="btn btn-md btn-green" type="submit">
          Save
        </button>
      </form>
    </section>
  );
};

/*********************************** */

class DoctorCompSignup extends Component {
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
                specialities={this.props.user.specialities}
                postCompeleteSignup={(data) => this.props.postCompeleteSignup(data, this.props.history)}
                success={this.props.success}
                errors={this.props.errors}
                api_token={this.props.api_token}
                image={this.props.user.image}
                redirectToDashboard={() =>
                  this.props.history.push("/doctor/statement")
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
  success: state.doctorData.success,
  errors: state.doctorData.errors,
});

const mapDispatchToProps = (dispatch) => ({
  postCompeleteSignup: (data, history) =>
    dispatch({ type: actions.SAGA_COMPLETE_DOCTOR_SIGNUP, data, history }),
  getCompleteSignup: (api_token, history) =>
    dispatch({ type: actions.SAGA_GET_COMPLETE_SIGNUP, api_token, history }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCompSignup);
