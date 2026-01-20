import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img
            src={`${process.env.REACT_APP_API_URL}/${cover}`}
            alt={title}
            loading="lazy"
          />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <a className="author">👤 {author.username}</a>
          <time>📅 {formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
        <Link
          to={`/post/${_id}`}
          style={{ color: "#667eea", fontWeight: "bold" }}
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default Post;
