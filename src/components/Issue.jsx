import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Link from "./util/EzLink";
import { useParams } from "react-router-dom";
import "github-markdown-css";

export default function Issue() {
  const { number } = useParams();
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/repos/facebook/react/issues/${number}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        // console.log(jsonResponse);
        setIssue(jsonResponse);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : !issue.id ? (
        <div>issue not found</div>
      ) : (
        <div>
          <h2>
            {issue.number}: {issue.title}
          </h2>
          <div className="text-right mr-2">
            <Link to={issue.html_url}>view in GitHub</Link>
          </div>
          <hr />
          <ReactMarkdown
            allowDangerousHtml
            plugins={[gfm]}
            className="markdown-body"
          >
            {issue.body}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
