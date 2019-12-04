//@ts-check
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SocialButtons from "../components/Social-buttons";
import Dividor from "../components/Dividor";
import FieldInput from "../components/FieldInput";
import Button from "../components/Button";

class SignupUser extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: ""
    };

    onChangeHandler = ({ target: { value, name } }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <section className="signup__container__forms__user">
                <form>
                    <div className="multi-inputs">
                        <FieldInput
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChangeHandler}
                            placeholder="First name"
                        />
                        <FieldInput
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onChangeHandler}
                            placeholder="Last name"
                        />
                    </div>
                    <FieldInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        placeholder="Email address"
                    />

                    <FieldInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        placeholder="Password"
                    />
                    <FieldInput
                        type="password"
                        name="repeatPassword"
                        value={this.state.repeatPassword}
                        onChange={this.onChangeHandler}
                        placeholder="Repeat password"
                    />
                    <Button>Signup</Button>
                </form>
            </section>
        );
    }
}

class SignupDoctor extends Component {
    state = {
        specialtyOpened: false,
        form: {
            firstName: "",
            lastName: "",
            email: "",
            specialty: [],
            password: "",
            repeatPassword: ""
        }
    };

    optionsContainerRef = React.createRef();

    onChangeHandler = ({ target: { value, name } }) => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        });
    };

    toggleSpec = () => {
        const prev = this.state.specialtyOpened;
        let specialty = [];
        if (prev) {
            specialty = Array.from(
                this.optionsContainerRef.current.querySelectorAll(
                    "input[type=checkbox]"
                )
            )
                .filter(input => input.checked)
                .map(el => el.value);
        }
        this.setState({
            specialtyOpened: !prev,
            form: {
                ...this.state.form,
                specialty
            }
        });
    };

    render() {
        const surgeryList = [
            "Spinal Surgery",
            "Plastic Surgery",
            "Pediatric Surgery",
            "Thoracic Surgery",
            "Neurological Surgery"
        ];

        return (
            <section className="signup__container__forms__doctor">
                <form>
                    <div className="multi-inputs">
                        <FieldInput
                            type="text"
                            name="firstName"
                            value={this.state.form.firstName}
                            onChange={this.onChangeHandler}
                            placeholder="First name"
                        />
                        <FieldInput
                            type="text"
                            name="lastName"
                            value={this.state.form.lastName}
                            onChange={this.onChangeHandler}
                            placeholder="Last name"
                        />
                    </div>
                    <FieldInput
                        type="email"
                        name="email"
                        value={this.state.form.email}
                        onChange={this.onChangeHandler}
                        placeholder="Email address"
                    />
                    <div
                        className="signup__container__forms__doctor__select"
                        onClick={this.toggleSpec}
                    >
                        <div
                            className={
                                this.state.form.specialty.length
                                    ? "hasValue"
                                    : null
                            }
                        >
                            {this.state.form.specialty.join(", ").slice(0, 50)}
                        </div>
                        <span
                            style={{
                                display: this.state.form.specialty.length
                                    ? "none"
                                    : "block"
                            }}
                        >
                            Specialty
                        </span>
                        <div
                            onClick={e => {
                                e.stopPropagation();
                            }}
                            className={`signup__container__forms__doctor__select__options select--options ${
                                this.state.specialtyOpened ? "active" : ""
                            }`}
                            ref={this.optionsContainerRef}
                        >
                            <h3>Surgery</h3>
                            {surgeryList.map(type => {
                                const key = type.split(" ").join("");
                                return (
                                    <div className="option" key={key}>
                                        <input
                                            type="checkbox"
                                            id={key}
                                            hidden
                                            value={type}
                                        />
                                        <label htmlFor={key}>{type}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <FieldInput
                        type="password"
                        name="password"
                        value={this.state.form.password}
                        onChange={this.onChangeHandler}
                        placeholder="Password"
                    />
                    <FieldInput
                        type="password"
                        name="repeatPassword"
                        value={this.state.form.repeatPassword}
                        onChange={this.onChangeHandler}
                        placeholder="Repeat password"
                    />
                    <Button>Signup</Button>
                </form>
            </section>
        );
    }
}

class SignupPharmacy extends Component {
    state = {
        pharmacyName: "",
        pharmacyAddress: "",
        email: "",
        password: "",
        repeatPassword: ""
    };

    onChangeHandler = ({ target: { value, name } }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <section className="signup__container__forms__pharmacy">
                <form>
                    <FieldInput
                        type="text"
                        name="pharmacyName"
                        value={this.state.pharmacyName}
                        onChange={this.onChangeHandler}
                        placeholder="Pharmacy name"
                    />
                    <FieldInput
                        type="text"
                        name="pharmacyAddress"
                        value={this.state.pharmacyAddress}
                        onChange={this.onChangeHandler}
                        placeholder="Pharmacy address"
                    />
                    <FieldInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        placeholder="Email address"
                    />
                    <FieldInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        placeholder="Password"
                    />
                    <FieldInput
                        type="password"
                        name="repeatPassword"
                        value={this.state.repeatPassword}
                        onChange={this.onChangeHandler}
                        placeholder="Repeat password"
                    />
                    <Button>Signup</Button>
                </form>
            </section>
        );
    }
}

class Signup extends Component {
    state = {
        formNo: 1
    };

    toggleUserForm = formNo => {
        if (this.state.formNo !== formNo) {
            this.setState({
                formNo
            });
        }
    };

    render() {
        const user_types = ["I'm a user", "I'm a doctor", "I'm a Pharmacy"];

        return (
            <section className="signup">
                <section className="signup__container">
                    <header className="signup__container__header">
                        <p>Don't have an account?</p>
                        <Link to="/login">
                            <button>login</button>
                        </Link>
                    </header>
                    <section className="signup__container__forms">
                        <h1>
                            Hi,
                            <span>Join our community</span>
                        </h1>
                        <div
                            className={
                                "signup__container__forms__toggler active-" +
                                this.state.formNo
                            }
                        >
                            {user_types.map((type, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                        this.toggleUserForm(i + 1);
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                            <span className="signup__container__forms__toggler__pointer"></span>
                        </div>
                        <SocialButtons />
                        <Dividor />
                        <div
                            className={
                                "signup__container__forms__slider active-" +
                                this.state.formNo
                            }
                        >
                            <SignupUser />
                            <SignupDoctor />
                            <SignupPharmacy />
                        </div>
                    </section>
                    <footer className="signup__container__footer">
                        <p>All Rights Reserved © Curey</p>
                    </footer>
                </section>
            </section>
        );
    }
}

export default Signup;
