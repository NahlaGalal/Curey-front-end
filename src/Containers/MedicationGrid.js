import React from "react";
import MedicationCard from "../components/MedicationCard";

const MedicationGrid = () => (
  <div className="medicationGrid mb-40">
    <MedicationCard name="Antinal" price={12 + " L.E"} />
    <MedicationCard name="Antinal" price={12 + " L.E"} />
    <MedicationCard name="Antinal" price={12 + " L.E"} />
    <MedicationCard name="Antinal" price={12 + " L.E"} />
    <MedicationCard name="Antinal" price={12 + " L.E"} />
    <MedicationCard name="Antinal" price={12 + " L.E"} />
    <MedicationCard name="Antinal" price={12 + " L.E"} />
    <MedicationCard name="Antinal" price={12 + " L.E"} />
  </div>
);

export default MedicationGrid;
