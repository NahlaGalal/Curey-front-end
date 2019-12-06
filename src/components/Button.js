import React from "react";

const Button = props => {
    const { type, onClick, children } = props;
    return (
        <button
            type={type || "button"}
            onClick={onClick || (e => null)}
            className="btn btn-lg btn-green center mb-56"
        >
            {children}
        </button>
    );
};

export default Button;
