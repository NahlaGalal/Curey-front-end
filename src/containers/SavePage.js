import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SAGA_GET_FAVOURITES, SAGA_DELETE_FAVOURITE } from "../actions/types";
import MedicineCard from "../components/Doctors and medications/MedicineCard";

export class SavePage extends Component {
  state = { hovered: [], medications: [] };

  componentDidMount() {
    this.props.getFavourites(this.props.api_token);
    this.setState({
      hovered: new Array(this.props.medications.length).fill(false),
      medications: this.props.medications,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.medications) !==
      JSON.stringify(this.props.medications)
    ) {
      this.setState({
        medications: this.props.medications,
        hovered: new Array(this.props.medications.length).fill(false),
      });
    }
  }

  deleteFavouriteMedication = (product_id) => {
    this.props.deleteFavouriteMedication(
      {
        api_token: this.props.api_token,
        product_id,
      },
      "SavePage"
    );
  };

  render() {
    return (
      <Fragment>
        <div className="pageHeader">
          <h2 className="heading-2">My medications</h2>
        </div>
        <section className="topMedications">
          <div className="topMedications__container">
            {this.state.medications.length ? (
              <div className="medicationGrid">
                {this.state.medications.map((medication, i) => (
                  <MedicineCard
                    key={i}
                    id={medication.id}
                    name={medication.name}
                    price={medication.price}
                    image={medication.image}
                    description={medication.description}
                    isFavourite={true}
                    onMouseMove={() =>
                      this.setState({
                        hovered: this.state.hovered.fill(true, i, i + 1),
                      })
                    }
                    onMouseLeave={() =>
                      this.setState({
                        hovered: this.state.hovered.fill(false, i, i + 1),
                      })
                    }
                    hovered={this.state.hovered[i]}
                    link
                    deleteFavouriteMedication={() =>
                      this.deleteFavouriteMedication(medication.id)
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="error"> No saved medications yet </p>
            )}
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  medications: state.medicationsData.medicationsSaved,
  error: state.medicationsData.errors,
});

const mapDispatchToProps = (dispatch) => ({
  getFavourites: (api_token) =>
    dispatch({ type: SAGA_GET_FAVOURITES, api_token }),
  deleteFavouriteMedication: (data, source) =>
    dispatch({ type: SAGA_DELETE_FAVOURITE, data, source }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavePage);
