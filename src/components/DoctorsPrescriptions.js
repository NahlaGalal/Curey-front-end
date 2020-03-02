import React from "react";
import PrescriptionCard from "../components/Doctors and medications/PrescriptionsCard";

let prescriptions = [
  {
    doctorName: "Mohamed Zayan",
    speciality: "General Surgery",
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
    doctorName: "Mohamed Zayan",
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    medicines: [
      {
        name: "Flumox syrup",
        times: 3,
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
    doctorName: "Mohamed Zayan",
    speciality: "General Surgery",
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
      }
    ]
  },
  {
    doctorName: "Hassan Ali",
    speciality: "General Surgery",
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
      }
    ]
  },
  {
    doctorName: "Hassan Ali",
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    medicines: [
      {
        name: "Flumox syrup",
        times: 3,
        period: "day"
      }
    ]
  },
  {
    doctorName: "Hassan Ali",
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    medicines: [
      {
        name: "Flumox syrup",
        times: 3,
        period: "day"
      }
    ]
  },
  {
    doctorName: "Mohamed Zayan",
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    medicines: [
      {
        name: "Flumox syrup",
        times: 3,
        period: "day"
      }
    ]
  },
  {
    doctorName: "Mohamed Zayan",
    speciality: "General Surgery",
    address: "Mansoura City, Gehan St",
    medicines: [
      {
        name: "Panadol extra pills",
        times: 1,
        period: "day"
      }
    ]
  },
  {
    doctorName: "Mohamed Zayan",
    speciality: "General Surgery",
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
      }
    ]
  }
];

const DoctorsPrescriptions = () => (
  <div className="DoctorsPrescriptions">
    {prescriptions.map((el, index) => (
      <PrescriptionCard
        key={index}
        name={el.doctorName}
        speciality={el.speciality}
        address={el.address}
        medications={el.medicines}
      />
    ))}
  </div>
);

export default DoctorsPrescriptions;
