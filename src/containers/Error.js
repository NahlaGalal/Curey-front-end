import React from 'react'
import Button from '../components/Button'
import beat from "../assets/svg/circlebeat.svg";
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="Error">
      <h2 className="heading-2"> OOPS ERROR!!! </h2>
      <p className="Error__404">
        4
        <img src={beat} alt="Heart beat illustrates 0 of 404" />
        4
      </p>
      <p className="Error__not-found">PAGE NOT FOUND</p>
      <Link to="/">
        <Button className="btn btn-lg btn-green">Back to main page</Button>
      </Link>
    </div>
  )
}

export default Error
