import React from "react";
import {
    BrowserRouter,
    Route,
    // Redirect,
    Switch
} from "react-router-dom";
// Containers
import Home from "./Home";
import Login from "./Login";
import Forgot from "./forgot-comps";
import Signup from "./sign-up";
import Doctors from "./Doctors";
import Medications from "./Medications";
import Layout from "../components/Layout";
import DoctorProfile from "./doctor-profile";
import Landing_page from "./Landing-page";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route
                exact
                path={["/forgot-password", "/verification", "/reset-password"]}
                component={Forgot}
            />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Landing_page} />
            <Layout>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/doctors" component={Doctors} />
                    <Route exact path="/medications" component={Medications} />
                    <Route
                        exact
                        path="/doctor-profile/:id"
                        component={DoctorProfile}
                    />
                </Switch>
            </Layout>
        </Switch>
    </BrowserRouter>
);

export default Router;
