import React, { Component } from "react";
import Button from "../../components/Button";
import Search from "../../components/Doctors and medications/Search";
import PharmacyCard from "../../components/pharmacy/PharmacyCard";
import PharmacyFilter from "../../components/pharmacy/PharmacyFilter";

const medications = [
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  },
  {
    name: "Cataflam pills",
    price: 12.5,
    company: "farako",
    generic: "Diclofenac",
    pharmacology: "Diclofenac",
    quantity: 124
  }
];

export class MedicationsList extends Component {
  state = {
    filterShown: "hidden",
    search: "",
    filters: {
      keywords: []
    }
  };
  
  openFilterBox = () => this.setState({ filterShown: "visible" });
  cancelFilters = () => this.setState({ filterShown: "hidden" });
  applyFilters = () => {

  }

  render() {
    const companies = [
      { name: "Company1", id: 1 },
      { name: "Company2", id: 2 },
      { name: "Company3", id: 3 }
    ];
    const generics = [
      { name: "generic1", id: 1 },
      { name: "generic2", id: 2 },
      { name: "generic3", id: 3 }
    ];
    const pharmacologies = [
      { name: "pharmacology1", id: 1 },
      { name: "pharmacology2", id: 2 },
      { name: "pharmacology3", id: 3 }
    ];
    const types = [
      { name: "type1", id: 1 },
      { name: "type2", id: 2 },
      { name: "type3", id: 3 }
    ];

    return (
      <div className="pharamcyDashboardContainer">
        <Button className="btn btn-green-dark btn-connect">
          Connect with local data
        </Button>
        <PharmacyFilter
          filters={[]}
          display={this.state.filterShown}
          cancelFilters={this.cancelFilters}
          applyFilters={this.applyFilters}
          type="medications"
          companies={companies}
          generics={generics}
          pharmacologies={pharmacologies}
          types={types}
        />
        <Search
          placeholder="Search through the medications list"
          type="medications"
          openFilterBox={this.openFilterBox}
          withFilter
          // searchfunction={this.searchDoctor}
        />
        <div className="dashboardGrid">
          {medications.map((medication, i) => (
            <PharmacyCard medication={medication} key={i} />
          ))}
        </div>
        <Button className="btn btn-blue btn-lg">See more</Button>
      </div>
    );
  }
}

export default MedicationsList;
