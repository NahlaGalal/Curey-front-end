import React from "react";

import { useState } from "react";

const linearScale = (domain, range, value) => {
  const fullDomain = domain[1] - domain[0];
  const fullRange = range[1] - range[0];
  const passedNumberFromDomain = value - domain[0];
  const passedPresentFromDomain = passedNumberFromDomain / fullDomain;
  // asume no zero value 100%
  const scale = /* range[0] +  */ fullRange * passedPresentFromDomain;
  return scale;
};

const BarChart = ({
  viewBox = [0, 0, 400, 300],
  /* Data only is required */
  data,
  title
}) => {
  /**
   * what is Data ?
   * Object that have:
   *      - The current value of a bar
   *      - The Month of this value
   * @example
   * data = [{value: 15, month: "Jan"}]
   */

  const values = data.map(({ value }) => value);
  const domain = [0, Math.max(...values)];
  const range = [0, viewBox[3] - 30];

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="16"
      viewBox="0 0 9 16"
    >
      <g fill="#a7aaaf">
        <g transform="translate(0)">
          <path
            d="M101.722,7.376,108.54.256a.815.815,0,0,1,1.185,0l.5.524a.9.9,0,0,1,0,1.238L104.5,8l5.731,5.986a.905.905,0,0,1,0,1.238l-.5.524a.815.815,0,0,1-1.185,0l-6.824-7.127a.911.911,0,0,1,0-1.242Z"
            transform="translate(-101.478)"
          />
        </g>
      </g>
    </svg>
  );

  const [transform, setTransform] = useState(0);
  const transformMax = data.length - 5;

  return (
    <section className="chart">
      <h4 className="heading-4">{title}</h4>
      <div className="chart__container">
        <div>
          <svg className="chartBox" viewBox={viewBox.join(" ")}>
            <g
              style={{
                transition: "transform 0.2s linear"
              }}
              transform={`translate(-${(viewBox[2] / 5) * transform} 0)`}
            >
              {data.map(({ value, month }, i) => {
                const scale = linearScale(domain, range, value);
                return (
                  <g
                    key={month}
                    transform={`translate(${(viewBox[2] / 5) *
                      i}, ${viewBox[3] - scale})`}
                    style={{
                      transition: "transform 0.2s linear"
                    }}
                  >
                    <text
                      fill="#242A37"
                      style={{
                        opacity: 0.7
                      }}
                      transform={`translate(${viewBox[2] / 10 -
                        5 * value.toString().length} -9)`}
                    >
                      {value}
                    </text>
                    <rect
                      className={`rect ${
                        value === domain[1] ? "rect-active" : ""
                      }`}
                      height={scale}
                      width={viewBox[2] / 5}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
        <div className="indicators">
          <span
            onClick={() => {
              if (transform > 0) {
                setTransform(transform - 1);
              }
            }}
            className={`indicators__left ${
              transform > 0 ? "indicator-active" : ""
            }`}
          >
            {arrow}
          </span>
          <div>
            <div
              style={{
                transition: "transform 0.2s linear",
                transform: `translateX(calc(calc(-100% / 5) * ${transform}))`
              }}
            >
              {data.map(({ month }, i) => (
                <p
                  style={{
                    left: `calc(calc(100% / 5) * ${i})`
                  }}
                  key={month}
                >
                  {month}
                </p>
              ))}
            </div>
          </div>
          <span
            onClick={() => {
              if (transform < transformMax) {
                setTransform(transform + 1);
              }
            }}
            className={`indicators__right ${
              transform < transformMax ? "indicator-active" : ""
            }`}
          >
            {arrow}
          </span>
        </div>
      </div>
    </section>
  );
};

export default BarChart;
