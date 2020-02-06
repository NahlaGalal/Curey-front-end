import React, { Component, Fragment } from "react";
import MedicationGrid from "../components/Doctors and medications/MedicationGrid";

const medications = [
  {
    name: "Antinal",
    price: 12,
    isFavourite: true,
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
    isFavourite: true,
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

export class SavePage extends Component {
  render() {
    return (
      <Fragment>
        <div className="pageHeader">
          <h2 className="heading-2">My medications</h2>
        </div>
        <section className="topMedications">
          <div className="topMedications__container">
            <MedicationGrid medications={medications} />
          </div>
        </section>
      </Fragment>
    );
  }
}

export default SavePage;
