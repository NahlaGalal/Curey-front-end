import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// Containers
import Home from "./Home";
import Doctors from "./Doctors";
import Medications from "./Medications";
import Layout from "../components/Layout";
import DoctorProfile from "./doctor-profile";
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
import ReExamination from "../containers/doctorDashboard/reexamination";
import WorkingSchedule from "../containers/doctorDashboard/workingSchedule";
import DoctorRequests from "./doctorDashboard/DoctorRequests";
import PrescriptionList from "../containers/doctorDashboard/PrescriptionList";
import DoctorStatement from "../containers/doctorDashboard/Statement";
import Error from "./Error";
import PharmCompSignup from "./PharmCompSignup";

const state = loadState();

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Switch>
          <Layout>
            <Switch>
              <Route
                exact
                path="/pharmacy-complete-signup"
                component={PharmCompSignup}
              />
              <Route exact path="/home" component={Home} />
              <Route exact path="/doctors" component={Doctors} />
              <Route exact path="/medications" component={Medications} />
              <Route
                exact
                path="/doctor-profile/:id"
                component={DoctorProfile}
              />
              <Route exact path="/medicine/:id" component={MedicinePage} />
              <Route exact path="/shoppingcart" component={ShoppingCart} />
              <Route
                exact
                path="/OrderPrescription"
                component={OrderPrescription}
              />
              <Route exact path="/savepage" component={SavePage} />
              <Route exact path="/appointments" component={Appointments} />
              <Route
                exact
                path="/bookingDoctor/:id"
                component={BookingDoctor}
              />
              <Route
                exact
                path="/homeVisitDoctor/:id"
                component={VisitDoctor}
              />
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
              <Route
                exact
                path="/pharmacy/medications-list"
                component={MedicationsList}
              />
              <Route
                exact
                path="/doctor/Statement"
                component={DoctorStatement}
              />
              <Route
                exact
                path="/doctor/re-examination"
                component={ReExamination}
              />

              <Route
                exact
                path="/doctor/schedule"
                component={WorkingSchedule}
              />
              <Route exact path="/doctor/requests" component={DoctorRequests} />
              <Route
                exact
                path="/doctor/prescriptions"
                component={PrescriptionList}
              />
              {state.role === 1 && <Redirect exact from="/" to="/home" />}
              {state.role === 2 && (
                <Redirect exact from="/" to="/pharmacy/statement" />
              )}
              {state.role === 3 && (
                <Redirect exact from="/" to="/doctor/statement" />
              )}
              <Redirect exact from="/pharmacy/" to="/pharmacy/statement" />
              <Redirect exact from="/doctor/" to="/doctor/statement" />
              <Route exact component={Error} />
            </Switch>
          </Layout>
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
