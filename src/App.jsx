import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Main() {
  let query = useQuery();

  return (
    <div>
      <Link to="/issues">
        <h2>Github Issues Viewer</h2>
      </Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/issues/:number">
          <Issue />
        </Route>
        <Route path="/issues">
          <Issues page={query.get("page")} />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/issues">Issues</Link>
    </div>
  );
}

function Issues({ page }) {
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
        console.log(jsonResponse);
        setIssues(jsonResponse);
      })
      .then(() => {
        fetch(`https://api.github.com/repos/facebook/react`)
          .then((response) => response.json())
          .then((jsonResponse) => {
            console.log(jsonResponse);
            setIssuesCount(jsonResponse.open_issues_count);
          })
          .then(() => {
            setLoading(false);
          });
      });
  }, [page]);

  const lastPageNum = () => Math.ceil(issuesCount / perPage);
  return (
    <div>
      <h2>Issues</h2>
      <div>page {pageNum}</div>
      <div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <div>{issuesCount} Issues!</div>
            <ul>
              {issues.map((issue) => (
                <li key={issue.id}>
                  <Link to={`/issues/${issue.number}`}>
                    {issue.number}: {issue.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <ul>
                <li>
                  {pageNum < 2 ? (
                    <span>First</span>
                  ) : (
                    <Link to="/issues">First</Link>
                  )}
                </li>
                <li>
                  {pageNum < 2 ? (
                    <span>Prev</span>
                  ) : (
                    <Link to={`/issues?page=${pageNum - 1}`}>Prev</Link>
                  )}
                </li>
                <li>
                  {pageNum < lastPageNum() ? (
                    <Link to={`/issues?page=${pageNum + 1}`}>Next</Link>
                  ) : (
                    <span>Next</span>
                  )}
                </li>
                <li>
                  {pageNum < lastPageNum() ? (
                    <Link to={`/issues?page=${lastPageNum()}`}>Last</Link>
                  ) : (
                    <span>Last</span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
Issues.propTypes = {
  page: PropTypes.string,
};

function Issue() {
  let { number } = useParams();
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState([]);
  useEffect(() => {
    fetch(` https://api.github.com/repos/facebook/react/issues/${number}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setIssue(jsonResponse);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <h2>
            {issue.number}: {issue.title}
          </h2>
          <div>
            <ExLink to={issue.html_url}>view in GitHub</ExLink>
          </div>
          <hr />
          <ReactMarkdown plugins={[gfm]}>{issue.body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

function ExLink(props) {
  console.log(props);
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

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
