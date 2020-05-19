import React, { useState } from "react";
import Button from "../Button";
import ChangeFullName from "../Settings/ChangeFullName";
import ChangeAddress from "../Settings/ChangeAddress";
import {
  ChangeDuartion,
  ChangeFees,
  ChangeHomeVisit,
  ChangeSpeciality,
} from "../Settings/DoctorSettings";

const DoctorPersonalSettings = (props) => {
  const [boxShown, setBoxShown] = useState("Full name");

  const toggleBoxShown = (e) => setBoxShown(e.target.textContent.trim());

  return (
    <section className="Popup">
      <div
        className="Popup__box-grid Popup__box"
        onClick={(e) => e.stopPropagation()}
      >
        <aside className="Popup__box__aside">
          <Button
            className={`btn btn-transparent${
              boxShown === "Full name" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Full name{" "}
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
          <Button
            className={`btn btn-transparent${
              boxShown === "Speciality" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Speciality{" "}
          </Button>
          <Button
            className={`btn btn-transparent${
              boxShown === "Fees" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Fees{" "}
          </Button>
          <Button
            className={`btn btn-transparent${
              boxShown === "Duration" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Duration{" "}
          </Button>
          <Button
            className={`btn btn-transparent${
              boxShown === "Home visits" ? " active" : ""
            }`}
            onClick={toggleBoxShown}
          >
            {" "}
            Home visits{" "}
          </Button>
        </aside>
        <div className="Popup__box__settings">
          {boxShown === "Full name" ? (
          <ChangeFullName
            name={props.name}
            changeName={(data) => props.changeName(data)}
          />
          ) : boxShown === "Address" ? (
          <ChangeAddress
            cities={props.cities}
            city_id={props.city_id}
            address={props.address}
            work_address={props.work_address}
            changeAddress={(data) => props.changeAddress(data)}
          />
          ) : boxShown === "Speciality" ? (
          <ChangeSpeciality
            specialities={props.specialities}
            speciality={props.speciality}
            changeSpeciality={(data) => props.changeSpeciality(data)}
          />
          ) : boxShown === "Fees" ? (
          <ChangeFees
            fees={props.fees}
            changeFees={(data) => props.changeFees(data)}
          />
          ) : boxShown === "Duration" ? (
          <ChangeDuartion
            duration={props.duration}
            changeDuration={(data) => props.changeDuration(data)}
          />
          ) : (
          <ChangeHomeVisit
            callup={props.callup}
            callup_fees={props.callup_fees}
            changeHomeVisit={(data) => props.changeHomeVisit(data)}
          />
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorPersonalSettings;
