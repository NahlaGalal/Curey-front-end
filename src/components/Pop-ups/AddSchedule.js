import React, { useState } from "react";
import Button from "../Button";
import ManualAddSchedule from "./ManualAddSchedule";
import AutoAddSchedule from "./AutoAddSchedule";

const AddSchedule = props => {
  const [activeToggler, setActiveToggler] = useState(false);

  return (
    <section className="Popup">
      <div className="Popup__box">
        <h2 className="heading-2"> Add schedule </h2>
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
          <AutoAddSchedule  addSchedule={data => props.addSchedule(data)} add={true}/>
        ) : (
          <ManualAddSchedule add={true}/>
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

export default AddSchedule;
