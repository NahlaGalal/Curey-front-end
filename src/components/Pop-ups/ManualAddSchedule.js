import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectBox from "../SelectBox";
import plusIcon from "../../assets/svg/plus.svg";
import TimeInput from "../TimeInput";

const days = [
  { name: "Saturday", id: 1 },
  { name: "Sunday", id: 2 },
  { name: "Monday", id: 3 },
  { name: "Tuesday", id: 4 },
  { name: "Wednesday", id: 5 },
  { name: "Thursday", id: 6 },
  { name: "Friday", id: 7 },
];

const ManualAddSchedule = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const [dayBox, setDayBox] = useState(false);
  const [day, setDay] = useState({ name: "", id: null });
  const [appointments, setAppointments] = useState([
    {
      time: "",
      format: "AM",
    },
  ]);

  const dayContainerRef = React.createRef();

  const closeDaySelectBox = () => {
    let itemChecked = Array.from(
      dayContainerRef.current.querySelectorAll("input[type=radio]")
    ).find((input) => input.checked);
    setDayBox(false);
    if(itemChecked && itemChecked.id) {
      setDay({
        name: itemChecked.value,
        id: itemChecked.id.slice("_")[0],
      });
    }
  };

  const addDosingInput = () => {
    let state = [...appointments];
    state.push({
      time: "",
      format: "AM",
    });
    setAppointments(state);
  };

  return (
    <form
      className="Popup__box__details prescription"
      onSubmit={handleSubmit((data) => console.log(data))}
      if="submit-form"
    >
      {props.add ? (
        <SelectBox
          onClick={closeDaySelectBox}
          openBox={() => setDayBox(!dayBox)}
          className={`${day.id ? "hasValue" : null}`}
          listChecked={day ? day.name : []}
          header="Set the day"
          boxOpened={dayBox}
          list={days}
          optionsContainerRef={dayContainerRef}
          isError={errors["Set the day"]}
          error={
            errors["Set the day"] ? "You must choose your starting day" : null
          }
          refe={register({ required: true })}
        />
      ) : (
        <div className="fieldinput">
          <input
            type="text"
            className="fieldinput__input"
            readOnly
            value={props.day}
          />
        </div>
      )}
      <div className="row">
        <div className="dosing-inputs">
          {appointments.map((appointment, i) => (
            <TimeInput
              key={i}
              refe={register({
                required: true,
                validate: (value) =>
                  value.toString().length === 5 &&
                  value.toString().slice(0, 2) <= 12 &&
                  value.toString().slice(0, 2) > 0 &&
                  value.toString().slice(3) <= 59 &&
                  value.toString().slice(3) >= 0,
              })}
              index={i}
              changeDose={(e) => {
                let state = [...appointments];
                state[i].time = e.target.value;
                setAppointments(state);
              }}
              toggleHour={() => {
                let state = [...appointments];
                state[i].format = state[i].format === "AM" ? "PM" : "AM";
                setAppointments(state);
              }}
              time={appointment.time}
              hourFormat={appointment.format}
              errors={errors}
              placeholder="Starting time"
            />
          ))}
        </div>
        <button className="btn btn-add" type="button" onClick={addDosingInput}>
          <img src={plusIcon} alt="Plus icon" />
        </button>
      </div>
    </form>
  );
};

export default ManualAddSchedule;
