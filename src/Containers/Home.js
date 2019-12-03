import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
import Button from "../components/Button";

export class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="hb">
          <Button size="btn-lg" color="btn-green">
            click me
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
