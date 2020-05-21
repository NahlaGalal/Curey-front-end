import React from "react";
import ReactLoading from "react-loading";

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
        {props.list.length ? (
          props.list.map(type => (
            <div key={type.id} className="option">
              <input
                ref={props.refe}
                type={`${props.multiple ? "checkbox" : "radio"}`}
                id={`${type.id}_${type.name}`}
                hidden
                value={type.name}
                name={props.header}
              />
              <label htmlFor={`${type.id}_${type.name}`}>{type.name}</label>
            </div>
          ))
        ) : (
          <ReactLoading
            type="spokes"
            color="#0066ff"
            className="loading center mb-40"
          />
        )}
      </div>
      {props.isError && <p className="fieldinput__error">{props.error}</p>}
    </div>
  );
};

export default SelectBox;
