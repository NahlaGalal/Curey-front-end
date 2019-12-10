import React from "react";
import EmptyStar from "../assets/svg/empty-star.svg";
import FullStar from "../assets/svg/star.svg";

export const Rate = ({ rate } = { rate: 0 }) => {
  const arr = Array.from({ length: 5 });

  const rates = photo =>
    arr.map((_, i) => <img src={photo} alt="empty-star" key={i} />);

  const width = ((rate <= 5 ? rate : 5) / 5) * 90;

  return (
    <div className="rate">
      <div className="rate__renderer">
        <span className="rate__renderer__empty">{rates(EmptyStar)}</span>
        <span style={{ width: `${width}px` }} className="rate__renderer__full">
          {rates(FullStar)}
        </span>
      </div>
      <p className="rate__number">{rate <= 5 ? rate.toFixed(2) : 5}</p>
    </div>
  );
};
