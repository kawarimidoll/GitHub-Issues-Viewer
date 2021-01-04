import React from "react";
import PropTypes from "prop-types";

export default function ExLink(props) {
  // console.log(props);
  return (
    <a href={props.to} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}
ExLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
