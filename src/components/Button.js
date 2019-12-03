import React from "react";

const Button = props => (
  <button
    onClick={props.clicked}
    className={["btn", props.size, props.color].join(" ")}
  >
    {props.children}
  </button>
);

export default Button;
