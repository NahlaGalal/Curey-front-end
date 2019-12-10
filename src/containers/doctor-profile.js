// @ts-check
import React, { Component } from "react";
import ManWearingaBeanie from "../assets/images/man-wearing-a-beanie.png";
import Marker from "../assets/svg/marker.svg";
import EmptyStar from "../assets/svg/empty-star.svg";
import FullStar from "../assets/svg/star.svg";
import FacebookLogo from "../assets/svg/fb.svg";
import Phone from "../assets/svg/phone.svg";
import At from "../assets/svg/at.svg";
import Button from "../components/Button";
import PersonReviewImage from "../assets/images/person-review.png";

const Rate = ({ rate } = { rate: 0 }) => {
    const arr = Array.from({ length: 5 });

    const rates = photo =>
        arr.map((_, i) => <img src={photo} alt="empty-star" key={i} />);

    const width = ((rate <= 5 ? rate : 5) / 5) * 90;

    return (
        <div className="rate">
            <div className="rate__renderer">
                <span className="rate__renderer__empty">
                    {rates(EmptyStar)}
                </span>
                <span
                    style={{ width: `${width}px` }}
                    className="rate__renderer__full"
                >
                    {rates(FullStar)}
                </span>
            </div>
            <p>{rate <= 5 ? rate.toFixed(2) : 5}</p>
        </div>
    );
};

const reviewPlaceHolder = id => ({
    id,
    image: PersonReviewImage,
    name: "Ahmed Raslan",
    time: "Just now",
    rate: Math.random() * 5,
    content:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
});

class DoctorProfile extends Component {
    state = {
        tags: [
            "Master of Clinical Medicine",
            "Doctor of Clinical Medicine",
            "Higher National Diploma",
            "Higher National Diploma",
            "Higher National Diploma"
        ],
        reviews: [
            reviewPlaceHolder(0),
            reviewPlaceHolder(1),
            reviewPlaceHolder(2),
            reviewPlaceHolder(3),
            reviewPlaceHolder(4)
        ]
    };

    boxRef = React.createRef();

    onScrollHandler = ({ currentTarget }) => {
        const boxOffset = this.boxRef.current.offsetTop;
        const scroll = currentTarget.pageYOffset;
        const scrollBy = Math.abs(boxOffset - (scroll + 64));

        if (boxOffset <= scroll + 64) {
            this.boxRef.current.style.transform = `translateY(${scrollBy}px)`;
        } else {
            this.boxRef.current.style.transform = `translateY(0)`;
        }
    };

    componentDidMount() {
        if (window.innerWidth >= 900) {
            window.addEventListener("scroll", this.onScrollHandler);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScrollHandler);
    }

    render() {
        return (
            <section className="profile">
                <section className="profile__header">
                    <div className="profile__header__content">
                        <div className="profile__header__content__main">
                            <header className="profile__header__content__main__header">
                                <div className="profile__header__content__main__header__image">
                                    <img
                                        src={ManWearingaBeanie}
                                        alt="profile-image"
                                    />
                                </div>
                                <div className="profile__header__content__main__header__info">
                                    <h1>Hassan Ali</h1>
                                    <p>Pediatric Surgery, General Surgery</p>
                                    <div>
                                        <img src={Marker} alt="marker" />
                                        <p>Mansoura City, Gehan St</p>
                                    </div>
                                    <p>
                                        <span>1234</span> Bookings,
                                        <span>16</span> Call ups
                                    </p>
                                </div>
                                <div style={{ flexGrow: 5 }} />
                                <div className="profile__header__content__main__header__review">
                                    <div>
                                        <Rate rate={3.4} />
                                    </div>
                                    <p>1205 reviews</p>
                                </div>
                            </header>
                            <div className="profile__header__content__main__info">
                                <p className="profile__header__content__main__info__about">
                                    Lorem ipsum dolor sit amet, consetetur
                                    sadipscing elitr, sed diam nonumy eirmod
                                    tempor invidunt ut labore et dolore magna
                                    aliquyam erat, sed diam voluptua. At vero
                                    eos et accusam et justo duo dolores et ea
                                    rebum. Stet clita kasd gubergren, no sea
                                    takimata sanctus est Lorem ipsum dolor sit
                                    amet. Lorem ipsum dolor sit amet, consetetur
                                    sadipscing elitr, sed diam nonumy eirmod
                                    tempor invidunt ut labore et dolore magna
                                    aliquyam erat, sed
                                </p>
                                <div className="profile__header__content__main__info__degrees">
                                    <h3>Degrees</h3>
                                    <div className="tags">
                                        {this.state.tags.map((v, i) => (
                                            <span key={i}>{v}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="profile__header__content__main__info__contacts">
                                    <h3>Contacts</h3>
                                    <div className="contacts">
                                        <div>
                                            <img src={Phone} alt="phone" />
                                            <span>+201273985008</span>
                                        </div>
                                        <div>
                                            <img src={At} alt="email" />
                                            <span>
                                                hassanqasem000@gmail.com
                                            </span>
                                        </div>
                                        <div>
                                            <img
                                                src={FacebookLogo}
                                                alt="facebook"
                                            />
                                            <span>
                                                facebook.com/hassanaboali
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile__header__box" ref={this.boxRef}>
                            <Button
                                className="btn btn-lg btn-green"
                                type="button"
                            >
                                Book now 129 L.E
                            </Button>
                            <Button
                                className="btn btn-lg btn-green"
                                type="button"
                            >
                                Call up 255 L.E
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="profile__reviews">
                    <h2>Reviews</h2>
                    <div className="profile__reviews__container">
                        {this.state.reviews.map(review => {
                            return (
                                <div className="review" key={review.id}>
                                    <div className="review__image">
                                        <img
                                            src={review.image}
                                            alt="user-profile-image"
                                        />
                                        <div>
                                            <p>{review.name}</p>
                                            <span>{review.time}</span>
                                        </div>
                                    </div>
                                    <div className="review__rate">
                                        <Rate rate={review.rate} />
                                        <p>{review.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </section>
        );
    }
}

export default DoctorProfile;
