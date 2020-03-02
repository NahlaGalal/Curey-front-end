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
      />
    ))}
  </div>
);

export default MedicationGrid;
