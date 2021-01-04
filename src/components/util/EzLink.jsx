import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function EzLink(props) {
  return props.to.startsWith("http") ? (
    <a
      href={props.to}
      className={props.className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
      <svg focusable="false" width="1em" height="1em" viewBox="0 0 24 24">
        <path
          d="M10 3v2H5v14h14v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm7.707 4.707L12 13.414L10.586 12l5.707-5.707L13 3h8v8l-3.293-3.293z"
          fill="#999"
        ></path>
      </svg>
    </a>
  ) : (
    <Link to={props.to} className={props.className}>
      {props.children}
    </Link>
  );
}
EzLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
