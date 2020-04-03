import React from "react";

const TimeInput = props => {
  const controlTime = e => {
    if (
      !e.key.toString().match(/[0-9]/) ||
      e.target.value.toString().length === 5
    )
      e.preventDefault();
    else if (e.target.value.toString().length === 2) e.target.value += ":";
  };

  return (
    <div className="fieldinput">
      <input
        className="fieldinput__input"
        type="text"
        name={`dosing-${props.index}`}
        id={`dosing-${props.index}`}
        ref={props.refe}
        onKeyPress={e => controlTime(e)}
        onChange={e => props.changeDose(e)}
      />
      <label
        className={props.time ? "active" : null}
        htmlFor={`dosing-${props.index}`}
      >
        {props.placeholder}
      </label>
      <span className="fieldinput__hours">{props.hourFormat}</span>
      <button
        className="arrow arrow-up"
        type="button"
        onClick={props.toggleHour}
      ></button>
      <button
        className="arrow arrow-down"
        type="button"
        onClick={props.toggleHour}
      ></button>
      {(props.errors[`dosing-${props.index}`] || props.errors.dosing) && (
        <p className="fieldinput__error">
          {props.errors[`dosing-${props.index}`]
            ? "You must write your dosing times correctly"
            : props.errors.dosing}
        </p>
      )}
    </div>
  );
};

export default TimeInput;
