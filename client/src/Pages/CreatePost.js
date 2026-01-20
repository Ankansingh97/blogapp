import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, SetRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        alert("✅ Post created successfully!");
        SetRedirect(true);
      } else {
        alert("❌ Failed to create post");
      }
    } catch (error) {
      alert("❌ Error creating post");
    } finally {
      setIsLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <h1>✍️ Create New Post</h1>

      <div>
        <label>
          <strong>📚 Title</strong>
        </label>
        <input
          type="text"
          placeholder="Enter your post title"
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
          placeholder="Write a short summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div>
        <label>
          <strong>🖼️ Cover Image</strong>
        </label>
        <input
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          required
        />
      </div>

      <div>
        <label>
          <strong>📄 Content</strong>
        </label>
        <Editor value={content} onChange={setContent} />
      </div>

      <button disabled={isLoading} style={{ marginTop: "20px" }}>
        {isLoading ? "⏳ Creating..." : "🚀 Create Post"}
      </button>
    </form>
  );
}
