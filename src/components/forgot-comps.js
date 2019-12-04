// @ts-check
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "../sass/components/_forgot.scss";
import FieldInput from "./FieldInput";
import Button from "./Button";
import EgyptFlag from "../assets/egypt.svg";

class ForgotPassword extends Component {
    state = {
        email: ""
    };

    onChangeHandler = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="forgot__container__password">
                <h1>Forget Password!</h1>
                <p className="forgot__container__password__para">
                    Please, enter your email address or your phone number, You
                    will recieve code to reset your password
                </p>
                <form>
                    <FieldInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Email address - Phone nember"
                        onChange={this.onChangeHandler.bind(this)}
                    />
                    <Button type="submit">Send</Button>
                </form>
            </div>
        );
    }
}

class CodeVerification extends Component {
    state = {
        testCode: ""
    };

    onChangeHandler = ({ target: { name, value } }) => {
        if (!value || /^(\d{1}|\d{2}|\d{3}|\d{4})$/.test(value)) {
            this.setState({
                [name]: value
            });
        }
    };

    render() {
        return (
            <div className="forgot__container__verification">
                <h1>Code verification</h1>
                <div className="forgot__container__verification__number">
                    <p>Your phone number is</p>
                    <div>
                        <img src={EgyptFlag} alt="contury-flag" />
                        <span>
                            {/* should be given through router */}
                            +201273985008
                        </span>
                    </div>
                </div>
                <p className="forgot__container__verification__para">
                    Please, enter the 4 digits sent to your phone
                </p>
                <form>
                    <FieldInput
                        type="text"
                        name="testCode"
                        value={this.state.testCode}
                        placeholder="Type the code"
                        onChange={this.onChangeHandler.bind(this)}
                    />
                    <Button type="submit">Reset Password</Button>
                </form>
            </div>
        );
    }
}

class ResetPassword extends Component {
    state = {
        newPassword: "",
        repeatNewPassword: ""
    };

    onChangeHandler = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="forgot__container__reset">
                <h1>Reset your password</h1>
                <form>
                    <FieldInput
                        type="password"
                        name="newPassword"
                        value={this.state.newPassword}
                        placeholder="New password"
                        onChange={this.onChangeHandler.bind(this)}
                    />
                    <FieldInput
                        type="password"
                        name="repeatNewPassword"
                        value={this.state.repeatNewPassword}
                        placeholder="Repeat new password"
                        onChange={this.onChangeHandler.bind(this)}
                    />
                    <Button type="submit">Reset Password</Button>
                </form>
            </div>
        );
    }
}

const Forgot = () => {
    return (
        <section className="forgot">
            <div className="forgot__container">
                <Switch>
                    <Route
                        exact
                        path="/forgot-password"
                        component={ForgotPassword}
                    />
                    <Route
                        exact
                        path="/verification"
                        component={CodeVerification}
                    />
                    <Route
                        exact
                        path="/reset-password"
                        component={ResetPassword}
                    />
                </Switch>
                <footer className="forgot__container__footer">
                    <p>All Rights Reserved © Curey</p>
                </footer>
            </div>
        </section>
    );
};

export default Forgot;
