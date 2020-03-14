import React, { Component } from "react";
import { Link } from "react-router-dom";
import DoctorsGrid from "../components/Doctors and medications/DoctorsGrid";
import MedicineCard from "../components/Doctors and medications/MedicineCard";
import Button from "../components/Button";
import { loadState } from "../configureStore";
import LandingPage from "./Landing-page";
import { connect } from "react-redux";
import * as actions from "../actions/types";

const medications = [
  {
    name: "Antinal",
    price: 12,
    isFavourite: true
  },
  {
    name: "Antinal",
    price: 12
  },
  {
    name: "Antinal",
    price: 12
  },
  {
    name: "Antinal",
    price: 12,
    isFavourite: true
  },
  {
    name: "Antinal",
    price: 12,
    isFavourite: true
  },
  {
    name: "Antinal",
    price: 12
  },
  {
    name: "Antinal",
    price: 12
  },
  {
    name: "Antinal",
    price: 12
  }
];

export class Home extends Component {
  state = { hovered: [] };

  componentDidMount() {
    this.setState({
      hovered: new Array(medications.length).fill(false)
    });
    this.props.onRequestData();
  }

  render() {
    const isAuthenticated = loadState().api_token;
    return isAuthenticated ? (
      <section className="topDoctors">
        <div className="topDoctors__container">
          <h2 className="heading-2 mb-52">Top doctors</h2>
          <DoctorsGrid doctors={this.props.topDoctors} />
          <Link to="/doctors">
            <Button className="btn btn-lg btn-green center mb-56">
              See more
            </Button>
          </Link>
        </div>
        <div className="topMedications__container">
          <h2 className="heading-2 mb-52">Top medications</h2>
          <div className="medicationGrid mb-40">
            {this.props.topMedications.map((medication, i) => (
              <MedicineCard
                key={i}
                name={medication.name}
                price={medication.price}
                description={medication.description}
                isFavourite={medication.is_favourite}
                onMouseMove={() =>
                  this.setState({
                    hovered: this.state.hovered.fill(true, i, i + 1)
                  })
                }
                onMouseLeave={() =>
                  this.setState({
                    hovered: this.state.hovered.fill(false, i, i + 1)
                  })
                }
                hovered={this.state.hovered[i]}
                link
              />
            ))}
          </div>
          <Link to="/medications">
            <Button className="btn btn-lg btn-green center">See more</Button>
          </Link>
        </div>
      </section>
    ) : (
      <LandingPage />
    );
  }
}
const mapStateToProps = state => {
  return {
    topDoctors: state.homeData.top_doctors,
    topMedications: state.homeData.top_products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestData: () => dispatch({ type: actions.REQUEST_HOME_DATA })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
