import React from "react";
import {
    BrowserRouter,
    Route,
    // Redirect,
    Switch
} from "react-router-dom";
// Components
import Home from "./Home";
import Login from "./Login";
import Forgot from "./forgot-comps";
import Signup from "./sign-up";
// Containers

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route
                exact
                path={["/forgot-password", "/verification", "/reset-password"]}
                component={Forgot}
            />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    </BrowserRouter>
);

export default Router;
