import React from "react";
import ReactLoading from "react-loading";
import Button from "../Button";
import editIcon from "../../assets/svg/edit-blue.svg";
import deleteIcon from "../../assets/svg/delete-red.svg";

const FilterScanning = props => {
  return (
    <div className="Popup">
      <div className="Popup__box">
        <h2 className="heading-2">Prescription scanning outcome</h2>
        {props.prescription.length ? (
          <React.Fragment>
            <ul ref={props.prescriptionScanned} className="Popup__box__details">
              {props.prescription.map((medication, i) => (
                <li key={i} className="Popup__box__details__medication">
                  <span>{medication}</span>
                  <button onClick={props.editMedication}>
                    <img src={editIcon} alt={`edit ${medication}`} />
                  </button>
                  <button onClick={props.deleteMedication}>
                    <img src={deleteIcon} alt={`delete ${medication}`} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="Popup__box__footer buttons">
              <Button
                className="btn btn-green-dark btn-xxs btn-apply"
                onClick={props.applyScanning}
              >
                Confirm
              </Button>
              <Button
                className="btn btn-transparent btn-xxs btn-cancel"
                onClick={props.cancelScanning}
              >
                Cancel
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <ReactLoading type="spokes" color="#0066ff" className="loading" />
        )}
      </div>
    </div>
  );
};

export default FilterScanning;
