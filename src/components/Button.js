import React from "react";

const Button = props => {
    const { type, onClick, className, children } = props;
    const clickButton = e => {
        if(onClick) onClick(e);
        // e.persist();
        // e.target.disabled = true;
        // setTimeout(() => {
        //     e.target.disabled = false;
        // }, 1000);
    }

    return (
        <button
            type={type || "button"}
            onClick={clickButton}
            className={className}
        >
            {children}
        </button>
    );
};

export default Button;
