import React, { useState } from "react";
import Button from "../Button";
import ManualAddSchedule from "./ManualAddSchedule";
import AutoAddSchedule from "./AutoAddSchedule";

const EditSchedule = (props) => {
  const [activeToggler, setActiveToggler] = useState(false);

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
            addSchedule={(data) => props.updateDay(data)}
            add={false}
          />
        ) : (
          <ManualAddSchedule add={false} day={props.day.name} />
        )}
        <div className="Popup__box__footer buttons">
          <button
            className="btn btn-xxs btn-green-dark btn-apply"
            form="submit-form"
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
