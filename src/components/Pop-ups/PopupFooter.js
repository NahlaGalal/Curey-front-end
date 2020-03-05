import React from "react";
import { Link } from "react-router-dom";
import editIcon from "../../assets/svg/edit-green.svg";
import Button from "../Button";

const PopupFooter = props => {
  return (
    <div className="Popup__box__footer">
      <p>
        <Link to="/payment-method">
          <img src={editIcon} alt="edit icon" /> Edit payment method
        </Link>
      </p>
      <div>
        {props.applyAction ? (
          <Link to={props.applyAction}>
            <Button
              className="btn btn-xxs btn-green-dark btn-apply"
              onClick={props.closePopup}
            >
              {props.applyText}
            </Button>
          </Link>
        ) : (
          <Button
            className="btn btn-xxs btn-green-dark btn-apply"
            onClick={props.closePopup}
          >
            {props.applyText}
          </Button>
        )}
        <Button
          className="btn btn-xxs btn-cancel btn-transparent"
          onClick={props.closePopup}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PopupFooter;
