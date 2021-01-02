import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
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
      <div>
        <h2>App</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/issues">Issues</Link>
          </li>
          <li>
            <Link to="/issues?page=2">Issues page 2</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
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
    </div>
  );
}

function Issues({ page }) {
  return (
    <div>
      <h2>Issues</h2>
      {page ? <div> {page} page! </div> : <div> no page! </div>}
    </div>
  );
}
Issues.propTypes = {
  page: PropTypes.string,
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
