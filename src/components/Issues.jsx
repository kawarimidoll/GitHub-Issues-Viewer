import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "./util/EzLink";
import Pager from "./util/Pager";

export default function Issues({ page }) {
  const pageNum = page ? Number(page) : 1;
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);
  const [issuesCount, setIssuesCount] = useState(0);
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.github.com/repos/facebook/react/issues?page=${pageNum}&per_page=${perPage}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        // console.log(jsonResponse);
        setIssues(jsonResponse);
      })
      .then(() => {
        fetch(`https://api.github.com/repos/facebook/react`)
          .then((response) => response.json())
          .then((jsonResponse) => {
            // console.log(jsonResponse);
            setIssuesCount(jsonResponse.open_issues_count);
          })
          .then(() => {
            setLoading(false);
          });
      });
  }, [page]);

  const maxPage = Math.ceil(issuesCount / perPage);
  const getPath = (num) => `/issues?page=${num}`;

  return (
    <div>
      <h2>Issues</h2>
      <div>
        {loading ? (
          <div>loading issues list...</div>
        ) : !issues[0] ? (
          <div>issues not found</div>
        ) : (
          <div>
            <ul>
              {issues.map((issue) => (
                <li key={issue.id}>
                  <Link to={`/issues/${issue.number}`}>
                    {issue.number}: {issue.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Pager current={pageNum} max={maxPage} getPath={getPath} />
          </div>
        )}
      </div>
    </div>
  );
}
Issues.propTypes = {
  page: PropTypes.string,
};
