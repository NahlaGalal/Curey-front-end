import React, { Fragment } from "react";
import NavigationBar from "./layout/NavigationBar";
import Footer from "./layout/Footer";
import Navbar from "./layout/Nav";

const Layout = props => {
  return (
    <Fragment>
      <NavigationBar />
      <Navbar />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;