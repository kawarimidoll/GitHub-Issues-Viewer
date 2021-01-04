import React from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import Issues from "./components/Issues";
import Issue from "./components/Issue";
import NoMatch from "./components/NoMatch";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function App() {
  const query = useQuery();

  return (
    <div>
      <Link to="/issues">
        <h2>GitHub Issues Viewer</h2>
      </Link>
      <Switch>
        <Route exact path="/">
          <Link to="/issues">Enter</Link>
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
