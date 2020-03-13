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
            <div className="option" key={type.id}>
              <input type={`${props.multiple ? "checkbox" : "radio"}`} id={type.id} hidden value={type.name} name="city"/>
              <label htmlFor={type.id}>{type.name}</label>
            </div>
          )
        )}
      </div>
      {props.error && <p className="fieldinput__error">{props.error}</p>}
    </div>
  );
};

export default SelectBox;
