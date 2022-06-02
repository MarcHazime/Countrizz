import { Link } from "react-router-dom";

import "@components/ButtonPlay.css";

export default function ButtonPlayCity({ name }) {
  return (
    <div className="wrapper">
      <Link className="cta" to="/countdowncity">
        <span className="BtnPlay">{name}</span>

        <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1">
          <g
            id="arrow"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
}
