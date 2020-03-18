//@ts-check
import React from "react";

const Input = props => {
  const { type, name, placeholder, error, refe, isError, id, value } = props;

  return (
    <div className="fieldinput">
      <input
        className="fieldinput__input"
        type={type}
        name={name}
        ref={refe}
        id={id}
      />
      <label htmlFor={id} className={value ? "active" : null}>
        {placeholder}
      </label>
      {isError && <p className="fieldinput__error">{error}</p>}
    </div>
  );
};

export default Input;
