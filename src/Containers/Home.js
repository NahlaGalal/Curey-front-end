import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";

export class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar />

        <Navbar />
        <button className="btn btn-green btn-lg">bla bla</button>
        <Footer />
      </div>
    );
  }
}

export default Home;
