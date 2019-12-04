//@ts-check
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../sass/components/_signup.scss";

class SignUp extends Component {
    render() {
        return (
            <section className="signup">
                <section className="signup__container">
                    <header className="signup__container__header">
                        <p>Don't have an account?</p>
                        <Link to="/login">
                            <button>login</button>
                        </Link>
                    </header>

                    <footer className="signup__container__footer">
                        <p>All Rights Reserved © Curey</p>
                    </footer>
                </section>
            </section>
        );
    }
}

export default SignUp;
