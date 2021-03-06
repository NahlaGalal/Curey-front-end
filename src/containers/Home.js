import React, { Component } from "react";
import { Link } from "react-router-dom";
import DoctorsGrid from "../components/Doctors and medications/DoctorsGrid";
import MedicineCard from "../components/Doctors and medications/MedicineCard";
import Button from "../components/Button";
import LandingPage from "./Landing-page";
import { connect } from "react-redux";
import * as actions from "../actions/types";
import ReactLoading from "react-loading";

class Home extends Component {
  state = { hovered: [] };

  componentDidMount() {
    this.props.onRequestData(this.props.api_token, this.props.history);
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
      "Home",
      this.props.history
    );
  };

  addFavouriteMedication = product_id => {
    this.props.addFavouriteMedication(
      {
        api_token: this.props.api_token,
        product_id
      },
      "Home",
      this.props.history
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
          {this.props.topMedications.length ? (
            <div className="medicationGrid mb-40">
              {this.props.topMedications.map((medication, i) => (
                <MedicineCard
                  key={i}
                  id={medication.id}
                  name={medication.name}
                  price={medication.price}
                  image={medication.image}
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
              ))}
            </div>
          ) : (
            <ReactLoading
              type="spokes"
              color="#0066ff"
              className="loading center mb-40"
            />
          )}
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

const mapStateToProps = state => ({
    topDoctors: state.homeData.top_doctors,
    topMedications: state.homeData.top_products,
    api_token: state.user.api_token
});

const mapDispatchToProps = dispatch => ({
  onRequestData: (api_token, history) =>
    dispatch({ type: actions.REQUEST_HOME_DATA, api_token, history }),
  deleteFavouriteMedication: (data, source, history) =>
    dispatch({ type: actions.SAGA_DELETE_FAVOURITE, data, source, history }),
  addFavouriteMedication: (data, source, history) =>
    dispatch({ type: actions.SAGA_ADD_FAVOURITE, data, source, history })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
