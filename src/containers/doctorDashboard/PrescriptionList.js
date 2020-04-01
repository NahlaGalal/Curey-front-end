import React, { Component } from "react";
import Search from "../../components/Doctors and medications/Search";
import Button from "../../components/Button";
import PrescriptionCard from "../../components/Doctors and medications/PrescriptionsCard";

class PrescriptionList extends Component {
  state = {
    prescriptions: [
      {
        doctorName: "John Doe",
        address: "Mansoura City, Gehan St",
        medicines: [
          {
            name: "Flumox syrup",
            times: 3,
            period: "day"
          },
          {
            name: "Panadol extra pills",
            times: 1,
            period: "day"
          },
          {
            name: "Antinal pills",
            times: 2,
            period: "day"
          }
        ]
      },
      {
        doctorName: "John Doe",
        address: "Mansoura City, Gehan St",
        medicines: [
          {
            name: "Flumox syrup",
            times: 3,
            period: "day"
          },
          {
            name: "Panadol extra pills",
            times: 1,
            period: "day"
          },
          {
            name: "Antinal pills",
            times: 2,
            period: "day"
          }
        ]
      },
      {
        doctorName: "John Doe",
        address: "Mansoura City, Gehan St",
        medicines: [
          {
            name: "Flumox syrup",
            times: 3,
            period: "day"
          },
          {
            name: "Panadol extra pills",
            times: 1,
            period: "day"
          },
          {
            name: "Antinal pills",
            times: 2,
            period: "day"
          }
        ]
      },
      {
        doctorName: "John Doe",
        address: "Mansoura City, Gehan St",
        medicines: [
          {
            name: "Flumox syrup",
            times: 3,
            period: "day"
          },
          {
            name: "Panadol extra pills",
            times: 1,
            period: "day"
          },
          {
            name: "Antinal pills",
            times: 2,
            period: "day"
          }
        ]
      },
      {
        doctorName: "John Doe",
        address: "Mansoura City, Gehan St",
        medicines: [
          {
            name: "Flumox syrup",
            times: 3,
            period: "day"
          },
          {
            name: "Panadol extra pills",
            times: 1,
            period: "day"
          },
          {
            name: "Antinal pills",
            times: 2,
            period: "day"
          }
        ]
      },
      {
        doctorName: "John Doe",
        address: "Mansoura City, Gehan St",
        medicines: [
          {
            name: "Flumox syrup",
            times: 3,
            period: "day"
          },
          {
            name: "Panadol extra pills",
            times: 1,
            period: "day"
          },
          {
            name: "Antinal pills",
            times: 2,
            period: "day"
          }
        ]
      },
      {
        doctorName: "John Doe",
        address: "Mansoura City, Gehan St",
        medicines: [
          {
            name: "Flumox syrup",
            times: 3,
            period: "day"
          },
          {
            name: "Panadol extra pills",
            times: 1,
            period: "day"
          },
          {
            name: "Antinal pills",
            times: 2,
            period: "day"
          }
        ]
      },
      {
        doctorName: "John Doe",
        address: "Mansoura City, Gehan St",
        medicines: [
          {
            name: "Flumox syrup",
            times: 3,
            period: "day"
          },
          {
            name: "Panadol extra pills",
            times: 1,
            period: "day"
          },
          {
            name: "Antinal pills",
            times: 2,
            period: "day"
          }
        ]
      },
      {
        doctorName: "John Doe",
        address: "Mansoura City, Gehan St",
        medicines: [
          {
            name: "Flumox syrup",
            times: 3,
            period: "day"
          },
          {
            name: "Panadol extra pills",
            times: 1,
            period: "day"
          },
          {
            name: "Antinal pills",
            times: 2,
            period: "day"
          }
        ]
      }
    ]
  };
  render() {
    return (
      <div className="PrescriptionList">
        <Search
          placeholder="Search through the list...."
          type="medications"
          withFilter
        />

        <div className="PrescriptionList__grid">
          {this.state.prescriptions.map((el, index) => (
            <PrescriptionCard
              key={index}
              name={el.doctorName}
              speciality={el.speciality}
              address={el.address}
              medications={el.medicines}
            />
          ))}
        </div>
        <Button className="btn btn-blue btn-lg center">See more</Button>
      </div>
    );
  }
}

export default PrescriptionList;
