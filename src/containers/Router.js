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
import MedicinePage from "./MedicinePage";
import ShoppingCart from "./orders/shoppingCart";
import OrderPrescription from "./orders/OrderPrescription";
import SavePage from "./SavePage";
import BookingDoctor from "../components/Doctors and medications/BookingDoctor";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route exact path="/" component={Landing_page} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path={["/forgot-password", "/verification", "/reset-password"]}
          component={Forgot}
        />
        <Route exact path="/signup" component={Signup} />
        <Layout>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/doctors" component={Doctors} />
            <Route exact path="/medications" component={Medications} />
            <Route exact path="/doctor-profile/:id" component={DoctorProfile} />
            <Route exact path="/medicine/:id" component={MedicinePage} />
            <Route exact path="/shoppingcart" component={ShoppingCart} />
            <Route
              exact
              path="/OrderPrescription"
              component={OrderPrescription}
            />
            <Route exact path="/savepage" component={SavePage} />
            <Route exact path="/bookingDoctor" component={BookingDoctor} />
          </Switch>
        </Layout>
      </Switch>
    </Switch>
  </BrowserRouter>
);

export default Router;
