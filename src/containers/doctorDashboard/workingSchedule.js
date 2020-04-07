import React, { Component } from "react";
import Button from "../../components/Button";
import AppointmentSchedule from "../../components/doctorDashboard/appointmentsSchedule";
import AddSchedule from "../../components/Pop-ups/AddSchedule";
import { connect } from "react-redux";
import {
  SAGA_GET_SCHEDULE,
  SAGA_ADD_SCHEDULE,
  SAGA_EDIT_SCHEDULE,
} from "../../actions/types";
import ReactLoading from "react-loading";
import EditSchedule from "../../components/Pop-ups/EditSchedule";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

class WorkingSchedule extends Component {
  state = {
    addScheduleBox: false,
    page: 1,
    editScheduleBox: false,
    day: {
      id: null,
      name: "",
    },
  };

  componentDidMount() {
    this.props.getSchedule(this.props.api_token);
  }

  changePage = (e) => {
    this.setState({ page: +e.target.textContent });
  };

  addSchedule = (data) => {
    let from = days.findIndex((day) => day === data["Starting day"]);
    const to = days.findIndex((day) => day === data["Ending day"]);
    let start_time = `${data["dosing-0"]}:00`,
      end_time = `${data["dosing-1"]}:00`;
    start_time =
      data.sTimeFormat === "PM" && !start_time.startsWith("12")
        ? start_time.replace(
            start_time.slice(0, 2),
            +start_time.slice(0, 2) + 12
          )
        : data.sTimeFormat === "AM" && start_time.startsWith("12")
        ? "00:00:00"
        : start_time;
    end_time =
      data.eTimeFormat === "PM" && !end_time.startsWith("12")
        ? end_time.replace(end_time.slice(0, 2), +end_time.slice(0, 2) + 12)
        : data.eTimeFormat === "AM" && end_time.startsWith("12")
        ? "00:00:00"
        : end_time;
    let schedule = [];
    while (from !== to) {
      schedule.push({
        day_id: from === 6 ? 1 : from + 2,
        from: start_time,
        to: end_time,
      });
      from = (from + 1) % 7;
    }
    schedule.push({
      day_id: to === 6 ? 1 : from + 2,
      from: start_time,
      to: end_time,
    });
    this.props.postAddSchedule({ api_token: this.props.api_token, schedule });
    this.setState({ addScheduleBox: false });
  };

  updateDay = (data) => {
    let start_time = `${data["dosing-0"]}:00`,
      end_time = `${data["dosing-1"]}:00`;
    start_time =
      data.sTimeFormat === "PM" && !start_time.startsWith("12")
        ? start_time.replace(
            start_time.slice(0, 2),
            +start_time.slice(0, 2) + 12
          )
        : data.sTimeFormat === "AM" && start_time.startsWith("12")
        ? "00:00:00"
        : start_time;
    end_time =
      data.eTimeFormat === "PM" && !end_time.startsWith("12")
        ? end_time.replace(end_time.slice(0, 2), +end_time.slice(0, 2) + 12)
        : data.eTimeFormat === "AM" && end_time.startsWith("12")
        ? "00:00:00"
        : end_time;
    this.props.postEditSchedule({
      api_token: this.props.api_token,
      from: start_time,
      to: end_time,
      day_id: this.state.day.id,
    });
    this.setState({ editScheduleBox: false });
  };

  render() {
    let schedule = days
      .map((day, index) =>
        this.props.schedule
          .filter((obj) => obj.day === day)
          .map((obj) => ({
            from: obj.from,
            to: obj.to,
            day,
            day_id: index,
            id: obj.id,
          }))
      )
      .filter((obj) => obj.length)
      .sort((obj1, obj2) =>
        obj1[0].day_id < obj2[0].day_id
          ? -1
          : obj1[0].day_id > obj2[0].day_id
          ? 1
          : 0
      );
    const today = new Date().getDay();
    const dayIndex = schedule.findIndex((day) => day[0].day_id >= today);
    if (dayIndex !== -1)
      schedule = [...schedule.slice(dayIndex), ...schedule.slice(0, dayIndex)];

    return (
      <React.Fragment>
        <div className="workingSchedule">
          <div className="scheduleBox">
            <div className="flex">
              <h3 className="heading-3">
                Your working schdule for bookings service
              </h3>
              <Button
                className="btn btn-green-dark scheduleBox__btn"
                onClick={() => this.setState({ addScheduleBox: true })}
              >
                Add schedule
              </Button>
            </div>
            {schedule.length ? (
              <p className="scheduleBox__indicators">
                <Button onClick={this.changePage}>1</Button>
                {schedule.length > 4 ? (
                  <Button onClick={this.changePage}>2</Button>
                ) : null}
                {schedule.length > 5 ? (
                  <Button onClick={this.changePage}>3</Button>
                ) : null}
                {schedule.length > 6 ? (
                  <Button onClick={this.changePage}>4</Button>
                ) : null}
              </p>
            ) : null}
            {this.props.schedule.length ? (
              <div className="scheduleBox__grid">
                {schedule
                  .slice(this.state.page - 1, this.state.page + 3)
                  .map((times, i) => (
                    <AppointmentSchedule
                      key={i}
                      title={
                        times[0].day_id === new Date().getDay()
                          ? "Today's appointments"
                          : times[0].day_id === (new Date().getDay() + 1) % 7
                          ? "Tomorrow's appointments"
                          : `${times[0].day} appointments`
                      }
                      scheduleBegining={times.map((time) => time.from)}
                      scheduleEnding={times.map((time) => time.to)}
                      updateDay={() =>
                        this.setState({
                          editScheduleBox: true,
                          day: { id: times[0].id, name: times[0].day },
                        })
                      }
                    />
                  ))}
              </div>
            ) : this.props.errors.error ? (
              <p className="scheduleBox__error"> No schedule yet </p>
            ) : (
              <ReactLoading
                type="spokes"
                color="#0066ff"
                className="loading center mb-40"
              />
            )}
          </div>
          <div className="homeVisit">
            <input type="checkbox" id="homeVisit" />
            <label htmlFor="homeVisit">
              <span></span> Home visit srevice
            </label>
          </div>
        </div>
        {this.state.addScheduleBox && (
          <AddSchedule
            closePopup={() => this.setState({ addScheduleBox: false })}
            addSchedule={(data) => this.addSchedule(data)}
          />
        )}
        {this.state.editScheduleBox && (
          <EditSchedule
            closePopup={() => this.setState({ editScheduleBox: false })}
            updateDay={(data) => this.updateDay(data)}
            day={this.state.day}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  api_token: state.user.api_token,
  schedule: state.doctorData.schedule,
  errors: state.doctorData.errors,
});

const mapDispatchToProps = (dispatch) => ({
  getSchedule: (api_token) => dispatch({ type: SAGA_GET_SCHEDULE, api_token }),
  postAddSchedule: (data) => dispatch({ type: SAGA_ADD_SCHEDULE, data }),
  postEditSchedule: (data) => dispatch({ type: SAGA_EDIT_SCHEDULE, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkingSchedule);
