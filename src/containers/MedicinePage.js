import React from "react";
import MedicineCard from "../components/Doctors and medications/MedicineCard";
import Button from "../components/Button";
import PharmacyItem from "../components/PharmacyItem";
import LocationIcon from "../assets/svg/location.svg";

const medicine = {
  name: "Antinal",
  price: 12,
  isFavourite: false,
  description:
    "Broad-spectrum intestinal antiseptic for the treatment of diarrhea & gastroenteritis"
};

const MedicinePage = () => (
  <React.Fragment>
    <main className="medicinePage__contianer">
      <div className="medicinePage__contianer__medicine">
        <div className="medicine__container">
          <MedicineCard
            name={medicine.name}
            price={medicine.price}
            description={medicine.description}
            isFavourite
          />
        </div>

        <div className="delivery__container">
          <h3 className="heading-3">Delivery fees: 10 L.E</h3>
          <p className="delivery__container__text">
            Delivery fees are set based on the following address, and this is
            the address that the medication will be delivered to
          </p>
          <span>
            <img src={LocationIcon} alt="location-icon" /> Mansoura City, Gehan
            St
          </span>
          <Button className="btn btn-green-dark btn-lg delivery__container__btn">
            Change address
          </Button>
        </div>
      </div>
      <div className="medicinePage__contianer__pharmacy">
        <div className="pharmacies__container">
          <h2 className="heading-2">Pharmacies list</h2>
          <PharmacyItem
            name="Roshdy pharmacies"
            rate={4}
            reviews={12}
            address="Mansoura City, Gehan St"
          />
          <PharmacyItem
            name="Roshdy pharmacies"
            rate={4}
            reviews={12}
            address="Mansoura City, Gehan St"
          />
          <PharmacyItem
            name="Roshdy pharmacies"
            rate={4}
            reviews={12}
            address="Mansoura City, Gehan St"
          />
          <PharmacyItem
            name="Roshdy pharmacies"
            rate={4}
            reviews={12}
            address="Mansoura City, Gehan St"
          />
          <PharmacyItem
            name="Roshdy pharmacies"
            rate={4}
            reviews={12}
            address="Roshdy pharmacies"
          />
          <PharmacyItem
            name="Roshdy pharmacies"
            rate={4}
            reviews={12}
            address="Roshdy pharmacies"
          />
          <PharmacyItem
            name="Roshdy pharmacies"
            rate={4}
            reviews={12}
            address="Roshdy pharmacies"
          />
          <PharmacyItem
            name="Roshdy pharmacies"
            rate={4}
            reviews={12}
            address="Roshdy pharmacies"
          />
        </div>
      </div>
    </main>
  </React.Fragment>
);

export default MedicinePage;
