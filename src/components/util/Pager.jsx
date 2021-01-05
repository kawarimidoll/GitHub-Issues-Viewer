import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Pager({ current, max, getPath }) {
  return (
    <div className="flex justify-center">
      <div className="flex">
        <CondLink enable={current > 1} to={getPath(1)}>
          First
        </CondLink>
        <CondLink enable={current > 1} to={getPath(current - 1)}>
          Prev
        </CondLink>
        <div className="px-2">
          {current} / {max}
        </div>
        <CondLink enable={current < max} to={getPath(current + 1)}>
          Next
        </CondLink>
        <CondLink enable={current < max} to={getPath(max)}>
          Last
        </CondLink>
      </div>
    </div>
  );
}
Pager.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  getPath: PropTypes.func.isRequired,
};

function CondLink(props) {
  const className = "block px-2 border border-solid border-transparent";
  return props.enable ? (
    <Link to={props.to} className={className + " hover:border-black"}>
      {props.children}
    </Link>
  ) : (
    <span className={className + " text-gray-400 cursor-not-allowed"}>
      {props.children}
    </span>
  );
}
CondLink.propTypes = {
  enable: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
