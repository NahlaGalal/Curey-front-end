//@ts-check
import React, { Component } from "react";
import "../sass/components/_fieldinput.scss";

class FieldInput extends Component {
    render() {
        const { type, name, value, onChange, placeholder } = this.props;
        return (
            <div className="fieldinput">
                <input
                    placeholder={placeholder}
                    className="fieldinput__input"
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default FieldInput;
