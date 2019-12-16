import React from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../components/Button";
// images
import Logo from "../assets/svg/Logo-SVG.svg";
import Heart_background from "../assets/images/heart-background.png";
import Heart_beat from "../assets/svg/heart-icon.svg";
import Bill from "../assets/svg/Union.svg";
import Social_background from "../assets/images/social-background.png";
import Facebook from "../assets/svg/facebook-logo.svg";
import Twitter from "../assets/svg/twitter.svg";
import Instagram from "../assets/svg/instagram.svg";


const Landing_page = () => {
  return (
    <div className="Landing">
      <header className="Header">
        <nav className="container Header__navbar">
          <NavLink to="/">
            <img src={Logo} alt="logo" />
          </NavLink>
          <div className="Header__navbar__links">
            <Link to="/login">
              <Button className="btn btn-sm btn-transparent">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="btn btn-sm btn-green">Signup</Button>
            </Link>
          </div>
        </nav>

        <div className="Header__intro container">
          <h1>Curey</h1>
          <h3>Health care app</h3>
          <p>
            The world of doctors and medications <br /> in a single platform
          </p>
          <Link to="/signup" className="get_started">
            <Button className="btn btn-md btn-green">Get started</Button>
          </Link>
        </div>
      </header>

      <section className="About">
        <div className="container About__grid">
          <img src={Heart_background} alt="Background" />
          <div className="About__grid__content">
            <h4>Curey is your gate for almost all medical solutions</h4>
            <p>
              Curey is available online. Using Curey, you can instantly request
              a doctor to your home or reserve your turn at a clinic without
              leaving your doorsteps, forget about the long drive to the clinic,
              and the precious hours you spend waiting there.
            </p>
            <p>
              Curey also provides access to hundreds of pharmacies, where you
              can order almost any drug, you don’t have to go to your nearest
              pharmacy, or even search for a missing drug everywhere, we’ve
              covered most of the pharmacies and will tell you exactly where to
              find your drugs, profit!
            </p>
            <p>
              Curey also provides access to hundreds of pharmacies, where you
              can order almost any drug, you don’t have to go to your nearest
              pharmacy, or even search for a missing drug everywhere, we’ve
              covered most of the pharmacies and will tell you exactly where to
              find your drugs, profit!
            </p>
          </div>
        </div>
      </section>

      <section className="Services">
        <div className="container Services__grid">
          <div className="Services__grid__aside">
            <div className="Services__grid__aside__content container">
              <p className="now">Now, IT's the time for you to know</p>
              <h4>What we do</h4>
              <p>
                Our mission is to give you a high- <br /> quality medical &
                pharmaceutical <br />
                services
              </p>
            </div>
          </div>
          <div className="Services__grid__medical">
            <h5>
              <span>
                <img src={Heart_beat} alt="heart beat icon" />
              </span>
              Medical services
            </h5>
            <div className="line">
              <ul>
                <li>
                  <h6> Filtering the doctors</h6>
                  <p>
                    We make a nice filter for you, use it so you can select any
                    doctor from anywhere and any specially
                  </p>
                </li>
                <li>
                  <h6>Booking a doctor</h6>
                  <p>
                    book an appointment with the doctor through the application
                    and then you can go on the appointment directly
                  </p>
                </li>
                <li>
                  <h6>Call up a doctor</h6>
                  <p>
                    You can call your doctor to your home. Choose the doctors
                    who can provide the service and book the appointment
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="Services__grid__medications">
            <h5>
              <span>
                <img src={Bill} alt="bill icon" />
              </span>
              Medications services
            </h5>
            <div className="line">
              <ul>
                <li>
                  <h6> Filtering medications</h6>
                  <p>
                    You can filter the list of medications by Category & type of
                    and then get to the medication you want
                  </p>
                </li>
                <li>
                  <h6>Pharmacies list</h6>
                  <p>
                    Choose the pharmacy you want and then you can book the
                    medicine or order delivery to your home
                  </p>
                </li>
                <li>
                  <h6>Prescription reminder</h6>
                  <p>
                    We will always remind you of the dosage dates so be assured
                    with us, don't worry about forgetting doses
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="Social-media">
        <div className="Social-media__market">
          <p className="Social-media__market__heading">
            Curey is available as both web and mobile applications.
          </p>
          <p className="Social-media__market__heading2">Download curey for</p>
          <div className="Social-media__market__links">
            <Link to="/">
              <Button className="btn btn-green btn-md">Android</Button>
            </Link>
            <Link to="/">
              <Button className="btn btn-green btn-md">IOS</Button>
            </Link>
          </div>
        </div>
        <img src={Social_background} alt="social background" />
      </section>

      <footer className="Landing__footer">
        <div className="container Landing__footer__content">
          <div className="Landing__footer__content__logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
            <p>All rights reserved &copy; Curey</p>
          </div>

          <div className="Landing__footer__content__icons">
            <Link to="/">
              <img src={Facebook} alt="facebook link for Curey" />
            </Link>
            <Link to="/">
              <img src={Twitter} alt="twitter link for Curey" />
            </Link>
            <Link to="/">
              <img src={Instagram} alt="instagram link for Curey" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing_page;
