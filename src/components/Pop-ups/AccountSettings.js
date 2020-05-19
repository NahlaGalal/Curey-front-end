import React, { useState } from "react";
import Button from "../Button";
import ChangeAddress from "../Settings/ChangeAddress";
import ChangeFullName from "../Settings/ChangeFullName";
import ChangeEmail from "../Settings/ChangeEmail";
import ChangePassword from "../Settings/ChangePassword";
import ChangePhone from "../Settings/ChangePhone";
import ChangePhoto from "../Settings/ChangePhoto";
import ChangePharmacyName from "../Settings/ChangePharmacyName";

const AccountSettings = (props) => {
  const [boxShown, setBoxShown] = useState("Photo");

  const toggleBoxShown = (e) => setBoxShown(e.target.textContent.trim());

  return (
    <section className="Popup">
      <div
        className="Popup__box-grid Popup__box"
        onClick={(e) => e.stopPropagation()}
      >
        <aside className="Popup__box__aside">
          <div className="Popup__box__aside__image">
            <img src={props.image} alt={`${props.name} profile-pic`} />
          </div>
          <Button
            className={`btn btn-transparent${
              boxShown === "Photo" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Photo{" "}
          </Button>
          <Button
            className={`btn btn-transparent${
              boxShown === "Phone number" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Phone number{" "}
          </Button>
          <Button
            className={`btn btn-transparent${
              boxShown === "Change password" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Change password{" "}
          </Button>
          <Button
            className={`btn btn-transparent${
              boxShown === "Email address" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Email address{" "}
          </Button>
          <Button
            className={`btn btn-transparent${
              boxShown === "Full name" || boxShown === "Pharmacy name"
                ? " active"
                : ""
            }`}
            onClick={toggleBoxShown}
          >
            {props.pharmacy ? "Pharmacy name" : "Full name"}
          </Button>
          <Button
            className={`btn btn-transparent${
              boxShown === "Address" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Address{" "}
          </Button>
          <Button className="btn btn-transparent btn-transparent-warning">
            {" "}
            Delete account{" "}
          </Button>
        </aside>
        <div className="Popup__box__settings">
          {boxShown === "Photo" ? (
            <ChangePhoto image={props.image} />
          ) : boxShown === "Phone number" ? (
            <ChangePhone
              phone={props.phone}
              changePhone={(data) => props.changePhone(data)}
            />
          ) : boxShown === "Change password" ? (
            <ChangePassword
              changePassword={(data) => props.changePassword(data)}
            />
          ) : boxShown === "Email address" ? (
            <ChangeEmail
              email={props.email}
              changeEmail={(data) => props.changeEmail(data)}
            />
          ) : boxShown === "Full name" ? (
            <ChangeFullName
              name={props.name}
              changeName={(data) => props.changeName(data)}
            />
          ) : boxShown === "Pharmacy name" ? (
            <ChangePharmacyName
              name={props.name}
              changeName={(data) => props.changeName(data)}
            />
          ) : (
            <ChangeAddress
              cities={props.cities}
              city_id={props.city_id}
              address={props.address}
              work_address={props.work_address}
              changeAddress={(data) => props.changeAddress(data)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;
