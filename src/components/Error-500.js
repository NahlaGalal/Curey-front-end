import React from "react";
import Button from "./Button";
import beat from "../assets/svg/circlebeat.svg";
import { Link } from "react-router-dom";

const Error500 = () => {
  return (
    <div className="Error">
      <h2 className="heading-2"> OOPS ERROR!!! </h2>
      <p className="Error__404">
        5
        <img src={beat} alt="Heart beat illustrates 0 of 505" />5
      </p>
      <p className="Error__not-found">UNEXPECTED ERROR</p>
      <Link to="/">
        <Button className="btn btn-lg btn-green">Back to main page</Button>
      </Link>
    </div>
  );
};

export default Error500;
