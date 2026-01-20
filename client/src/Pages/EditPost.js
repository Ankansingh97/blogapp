import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, SetRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, [id]);

  async function updatePost(e) {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        alert("✅ Post updated successfully!");
        SetRedirect(true);
      } else {
        alert("❌ Failed to update post");
      }
    } catch (error) {
      alert("❌ Error updating post");
    } finally {
      setIsLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <h1>✏️ Edit Post</h1>

      <div>
        <label>
          <strong>📚 Title</strong>
        </label>
        <input
          type="text"
          placeholder="Edit post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>
          <strong>📝 Summary</strong>
        </label>
        <input
          type="text"
          placeholder="Edit summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div>
        <label>
          <strong>🖼️ Cover Image (Optional)</strong>
        </label>
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
      </div>

      <div>
        <label>
          <strong>📄 Content</strong>
        </label>
        <Editor onChange={setContent} value={content} />
      </div>

      <button disabled={isLoading} style={{ marginTop: "20px" }}>
        {isLoading ? "⏳ Updating..." : "🚀 Update Post"}
      </button>
    </form>
  );
}
