import React from "react";
import MedicineCard from "./MedicineCard";

const MedicationGrid = props => (
  <div className="medicationGrid">
    {props.medications.map((medication, i) => (
      <MedicineCard
        name={medication.name}
        price={medication.price}
        description={medication.description}
        isFavourite={medication.isFavourite}
        // onMouseMove={() => this.setState({ hovered: true })}
        // onMouseLeave={() => this.setState({ hovered: false })}
        // hovered={this.state.hovered}
      />
    ))}
  </div>
);

export default MedicationGrid;
