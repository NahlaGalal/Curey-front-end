import React from "react";

const SelectBox = props => {
  return (
    <div className="select-component" onClick={props.onClick}>
      <div className={props.className}>
        {props.listChecked.join(", ").slice(0, 50)}
      </div>
      <span
        style={{
          display: props.listChecked.length ? "none" : "block"
        }}
      >
        {props.header}
      </span>
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className={`select--options ${props.boxOpened ? "active" : ""}`}
        ref={props.optionsContainerRef}
      >
        <h3>{props.header}</h3>
        {props.list.map(type => (
          <div key={type.id} className="option">
            <input
              type={`${props.multiple ? "checkbox" : "radio"}`}
              id={`${type.id}_${type.name}`}
              hidden
              value={type.name}
              name={props.header}
            />
            <label htmlFor={`${type.id}_${type.name}`}>{type.name}</label>
          </div>
        ))}
      </div>
      {props.error && <p className="fieldinput__error">{props.error}</p>}
    </div>
  );
};

export default SelectBox;
