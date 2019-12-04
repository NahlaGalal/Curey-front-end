//@ts-check
import React from "react";
import "../sass/components/_social-buttons.scss";
import FacebookLogo from "../assets/facebook.svg";
import GoogleLogo from "../assets/google.svg";

const SocialButtons = props => {
    return (
        <section className="social">
            <div className="social__facebook">
                <button>
                    <img src={FacebookLogo} alt="facebook-logo" />
                    <span>Connect with Facebook</span>
                </button>
            </div>
            <div className="social__google">
                <button>
                    <img src={GoogleLogo} alt="google-logo" />
                    <span>Connect with Google</span>
                </button>
            </div>
        </section>
    );
};

export default SocialButtons;
