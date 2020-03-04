import React, { Component, Fragment } from "react";
import MedicineCard from "../components/Doctors and medications/MedicineCard";

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
  state = { hovered: [] };

  componentDidMount() {
    this.setState({hovered: new Array(medications.length).fill(false)})
  }

  render() {
    return (
      <Fragment>
        <div className="pageHeader">
          <h2 className="heading-2">My medications</h2>
        </div>
        <section className="topMedications">
          <div className="topMedications__container">
            <div className="medicationGrid">
              {medications.map((medication, i) => (
                <MedicineCard
                  key={i}
                  name={medication.name}
                  price={medication.price}
                  description={medication.description}
                  isFavourite={true}
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
          </div>
        </section>
      </Fragment>
    );
  }
}

export default SavePage;
