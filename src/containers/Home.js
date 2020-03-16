import React, { Component } from "react";
import { Link } from "react-router-dom";
import DoctorsGrid from "../components/Doctors and medications/DoctorsGrid";
import MedicineCard from "../components/Doctors and medications/MedicineCard";
import Button from "../components/Button";
import LandingPage from "./Landing-page";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import ReactLoading from "react-loading";

export class Home extends Component {
  state = { hovered: [] };

  componentDidMount() {
    this.props.onRequestData(this.props.api_token);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.topMedications) !==
      JSON.stringify(this.props.topMedications)
    ) {
      this.setState({
        hovered: new Array(this.props.topMedications.length).fill(false)
      });
    }
  }

  deleteFavouriteMedication = product_id => {
    this.props.deleteFavouriteMedication(
      {
        api_token: this.props.api_token,
        product_id
      },
      "Home"
    );
  };

  addFavouriteMedication = product_id => {
    this.props.addFavouriteMedication(
      {
        api_token: this.props.api_token,
        product_id
      },
      "Home"
    );
  };

  render() {
    const isAuthenticated = true;
    return isAuthenticated ? (
      <section className="topDoctors">
        <div className="topDoctors__container">
          <h2 className="heading-2 mb-52">Top doctors</h2>
          {this.props.topDoctors.length ? (
            <DoctorsGrid doctors={this.props.topDoctors} />
          ) : (
            <ReactLoading
              type="spokes"
              color="#0066ff"
              className="loading center mb-40"
            />
          )}

          <Link to="/doctors">
            <Button className="btn btn-lg btn-green center mb-56">
              See more
            </Button>
          </Link>
        </div>
        <div className="topMedications__container">
          <h2 className="heading-2 mb-52">Top medications</h2>
          <div className="medicationGrid mb-40">
            {this.props.topMedications.length ? (
              this.props.topMedications.map((medication, i) => (
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
                  deleteFavouriteMedication={() =>
                    this.deleteFavouriteMedication(medication.id)
                  }
                  addFavouriteMedication={() =>
                    this.addFavouriteMedication(medication.id)
                  }
                />
              ))
            ) : (
              <ReactLoading
                type="spokes"
                color="#0066ff"
                className="loading center mb-40"
              />
            )}
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
    topMedications: state.homeData.top_products,
    api_token: state.user.api_token
  };
};

const mapDispatchToProps = dispatch => ({
  onRequestData: api_token =>
    dispatch({ type: actions.REQUEST_HOME_DATA, api_token }),
  deleteFavouriteMedication: (data, source) =>
    dispatch({ type: actions.SAGA_DELETE_FAVOURITE, data, source }),
  addFavouriteMedication: (data, source) =>
    dispatch({ type: actions.SAGA_ADD_FAVOURITE, data, source })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
