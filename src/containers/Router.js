import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
import Appointments from "./Appointments";
import BookingDoctor from "./BookingDoctor";
import VisitDoctor from "./VisitDoctor";
import Prescription from "./Prescription";
import Orders from "./orders/Orders";
import Payment from "./Payment";
import MedicalWallet from "./MedicalWallet";
import { loadState } from "../configureStore";
import Requests from "./pharmacy/Requests";
import Packing from "./pharmacy/Packing";
import PharmacyStatement from "./pharmacy/Statement";
import MedicationsList from "./pharmacy/MedicationsList";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Switch>
        {!loadState().api_token && (
          <Route exact path="/" component={Landing_page} />
        )}
        {!loadState().api_token && (
          <Route exact path="/login" component={Login} />
        )}
        {!loadState().api_token && (
          <Route
            exact
            path={["/forgot-password", "/verification", "/reset-password"]}
            component={Forgot}
          />
        )}
        {!loadState().api_token && (
          <Route exact path="/signup" component={Signup} />
        )}
        {/* {!loadState().api_token && (
          <Redirect to="/" />
        )} */}
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
            <Route exact path="/appointments" component={Appointments} />
            <Route exact path="/bookingDoctor/:id" component={BookingDoctor} />
            <Route exact path="/homeVisitDoctor/:id" component={VisitDoctor} />
            <Route exact path="/prescriptions" component={Prescription} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/payment-method" component={Payment} />
            <Route exact path="/medicalwallet" component={MedicalWallet} />
            <Route exact path="/pharmacy/Requests" component={Requests} />
            <Route exact path="/pharmacy/Packing-list" component={Packing} />
            <Route
              exact
              path="/pharmacy/statement"
              component={PharmacyStatement}
            />
            <Route exact path="/pharmacy/medications-list" component={MedicationsList} />
            <Redirect exact from="/" to="/home" />
            <Redirect exact from="/pharmacy/" to="/pharmacy/statement" />
          </Switch>
        </Layout>
      </Switch>
    </Switch>
  </BrowserRouter>
);

export default Router;
