import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectBox from "../SelectBox";
import TimeInput from "../TimeInput";

const startDays = [
  { name: "Saturday", id: 1 },
  { name: "Sunday", id: 2 },
  { name: "Monday", id: 3 },
  { name: "Tuesday", id: 4 },
  { name: "Wednesday", id: 5 },
  { name: "Thursday", id: 6 },
  { name: "Friday", id: 7 },
];

const endDays = [
  { name: "Saturday", id: 11 },
  { name: "Sunday", id: 12 },
  { name: "Monday", id: 13 },
  { name: "Tuesday", id: 14 },
  { name: "Wednesday", id: 15 },
  { name: "Thursday", id: 16 },
  { name: "Friday", id: 17 },
];

const AutoAddSchedule = (props) => {
  const { register, errors, handleSubmit } = useForm();

  const [startDayBox, setStartDayBox] = useState(false);
  const [endDayBox, setEndDayBox] = useState(false);
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [startTime, setStartTime] = useState({
    time: "",
    format: "AM",
  });
  const [endTime, setEndTime] = useState({
    time: "",
    format: "AM",
  });

  const startDayContainerRef = React.createRef();
  const endDayContainerRef = React.createRef();

  const closeStartDaySelectBox = () => {
    let itemChecked = Array.from(
      startDayContainerRef.current.querySelectorAll("input[type=radio]")
    ).find((input) => input.checked);
    setStartDayBox(false);
    if (itemChecked && itemChecked.id) {
      setStartDay({
        name: itemChecked.value,
        id: itemChecked.id.split("_")[0],
      });
    }
  };
  const closeEndDaySelectBox = () => {
    let itemChecked = Array.from(
      endDayContainerRef.current.querySelectorAll("input[type=radio]")
    ).find((input) => input.checked);
    setEndDayBox(false);
    if (itemChecked && itemChecked.id) {
      setEndDay({
        name: itemChecked.value,
        id: itemChecked.id.split("_")[0],
      });
    }
  };

  return (
    <form
      className="Popup__box__details prescription"
      onSubmit={handleSubmit((data) =>
        props.addSchedule({
          ...data,
          sTimeFormat: startTime.format,
          eTimeFormat: endTime.format,
        })
      )}
      id="submit-form"
    >
      {props.add ? (
        <div className="row schedule">
          <SelectBox
            onClick={closeStartDaySelectBox}
            openBox={() => setStartDayBox(!startDayBox)}
            className={`${startDay.id ? "hasValue" : null}`}
            listChecked={startDay ? startDay.name : ""}
            header="Starting day"
            boxOpened={startDayBox}
            list={startDays}
            optionsContainerRef={startDayContainerRef}
            isError={errors["Starting day"]}
            error={
              errors["Starting day"]
                ? "You must choose your starting day"
                : null
            }
            refe={register({ required: true })}
          />
          <SelectBox
            onClick={closeEndDaySelectBox}
            openBox={() => setEndDayBox(!endDayBox)}
            className={`${endDay.id ? "hasValue" : null}`}
            listChecked={endDay ? endDay.name : ""}
            header="Ending day"
            boxOpened={endDayBox}
            list={endDays}
            optionsContainerRef={endDayContainerRef}
            isError={errors["Ending day"]}
            error={
              errors["Ending day"] ? "You must choose your ending day" : null
            }
            refe={register({ required: true })}
          />
        </div>
      ) : null}
      <div className="row mb-20">
        <div className="dosing-inputs">
          <TimeInput
            refe={register({
              required: true,
              validate: (value) =>
                value.toString().length === 5 &&
                value.toString().slice(0, 2) <= 12 &&
                value.toString().slice(0, 2) > 0 &&
                value.toString().slice(3) <= 59 &&
                value.toString().slice(3) >= 0,
            })}
            index={0}
            changeDose={(e) =>
              setStartTime({ ...startTime, time: e.target.value })
            }
            toggleHour={() =>
              setStartTime({
                ...startTime,
                format: startTime.format === "AM" ? "PM" : "AM",
              })
            }
            time={startTime.time}
            hourFormat={startTime.format}
            errors={errors}
            placeholder="Starting time"
          />
        </div>
        <div className="dosing-inputs">
          <TimeInput
            refe={register({
              required: true,
              validate: (value) =>
                value.toString().length === 5 &&
                value.toString().slice(0, 2) <= 12 &&
                value.toString().slice(0, 2) > 0 &&
                value.toString().slice(3) <= 59 &&
                value.toString().slice(3) >= 0,
            })}
            index={1}
            changeDose={(e) => setEndTime({ ...endTime, time: e.target.value })}
            toggleHour={() =>
              setEndTime({
                ...endTime,
                format: endTime.format === "AM" ? "PM" : "AM",
              })
            }
            time={endTime.time}
            hourFormat={endTime.format}
            errors={errors}
            placeholder="Ending time"
          />
        </div>
      </div>
    </form>
  );
};

export default AutoAddSchedule;
