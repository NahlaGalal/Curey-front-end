//@ts-check
import React, { Component } from "react";

class FieldInput extends Component {
    render() {
        const { type, name, value, onChange, placeholder } = this.props;
        return (
            <div className="fieldinput">
                <input
                    className="fieldinput__input"
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <label className={value && value.length ? "active" : null}>
                    {placeholder}
                </label>
            </div>
        );
    }
}

export default FieldInput;
