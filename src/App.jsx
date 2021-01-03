import React from "react";
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
      <Link to="/issues"><h2>Github Issues Viewer</h2></Link>
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

const issues = [
  { id: 1, number: 1, title: "issue title 1", body: "issue body 1" },
  { id: 2, number: 2, title: "issue title 2", body: "issue body 2" },
  { id: 3, number: 3, title: "issue title 3", body: "issue body 3" },
  { id: 4, number: 4, title: "issue title 4", body: "issue body 4" },
  { id: 5, number: 5, title: "issue title 5", body: "issue body 5" },
  { id: 6, number: 6, title: "issue title 6", body: "issue body 6" },
  { id: 7, number: 7, title: "issue title 7", body: "issue body 7" },
  { id: 8, number: 8, title: "issue title 8", body: "issue body 8" },
  { id: 9, number: 9, title: "issue title 9", body: "issue body 9" },
  { id: 10, number: 10, title: "issue title 10", body: "issue body 10" },
];

function Issues({ page }) {
  return (
    <div>
      <h2>Issues</h2>
      {page ? <div> {page} page! </div> : <div> no page! </div>}
      <div>
        <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <Link to={`/issue/${issue.number}`}>
              {issue.number}: {issue.title}
            </Link>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}
Issues.propTypes = {
  page: PropTypes.string,
};

function Issue() {
  let { number } = useParams();
  const issue = issues[Number(number) - 1];
  return (
    <div>
      <h2>
        {issue.number}: {issue.title}
      </h2>
      <div>{issue.body}</div>
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
