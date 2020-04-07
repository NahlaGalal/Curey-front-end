import React, { useState } from "react";
import Button from "../Button";
import ManualAddSchedule from "./ManualAddSchedule";
import AutoAddSchedule from "./AutoAddSchedule";

const EditSchedule = (props) => {
  const [activeToggler, setActiveToggler] = useState(false);
  const [formSubmit, setFormSubmit] = useState(1);

  return (
    <section className="Popup">
      <div className="Popup__box">
        <h2 className="heading-2"> Edit schedule for {props.day.name} </h2>
        <div className="Popup__box__toggler toggler address-toggler">
          <Button
            className={activeToggler ? "btn" : "btn active"}
            onClick={() => setActiveToggler(false)}
          >
            Manual
          </Button>
          <Button
            className={activeToggler ? "btn active" : "btn"}
            onClick={() => setActiveToggler(true)}
          >
            Automatic
          </Button>
        </div>
        {activeToggler ? (
          <AutoAddSchedule
            formSubmit={formSubmit}
            addSchedule={(data) => props.updateDay(data)}
            add={false}
          />
        ) : (
          <ManualAddSchedule formSubmit={formSubmit} add={false} day={props.day.name} />
        )}
        <div className="Popup__box__footer buttons">
          <button
            className="btn btn-xxs btn-green-dark btn-apply"
            onClick={() => setFormSubmit(formSubmit + 1)}
          >
            Confirm
          </button>
          <Button
            className="btn btn-xxs btn-cancel btn-transparent"
            onClick={props.closePopup}
          >
            Cancel
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EditSchedule;
