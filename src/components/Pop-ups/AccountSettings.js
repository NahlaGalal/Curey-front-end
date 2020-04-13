import React, { Component, useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import Button from "../Button";

const ChangePhoto = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const uploadImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    setImageName(file.name);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    if (e.target.files[0]) reader.readAsDataURL(file);
  };

  return (
    <React.Fragment>
      <h2 className="heading-2">Photo</h2>
      <p className="Popup__box__settings__description">
        Add a nice photo to your profile
      </p>
      <h4 className="heading-4">Image preview</h4>
      <img src={imageUrl || props.image} alt={`${props.name} profile-pic`} />
      <form onSubmit={(e) => e.preventDefault()}>
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
          />
          <label htmlFor="image">Upload</label>
        </div>
        <button type="submit" className="btn btn-green-dark btn-xxs">
          Save
        </button>
      </form>
    </React.Fragment>
  );
};

const ChangePhone = () => {
  let { register, handleSubmit, errors, watch } = useForm();

  return (
    <React.Fragment>
      <h2 className="heading-2">Phone number</h2>
      <p className="Popup__box__settings__description">Add your phone number</p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="fieldinput">
          <input
            name="phone"
            type="text"
            id="phone"
            className="fieldinput__input"
            onKeyPress={(e) =>
              !e.key.toString().match(/[0-9]/) ? e.preventDefault() : null
            }
            ref={register({
              required: true,
              validate: (value) => validator.isMobilePhone(value),
            })}
          />
          <label htmlFor="phone" className={watch("phone") ? "active" : null}>
            Your phone number is...
          </label>
          {errors.phone && (
            <p className="fieldinput__error">
              {errors.phone ? "You must type your phone correctly" : null}
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

const ChangePassword = () => {
  let { register, handleSubmit, errors, watch } = useForm();

  return (
    <React.Fragment>
      <h2 className="heading-2">Password</h2>
      <p className="Popup__box__settings__description">
        Edit your password here
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="fieldinput">
          <input
            name="current_password"
            id="passwordCurrent"
            type="password"
            className="fieldinput__input"
            ref={register({ required: true, minLength: 8, maxLength: 50 })}
          />
          <label
            htmlFor="passwordCurrent"
            className={watch("current_password") ? "active" : ""}
          >
            Current password
          </label>
          {errors.current_password && (
            <p className="fieldinput__error">
              {errors.current_password
                ? "Your password must be between 8 and 50 characters"
                : null}
            </p>
          )}
        </div>
        <div className="fieldinput">
          <input
            name="new_password"
            id="passwordNew"
            type="password"
            className="fieldinput__input"
            ref={register({ required: true, minLength: 8, maxLength: 50 })}
          />
          <label
            htmlFor="passwordNem"
            className={watch("new_password") ? "active" : ""}
          >
            New password
          </label>
          {errors.new_password && (
            <p className="fieldinput__error">
              {errors.new_password
                ? "Your password must be between 8 and 50 characters"
                : null}
            </p>
          )}
        </div>
        <div className="fieldinput">
          <input
            name="confirm_password"
            id="passwordConfirm"
            type="password"
            className="fieldinput__input"
            ref={register({
              required: true,
              validate: (value) => value === watch("new_password"),
            })}
          />
          <label
            htmlFor="passwordConfirm"
            className={watch("confirm_password") ? "active" : ""}
          >
            Repeat your password
          </label>
          {errors.confirm_password && (
            <p className="fieldinput__error">
              {errors.confirm_password ? "Passwords must be identical" : null}
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

const ChangeEmail = (props) => {
  let { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      email: props.email,
    },
  });

  return (
    <React.Fragment>
      <h2 className="heading-2">Email address</h2>
      <p className="Popup__box__settings__description">
        Edit you email address here
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="fieldinput">
          <input
            className="fieldinput__input"
            name="email"
            id="email"
            type="email"
            ref={register({
              required: true,
              maxLength: 50,
              validate: (value) => validator.isEmail(value),
            })}
          />
          <label htmlFor="email" className={watch("email") ? "active" : ""}>
            Email address
          </label>
          {errors.email && (
            <p className="fieldinput__error">
              {errors.email ? "Your email must be a valid email" : null}
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

class AccountSettings extends Component {
  state = {
    boxShown: "Photo",
  };

  toggleBoxShown = (e) =>
    this.setState({ boxShown: e.target.textContent.trim() });

  render() {
    return (
      <section className="Popup">
        <div
          className="Popup__box-grid Popup__box"
          onClick={(e) => e.stopPropagation()}
        >
          <aside className="Popup__box__aside">
            <div className="Popup__box__aside__image">
              <img
                src={this.props.user.image}
                alt={`${this.props.user.name} profile-pic`}
              />
            </div>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Photo" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Photo{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Phone number" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Phone number{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Change password" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Change password{" "}
            </Button>
            <Button
              className={`btn btn-transparent${
                this.state.boxShown === "Email address" ? " active" : ""
              }`}
              onClick={this.toggleBoxShown}
            >
              {" "}
              Email address{" "}
            </Button>
            <Button className="btn btn-transparent btn-transparent-warning">
              {" "}
              Delete account{" "}
            </Button>
          </aside>
          <div className="Popup__box__settings">
            {this.state.boxShown === "Photo" ? (
              <ChangePhoto
                image={this.props.user.image}
                name={this.props.user.name}
              />
            ) : this.state.boxShown === "Phone number" ? (
              <ChangePhone />
            ) : this.state.boxShown === "Change password" ? (
              <ChangePassword />
            ) : (
              <ChangeEmail email={this.props.user.email} />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default AccountSettings;
