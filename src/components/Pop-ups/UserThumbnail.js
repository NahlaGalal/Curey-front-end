import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

const UserThumbnail = props => {
  return (
    <div className="Thumbnail" onClick={e => e.stopPropagation()}>
      <header>
        <img src={props.userImg} alt={props.userName} />
        <div>
          <p className="user-name">{props.userName}</p>
          <p className="user-email">{props.userEmail}</p>
        </div>
      </header>
      <hr />
      <div className="Thumbnail__settings">
        <h4 className="heading-4">Settings</h4>
        <Link to="/" onClick={props.hideLists}>Account</Link>
        <Link to="/" onClick={props.hideLists}>Personal</Link>
        <Link to="/payment-method" onClick={props.hideLists}>Online payment method</Link>
      </div>
      <hr />
      <footer>
        <Button className="btn"> Logout </Button>
      </footer>
    </div>
  );
};

export default UserThumbnail;
