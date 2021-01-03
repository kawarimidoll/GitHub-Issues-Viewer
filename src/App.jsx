import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
        <Route path="/issues">
          <Issues page={query.get("page")} />
        </Route>
        <Route path="/issue/:number">
          <Issue />
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

function Issues({ page = "1" }) {
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    fetch(
      ` https://api.github.com/repos/facebook/react/issues?page=${page}&per_page=10`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setIssues(jsonResponse);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h2>Issues</h2>
      {page ? <div> {page} page! </div> : <div> no page! </div>}
      <div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <ul>
            {issues.map((issue) => (
              <li key={issue.id}>
                <Link to={`/issue/${issue.number}`}>
                  {issue.number}: {issue.title}
                </Link>
              </li>
            ))}
          </ul>
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
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">view in GitHub</a>
          </div>
          <hr />
          <div>{issue.body}</div>
        </div>
      )}
    </div>
  );
}

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
