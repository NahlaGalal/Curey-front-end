//@ts-check
import React, { Component } from "react";

class FieldInput extends Component {
  render() {
    const { type, name, value, onChange, placeholder, error, onBlur } = this.props;
    return (
      <div className="fieldinput">
        <input
          className="fieldinput__input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label className={value && value.length ? "active" : null}>
          {placeholder}
        </label>
        {error && <p className="fieldinput__error">{error}</p>}
      </div>
    );
  }
}

export default FieldInput;
