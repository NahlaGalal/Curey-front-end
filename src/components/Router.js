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
// Containers

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
        </Switch>
    </BrowserRouter>
);

export default Router;
