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
        {props.list.map(type => {
          const key = type.split(" ").join("");
          return (
            <div className="option" key={key}>
              <input type="checkbox" id={key} hidden value={type} />
              <label htmlFor={key}>{type}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectBox;
