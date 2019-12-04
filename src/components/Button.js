import React from "react";
import "../sass/components/_buttons.scss";

const Button = props => {
    const { type, onClick, children, className } = props;
    return (
        <div className={"main-button " + (className || "")}>
            <button type={type || "button"} onClick={onClick || (e => null)}>
                {children}
            </button>
        </div>
    );
};

export default Button;
