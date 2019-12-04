// @ts-check
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../sass/components/_login.scss";
import SocialButtons from "./Social-buttons";
import Dividor from "./Dividor";
import FieldInput from "./FieldInput";
import Button from "./Button";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    onChangeHandler = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <section className="login">
                <section className="login__container">
                    <header className="login__container__header">
                        <p>Don't have an account?</p>
                        <Link to="/signup">
                            <button>sign up</button>
                        </Link>
                    </header>
                    <div className="login__container__form">
                        <h1>
                            Hi,
                            <span>Welcome back!</span>
                        </h1>
                        <div className="login__container__form__social">
                            <SocialButtons />
                        </div>
                        <Dividor />
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                console.log(this.state);
                            }}
                        >
                            <FieldInput
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeHandler.bind(this)}
                                placeholder="Email address - Phone number"
                            />
                            <FieldInput
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangeHandler.bind(this)}
                                placeholder="Password"
                            />
                            <div className="forgot-password">
                                <Link to="forgot-password">
                                    <p>Forget your password?</p>
                                </Link>
                            </div>
                            <Button className="form--btn" type="submit">
                                Login
                            </Button>
                        </form>
                    </div>
                    <footer className="login__container__footer">
                        <p>All Rights Reserved © Curey</p>
                    </footer>
                </section>
            </section>
        );
    }
}

export default Login;
