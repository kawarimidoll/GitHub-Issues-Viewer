import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Link from "./util/EzLink";
import { useParams } from "react-router-dom";

export default function Issue() {
  const { number } = useParams();
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
            <Link to={issue.html_url}>view in GitHub</Link>
          </div>
          <hr />
          <ReactMarkdown plugins={[gfm]}>{issue.body}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
