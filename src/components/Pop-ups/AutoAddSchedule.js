import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectBox from "../SelectBox";
import TimeInput from "../TimeInput";
import Input from "../Input";

const startDays = [
  { name: "Saturday", id: 1 },
  { name: "Sunday", id: 2 },
  { name: "Monday", id: 3 },
  { name: "Tuesday", id: 4 },
  { name: "Wednesday", id: 5 },
  { name: "Thursday", id: 6 },
  { name: "Friday", id: 7 }
];

const endDays = [
  { name: "Saturday", id: 11 },
  { name: "Sunday", id: 12 },
  { name: "Monday", id: 13 },
  { name: "Tuesday", id: 14 },
  { name: "Wednesday", id: 15 },
  { name: "Thursday", id: 16 },
  { name: "Friday", id: 17 }
];

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const AutoAddSchedule = props => {
  const { register, errors, watch, handleSubmit } = useForm();

  const [startDayBox, setStartDayBox] = useState(false);
  const [endDayBox, setEndDayBox] = useState(false);
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [startTime, setStartTime] = useState({
    time: "",
    format: "AM"
  });
  const [endTime, setEndTime] = useState({
    time: "",
    format: "AM"
  });
  const submittedCnt = usePrevious(props.formSubmit);

  const startDayContainerRef = React.createRef();
  const endDayContainerRef = React.createRef();
  const submitRef = React.createRef();

  useEffect(() => {
    if (props.formSubmit !== submittedCnt && submittedCnt) submitRef.current.click();
  });

  const toggleStartDaySelectBox = () => {
    const boxOpened = startDayBox;
    let itemChecked = [];
    if (boxOpened) {
      itemChecked = Array.from(
        startDayContainerRef.current.querySelectorAll("input[type=radio]")
      )
        .filter(input => input.checked)
        .map(el => ({
          name: el.value,
          id: el.id.split("_")[0]
        }));
    }
    setStartDayBox(!boxOpened);
    setStartDay(itemChecked[0]);
  };
  const toggleEndDaySelectBox = () => {
    const boxOpened = endDayBox;
    let itemChecked = [];
    if (boxOpened) {
      itemChecked = Array.from(
        endDayContainerRef.current.querySelectorAll("input[type=radio]")
      )
        .filter(input => input.checked)
        .map(el => ({
          name: el.value,
          id: el.id.split("_")[0]
        }));
    }
    setEndDayBox(!boxOpened);
    setEndDay(itemChecked[0]);
  };

  return (
    <form
      className="Popup__box__details prescription"
      onSubmit={handleSubmit(data => console.log(data))}
    >
      <div className="row schedule">
        <SelectBox
          onClick={toggleStartDaySelectBox}
          className={`${startDay ? "hasValue" : null}`}
          listChecked={startDay ? [startDay.name] : []}
          header="Starting day"
          boxOpened={startDayBox}
          list={startDays}
          optionsContainerRef={startDayContainerRef}
          multiSelect={false}
          isError={errors["Starting day"]}
          error={
            errors["Starting day"] ? "You must choose your starting day" : null
          }
          refe={register({ required: true })}
        />
        <SelectBox
          onClick={toggleEndDaySelectBox}
          className={`${endDay ? "hasValue" : null}`}
          listChecked={endDay ? [endDay.name] : []}
          header="Ending day"
          boxOpened={endDayBox}
          list={endDays}
          optionsContainerRef={endDayContainerRef}
          multiSelect={false}
          isError={errors["Ending day"]}
          error={
            errors["Ending day"] ? "You must choose your ending day" : null
          }
          refe={register({ required: true })}
        />
      </div>
      <div className="row mb-20">
        <div className="dosing-inputs">
          <TimeInput
            refe={register({
              required: true,
              validate: value =>
                value.toString().length === 5 &&
                value.toString().slice(0, 2) <= 12 &&
                value.toString().slice(0, 2) > 0 &&
                value.toString().slice(3) <= 59 &&
                value.toString().slice(3) >= 0
            })}
            index={0}
            changeDose={e =>
              setStartTime({ ...startTime, time: e.target.value })
            }
            toggleHour={() =>
              setStartTime({
                ...startTime,
                format: startTime.format === "AM" ? "PM" : "AM"
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
              validate: value =>
                value.toString().length === 5 &&
                value.toString().slice(0, 2) <= 12 &&
                value.toString().slice(0, 2) > 0 &&
                value.toString().slice(3) <= 59 &&
                value.toString().slice(3) >= 0
            })}
            index={1}
            changeDose={e => setEndTime({ ...endTime, time: e.target.value })}
            toggleHour={() =>
              setEndTime({
                ...endTime,
                format: endTime.format === "AM" ? "PM" : "AM"
              })
            }
            time={endTime.time}
            hourFormat={endTime.format}
            errors={errors}
            placeholder="Ending time"
          />
        </div>
      </div>
      <Input
        type="text"
        name="duration"
        value={watch("duration")}
        id="duration"
        placeholder="Session duration in minutes"
        isError={errors.duration}
        error={errors.duration ? "You must type session duration" : null}
        refe={register({ required: true, validate: value => +value !== 0 })}
        onKeyPress={e => !e.key.toString().match(/[0-9]/) ? e.preventDefault() : null}
      />
      <input type="submit" hidden ref={submitRef} />
    </form>
  );
};

export default AutoAddSchedule;
