// @ts-check
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Marker from "../assets/svg/marker.svg";
import { Rate } from "../util/rate";
import Phone from "../assets/svg/phone.svg";
import At from "../assets/svg/at.svg";
import Button from "../components/Button";
import { connect } from "react-redux";
import { getDoctorData } from "../actions/getDoctorsAction";
import ReactLoading from "react-loading";
import UserImg from "../assets/svg/user.svg";
import * as actions from "../actions/types";

class DoctorProfile extends Component {
  boxRef = React.createRef();

  onScrollHandler = ({ currentTarget }) => {
    if (this.boxRef.current) {
      const boxOffset = this.boxRef.current.offsetTop;
      const scroll = currentTarget.pageYOffset;
      const scrollBy = Math.abs(boxOffset - (scroll + 64));

      if (boxOffset <= scroll + 64) {
        this.boxRef.current.style.transform = `translateY(${scrollBy}px)`;
      } else {
        this.boxRef.current.style.transform = `translateY(0)`;
      }
    }
  };

  componentDidMount() {
    this.props.getDoctorData(this.props.match.params.id, this.props.api_token);
    if (window.innerWidth >= 900) {
      window.addEventListener("scroll", this.onScrollHandler);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScrollHandler);
  }

  render() {
    let { doctor } = this.props;

    return doctor.full_name ? (
      <section className="profile">
        <section className="profile__header">
          <div className="profile__header__content">
            <div className="profile__header__content__main">
              <header className="profile__header__content__main__header">
                <div className="profile__header__content__main__header__image">
                  <img
                    src={doctor.image || UserImg}
                    alt={`doctor ${doctor.name} profile`}
                  />
                </div>
                <div className="profile__header__content__main__header__info">
                  <h1>{doctor.full_name}</h1>
                  <p>{doctor.speciality}</p>
                  <div>
                    <img src={Marker} alt="marker" />
                    <p>{doctor.address}</p>
                  </div>
                  <p>
                    <span>{doctor.appointments_count}</span> Bookings,{" "}
                    <span>{doctor.callup_count}</span> Home visits
                  </p>
                </div>
                <div style={{ flexGrow: 5 }} />
                <div className="profile__header__content__main__header__review">
                  <div>
                    <Rate rate={doctor.overall_rating} />
                  </div>
                  <p>{doctor.review_count} reviews</p>
                </div>
              </header>
              <div className="profile__header__content__main__info">
                <p className="profile__header__content__main__info__about">
                  {doctor.qualifications}
                </p>
                {doctor.degrees.length ? (
                  <div className="profile__header__content__main__info__degrees">
                    <h3>Degrees</h3>
                    <div className="tags">
                      {doctor.degrees.map((degree, i) => (
                        <span key={i}>{degree}</span>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="profile__header__content__main__info__contacts">
                  <h3>Contacts</h3>
                  <div className="contacts">
                    <div>
                      <img src={Phone} alt="phone" />
                      <span>{doctor.mobile}</span>
                    </div>
                    <div>
                      <img src={At} alt="email" />
                      <span>{doctor.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile__header__box" ref={this.boxRef}>
              <Link to={`/bookingDoctor/${doctor.id}`}>
                <Button className="btn btn-lg btn-green" type="button">
                  Book now {doctor.fees} L.E
                </Button>
              </Link>
              {doctor.offers_callup && (
                <Link to={`/homeVisitDoctor/${doctor.id}`}>
                  <Button className="btn btn-lg btn-green" type="button">
                    Home visit {doctor.callup_fees} L.E
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
        <section className="profile__reviews">
          <h2>Reviews</h2>
          <div className="profile__reviews__container">
            {doctor.reviews.map((review, i) => {
              return (
                <div className="review" key={i}>
                  <div className="review__image">
                    <img src={review.image || UserImg} alt="user-profile" />
                    <div>
                      <p>{review.full_name}</p>
                      <span>{review.time}</span>
                    </div>
                  </div>
                  <div className="review__rate">
                    <Rate rate={review.rating} />
                    <p>{review.review}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    ) : (
      <ReactLoading
        type="spokes"
        color="#0066ff"
        className="loading loading-doctor-profile"
      />
    );
  }
}

const mapStateToProps = state => ({
  api_token: state.user.api_token,
  doctor: state.doctors.doctorData
});

const mapDispatchToProps = dispatch => ({
  getDoctorData: (id, api_token) => dispatch(getDoctorData({ id, api_token }))
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
