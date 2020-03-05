import React from "react";
import doctorImage from "../../assets/images/man-wearing-a-beanie.png";
import medicationImg from "../../assets/images/med2.png";
import clockIcon from "../../assets/svg/clock.svg";
import PopupFooter from "./PopupFooter";

const prescription = {
  doctorName: "Dr Hassan Ali",
  doctorImage,
  time: "20 minutes ago",
  price: 156,
  medications: [
    {
      medicationImg,
      medicationName: "Flumox syrup",
      numOfTimes: 3,
      periods: "day"
    },
    {
      medicationImg,
      medicationName: "Flumox syrup",
      numOfTimes: 3,
      periods: "day"
    },
    {
      medicationImg,
      medicationName: "Flumox syrup",
      numOfTimes: 3,
      periods: "day"
    },
    {
      medicationImg,
      medicationName: "Flumox syrup",
      numOfTimes: 3,
      periods: "day"
    }
  ]
};

const ConfirmPrescription = props => (
  <section className="Popup">
    <div className="Popup__box">
      <header className="Popup__box__header">
        <img
          src={prescription.doctorImage}
          alt={`Doctor ${prescription.doctorName}`}
        />
        <div>
          <p className="Popup__box__header__info">
            {prescription.doctorName}{" "}
            <span className="fades">sent you a prescription</span>
          </p>
          <p className="Popup__box__header__time">{prescription.time}</p>
        </div>
      </header>
      <section className="Popup__box__details">
        <div className="Popup__box__details__header">
          <h2>Prescription details</h2>
          <p>{prescription.price} L.E</p>
        </div>
        <ul>
          {prescription.medications.map((medication, i) => (
            <li className="Popup__box__details__medication" key={i}>
              <img
                className="Popup__box__details__medication__img"
                src={medication.medicationImg}
                alt={`${medication.medicationName}`}
              />
              <p>
                {medication.medicationName}
                <span>
                  <img src={clockIcon} alt="clock icon" />{" "}
                  <span className="semi-bold">{medication.numOfTimes}</span>{" "}
                  times every{" "}
                  <span className="semi-bold">{medication.periods}</span>
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>
      <PopupFooter
        closePopup={props.closePopup}
        applyText="Order"
        applyAction="/OrderPrescription"
      />
    </div>
  </section>
);

export default ConfirmPrescription;
