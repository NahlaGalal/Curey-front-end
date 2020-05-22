import React, { Component } from "react";
import NavigationBar from "./layout/NavigationBar";
import Footer from "./layout/Footer";
import Navbar from "./layout/Nav";
import { loadState } from "../configureStore";
import PharmacyNavbar from "./layout/pharmacyNavbar";
import DoctorNavbar from "./layout/doctorNavbar";
import { Route, Switch } from "react-router-dom";
import Error from "../components/Error";
import Landing_page from "../containers/Landing-page";
import Login from "../containers/Login";
import Forgot from "../containers/forgot-comps";
import SignUp from "../containers/sign-up";
import DoctorCompSignup from "../containers/DoctorCompSignup";
import PharmacyCompSignup from "../containers/PharmCompSignup";
import Home from "../containers/Home";
import Error500 from "./Error-500";

class Layout extends Component {
  state = {
    notificationList: false,
    userThumbnailList: false,
    pharmacyThumbnailList: false,
    doctorThumbnailList: false,
  };

  hideLists = () =>
    this.setState({
      userThumbnailList: false,
      notificationList: false,
      pharmacyThumbnailList: false,
      doctorThumbnailList: false,
    });

  generateCompleteSignupForm = (role) => {
    if (role === 2) {
      return (
        <Switch>
          <Route
            exact
            path="/pharmacy/complete-signup"
            component={PharmacyCompSignup}
          />
          <Route exact path="/error500" component={Error500} />
          <Route exact component={PharmacyCompSignup} />
        </Switch>
      );
    } else if (role === 3) {
      return (
        <Switch>
          <Route
            exact
            path="/doctor/complete-signup"
            component={DoctorCompSignup}
          />
          <Route exact path="/error500" component={Error500} />
          <Route exact component={DoctorCompSignup} />
        </Switch>
      );
    } else {
      return <Route exact component={Home} />;
    }
  };

  render() {
    const state = loadState();

    return (
      <div onClick={this.hideLists}>
        {state.api_token ? (
          state.is_complete ? (
            <React.Fragment>
              {this.props.location.pathname.startsWith("/pharmacy") ? (
                <PharmacyNavbar
                  hideLists={this.hideLists}
                  pharmacyThumbnailList={this.state.pharmacyThumbnailList}
                  togglePharmacyThumbnailList={(e) => {
                    if (e) e.stopPropagation();
                    this.setState({
                      pharmacyThumbnailList: !this.state.pharmacyThumbnailList,
                    });
                  }}
                />
              ) : this.props.location.pathname.startsWith("/doctor/") ? (
                <DoctorNavbar
                  hideLists={this.hideLists}
                  doctorThumbnailList={this.state.doctorThumbnailList}
                  toggleDoctorThumbnailList={(e) => {
                    if (e) e.stopPropagation();
                    this.setState({
                      doctorThumbnailList: !this.state.doctorThumbnailList,
                    });
                  }}
                />
              ) : (
                <React.Fragment>
                  <NavigationBar
                    notificationList={this.state.notificationList}
                    userThumbnailList={this.state.userThumbnailList}
                    toggleNotifocationsList={(e) => {
                      if (e) e.stopPropagation();
                      this.setState({
                        notificationList: !this.state.notificationList,
                        userThumbnailList: false,
                      });
                    }}
                    toggleUserThumbnailList={(e) => {
                      e.stopPropagation();
                      this.setState({
                        userThumbnailList: !this.state.userThumbnailList,
                        notificationList: false,
                      });
                    }}
                    hideLists={this.hideLists}
                  />
                  <Navbar />
                </React.Fragment>
              )}
              {this.props.children}
              <Footer />
            </React.Fragment>
          ) : (
            this.generateCompleteSignupForm(state.role)
          )
        ) : (
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Landing_page} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path={["/forgot-password", "/verification", "/reset-password"]}
                component={Forgot}
              />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/error500" component={Error500} />
              <Route exact component={Error} />
            </Switch>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Layout;
