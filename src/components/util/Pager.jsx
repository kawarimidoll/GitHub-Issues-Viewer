import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Pager({ current, max, getPath }) {
  return (
    <div>
      <ul>
        <li>
          {current < 2 ? (
            <span>First</span>
          ) : (
            <Link to={getPath(1)}>First</Link>
          )}
        </li>
        <li>
          {current < 2 ? (
            <span>Prev</span>
          ) : (
            <Link to={getPath(current - 1)}>Prev</Link>
          )}
        </li>
        <li>
          {current < max ? (
            <Link to={getPath(current + 1)}>Next</Link>
          ) : (
            <span>Next</span>
          )}
        </li>
        <li>
          {current < max ? (
            <Link to={getPath(max)}>Last</Link>
          ) : (
            <span>Last</span>
          )}
        </li>
      </ul>
    </div>
  );
}
Pager.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  getPath: PropTypes.func.isRequired,
};
