import React, { Component } from "react";
import MedicationGrid from "../components/MedicationGrid";
import Search from "../components/Search";

const medications = [
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  },
  {
    name: "Antinal",
    price: 12,
    description:
      "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
  }
];

class Medications extends Component {
  render() {
    return (
      <div>
        <Search placeholder="Search Medication, desease...etc" type="medications"/>
        <section className="topDoctors">
          <div className="topDoctors__container">
            <MedicationGrid medications={medications} />
          </div>
        </section>
      </div>
    );
  }
}

export default Medications;
