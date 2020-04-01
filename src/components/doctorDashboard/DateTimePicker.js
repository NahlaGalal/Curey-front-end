import React, { useState } from "react";
import nextIcon from "../../assets/svg/next.svg";
import prevIcon from "../../assets/svg/prev.svg";

const DateTimePicker = (props) => {
  const monthsStr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const [inputShow, setInputShow] = useState(new Array(7).fill(false));
  const [reExDate, setReExDate] = useState(0);
  const [time, setTime] = useState("");
  const [error, setError] = useState(false);
  const [timeFormat, setTimeFormat] = useState("AM");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const firstDayInMonth = new Date(`${month + 1}-1-${year}`).getDay();
  const lastDayInMonth = new Date(year, month + 1, 0).getDay();
  const numDays = new Date(year, month + 1, 0).getDate();
  const lastMonthDays =
    new Date(year, month, 0).getDate() - firstDayInMonth + 1;
  let days = [];
  for (let i = 0; i < firstDayInMonth; i++)
    days.push({ current: false, day: lastMonthDays + i });
  for (let i = 1; i <= numDays; i++) days.push({ current: true, day: i });
  for (let i = 1; i <= 6 - lastDayInMonth; i++)
    days.push({ current: false, day: i });

  const reset = () => {
    setInputShow(new Array(7).fill(false));
    setReExDate(0);
    setTimeFormat("AM");
    setTime("");
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else setMonth(month + 1);
    reset();
  };

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else setMonth(month - 1);
    reset();
  };

  const showTime = (day, i) => {
    if (reExDate !== +day) {
      setReExDate(+day);
      const index = Math.floor(i / 7);
      const last = new Array(7).fill(false);
      last[index] = true;
      setInputShow(last);
    } else reset();
  };

  const controlTime = e => {
    if (
      !e.key.toString().match(/[0-9]/) ||
      e.target.value.toString().length === 5
    )
      e.preventDefault();
    else if (e.target.value.toString().length === 2) e.target.value += ":";
  };

  const validateTime = () => {
    let hour = +time.slice(0, 2);
    if (timeFormat === "PM") hour += 12;
    const min = +time.slice(3);
    if (
      month === new Date().getMonth() &&
      year === new Date().getFullYear() &&
      reExDate === new Date().getDate()
    ) {
      if (
        new Date().getHours() > hour ||
        (new Date().getHours() === hour && new Date().getMinutes() > min)
      )
        return setError(true);
    }
    if (hour < 24 && hour >= 0 && min <= 59 && min >= 0) return setError(false);
    return setError(true);
  };

  return (
    <div className="Popup">
      <div className="dateTimePicker">
        <h2>Set re-examination date</h2>
        <div className="current-date">
          <button
            onClick={prevMonth}
            disabled={
              month === new Date().getMonth() &&
              year === new Date().getFullYear()
                ? true
                : false
            }
          >
            <img src={prevIcon} alt="previous icon" />
          </button>
          <p> {`${monthsStr[month]} ${year}`} </p>
          <button onClick={nextMonth}>
            {" "}
            <img src={nextIcon} alt="previous icon" />{" "}
          </button>
        </div>
        <div className="calender">
          <div className="days">
            <span> Su </span>
            <span> Mo </span>
            <span> Tu </span>
            <span> We </span>
            <span> Th </span>
            <span> Fr </span>
            <span> Sa </span>
            {days.map((day, i) => (
              <React.Fragment key={i}>
                <button
                  className={`nums${
                    day.current
                      ? reExDate === +day.day
                        ? " current active"
                        : " current"
                      : ""
                  }`}
                  disabled={
                    (month === new Date().getMonth() &&
                      year === new Date().getFullYear() &&
                      day.current &&
                      day.day < new Date().getDate()) ||
                    !day.current
                      ? true
                      : false
                  }
                  onClick={() => showTime(day.day, i)}
                >
                  {" "}
                  {day.day}{" "}
                </button>
                {!((i + 1) % 7) && i ? (
                  <div
                    className={
                      inputShow[Math.floor(i / 7)] ? "time visible" : "time"
                    }
                  >
                    <input
                      type="text"
                      placeholder="Set time"
                      name="time"
                      id={`time-${i}`}
                      onKeyPress={e => controlTime(e)}
                      onChange={e => setTime(e.target.value)}
                      value={time}
                    />
                    <span>{timeFormat}</span>
                    <button
                      className="arrow-up"
                      onClick={() =>
                        timeFormat === "AM"
                          ? setTimeFormat("PM")
                          : setTimeFormat("AM")
                      }
                    ></button>
                    <button
                      className="arrow-down"
                      onClick={() =>
                        timeFormat === "AM"
                          ? setTimeFormat("PM")
                          : setTimeFormat("AM")
                      }
                    ></button>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
        {error ? (
          <p className="error"> You must write the time correct </p>
        ) : null}
        <div className="buttons">
          <button className="confirm btn btn-xxs btn-green-dark" onClick={validateTime}>
            Confirm{" "}
          </button>
          <button className="cancel btn btn-xxs" onClick={props.closePopup}>Cancel </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
