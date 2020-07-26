import React, { useState } from "react";
import Button from "../Button";
import SelectBox from "../SelectBox";
import FilterScanning from "../Pop-ups/FilterScanning";

const Filter = (props) => {
  const [cityBoxOpened, setCityBoxOpened] = useState(false);
  const [city, setCity] = useState({ name: "", id: null });
  const [specialityBoxOpened, setSpecialityBoxOpened] = useState(false);
  const [speciality, setSpeciality] = useState({ name: "", id: null });
  const [scanningOutcomOpened, setScanningOutcomOpened] = useState(false);
  const [scanningItems, setScanningItems] = useState([]);
  const [commonSearch, setCommonSearch] = useState([]);

  const citiesContainerRef = React.createRef();
  const specialitiesContainerRef = React.createRef();
  const prescriptionScanned = React.createRef();
  const keywords = [
    city.name,
    speciality.name,
    ...commonSearch.map((key) => key.name),
    ...scanningItems,
  ];

  const unCheckFilter = (e) => {
    const filter = e.target.textContent;
    if (filter === city.name) {
      setCity({ name: "", id: null });
      Array.from(
        citiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).forEach((input) => (input.checked = false));
    } else if (filter === speciality.name) {
      setSpeciality({ name: "", id: null });
      Array.from(
        specialitiesContainerRef.current.querySelectorAll("input[type=radio]")
      ).forEach((input) => (input.checked = false));
    } else if (commonSearch.map((key) => key.name).includes(filter)) {
      const index = commonSearch.findIndex((key) => key.name === filter);
      const commonSearchState = [...commonSearch];
      commonSearchState.splice(index, 1);
      setCommonSearch(commonSearchState);
    } else {
      const index = scanningItems.findIndex((key) => key === filter);
      const scanningItemsState = [...scanningItems];
      scanningItemsState.splice(index, 1);
      setScanningItems(scanningItemsState);
    }
  };

  const checkFilter = (filter) => {
    const commonSearchState = [...commonSearch];
    const index = commonSearchState.findIndex((key) => filter.id === key.id);
    if (index === -1)
      commonSearchState.push({
        name: filter.name,
        id: filter.id,
      });
    else commonSearchState.splice(index, 1);
    setCommonSearch(commonSearchState);
  };

  const closeCitySelectBox = () => {
    let cityChecked = { ...city };
    cityChecked = Array.from(
      citiesContainerRef.current.querySelectorAll("input[type=radio]")
    ).find((input) => input.checked);
    setCityBoxOpened(false);
    if (cityChecked && cityChecked.id) {
      setCity({
        name: cityChecked.value,
        id: cityChecked.id.split("_")[0],
      });
    }
  };

  const closeSpecialitySelectBox = () => {
    let specialityChecked = { ...speciality };
    specialityChecked = Array.from(
      specialitiesContainerRef.current.querySelectorAll("input[type=radio]")
    ).find((input) => input.checked);
    setSpecialityBoxOpened(false);
    if (specialityChecked && specialityChecked.id) {
      setSpeciality({
        name: specialityChecked.value,
        id: specialityChecked.id.split("_")[0],
      });
    }
  };

  const scanPrescription = (e) => {
    if (e.target.files.length) {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      props.scanPrescription(formData);
      setScanningOutcomOpened(true);
    }
  };

  const cancelScanning = () => setScanningOutcomOpened(false);

  const applyScanning = () => {
    const medications = Array.from(prescriptionScanned.current.children).map(
      (element) => element.textContent
    );
    setScanningOutcomOpened(false);
    setScanningItems([...medications]);
  };

  const deleteMedication = (e) => {
    const element = e.target.parentNode.parentNode;
    element.parentNode.removeChild(element);
  };

  const editMedication = (e) => {
    const medication = e.target.parentNode.parentNode.children[0];
    medication.classList.toggle("editable");
    medication.contentEditable =
      medication.contentEditable === "true" ? false : true;
  };

  return (
    <div className={`Filter ${props.display}`}>
      <section className="Filter__filterBox">
        <header>
          <h2> Filter </h2>
        </header>
        <div className="Filter__checked">
          {keywords.map(
            (filter, i) =>
              filter && (
                <Button
                  className="btn btn-filter active"
                  key={i}
                  onClick={unCheckFilter}
                >
                  {filter}
                </Button>
              )
          )}
        </div>
        {props.type === "medications" ? (
          <form className="Filter__prescription">
            <input
              type="file"
              name="image"
              id="prescription"
              hidden
              accept="image/*"
              onChange={(e) => scanPrescription(e)}
            />
            <label
              htmlFor="prescription"
              className="btn checkout-btn Filter__prescription__label"
            >
              Filter by prescription
            </label>
          </form>
        ) : null}
        {props.filters.length ? (
          <div className="Filter__options">
            <h3> Common search </h3>
            {props.filters.map((filter, i) => (
              <Button
                className={`btn btn-filter ${
                  commonSearch.map((key) => key.id).includes(filter.id)
                    ? "active"
                    : null
                }`}
                key={i}
                onClick={() => checkFilter(filter)}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        ) : undefined}
        {props.type === "doctors" ? (
          <div className="Filter__checkbox">
            <h3> City & Speciality </h3>
            <SelectBox
              onClick={closeCitySelectBox}
              openBox={() => setCityBoxOpened(!cityBoxOpened)}
              className={`${city.id ? "hasValue" : null}`}
              listChecked={city.id ? city.name : ""}
              header="Cities"
              boxOpened={cityBoxOpened}
              list={props.cities}
              optionsContainerRef={citiesContainerRef}
            />
            <SelectBox
              onClick={closeSpecialitySelectBox}
              openBox={() => setSpecialityBoxOpened(!cityBoxOpened)}
              className={`${speciality.id ? "hasValue" : null}`}
              listChecked={speciality.id ? speciality.name : ""}
              header="Specialities"
              boxOpened={specialityBoxOpened}
              list={props.specialities}
              optionsContainerRef={specialitiesContainerRef}
            />
          </div>
        ) : null}
        <div className="Filter__buttons">
          <Button
            className="btn btn-green-dark btn-apply btn-xxs"
            onClick={() =>
              props.applyFilters({
                cities: city.id ? [city.id] : [],
                specialities: speciality.name ? [speciality.name] : [],
                keywords: [...commonSearch],
                specialities_id: speciality.id ? [speciality.id] : [],
              })
            }
          >
            {" "}
            Apply{" "}
          </Button>
          <Button
            className="btn btn-transparent btn-cancel btn-xxs"
            onClick={props.cancelFilters}
          >
            {" "}
            Cancel{" "}
          </Button>
        </div>
      </section>
      {scanningOutcomOpened && (
        <FilterScanning
          prescription={props.prescription}
          prescriptionScanned={prescriptionScanned}
          editMedication={editMedication}
          deleteMedication={deleteMedication}
          applyScanning={applyScanning}
          cancelScanning={cancelScanning}
        />
      )}
    </div>
  );
};

export default Filter;
