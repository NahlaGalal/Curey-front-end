import React, { Component } from "react";
import DoctorsPrescriptions from "../components/DoctorsPrescriptions";
import RadiologyReports from "../components/RadiologyReports";
import Button from "../components/Button";

class MedicalWallet extends Component {
  state = {
    pageNum: 1
  };

  togglePageNumber = pageNo => {
    if (this.state.pageNum !== pageNo) {
      this.setState({
        pageNum: pageNo
      });
    }
  };
  render() {
    const currentPage = ["Doctors prescriptions", "Radiology reports"];

    return (
      <div className="medicalWallet">
        <div
          className={
            "mb-48 signup__container__forms__toggler toggler active-" +
            this.state.pageNum
          }
        >
          {currentPage.map((type, i) => (
            <Button
              key={i}
              className="medicalWalletTogglers btn"
              onClick={() => {
                this.togglePageNumber(i + 1);
              }}
            >
              {type}
            </Button>
          ))}
          <span className="signup__container__forms__toggler__pointer medicalWalletPointer"></span>
        </div>

        {this.state.pageNum === 1 ? (
          <DoctorsPrescriptions />
        ) : (
          <RadiologyReports />
        )}
      </div>
    );
  }
}

export default MedicalWallet;
