import React, { Component } from "react";
import MedicationGrid from "../components/Doctors and medications/MedicationGrid";
import Search from "../components/Doctors and medications/Search";
import Filter from "../components/Doctors and medications/Filter";

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

const Filters = [
  "Injection",
  "Keyword0",
  "Keyword1",
  "Keyword2",
  "Pill",
  "Keyword3",
  "Keyword4",
  "Anti-tussive",
  "Cold",
  "Keyword5",
  "Keyword6",
  "Keyword7"
];

class Medications extends Component {
  state = {
    filterShown: "hidden"
  };

  openFilterBox = () => this.setState({ filterShown: "visible" });
  cancelFilters = () => this.setState({ filterShown: "hidden" });
  applyFilters = filters => {this.setState({ filterShown: "hidden" })};

  render() {
    return (
      <div>
        <Filter
          filters={Filters}
          display={this.state.filterShown}
          cancelFilters={this.cancelFilters}
          applyFilters={this.applyFilters}
          type="medications"
        />
        <Search
          placeholder="Search Medication, desease...etc"
          type="medications"
          openFilterBox={this.openFilterBox}
        />
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
