// WordLikePage.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import './Content.css';
import { useNavigate } from "react-router-dom";

function WordLikePage() {
  const [editorContent, setEditorContent] = useState("");
  const location = useLocation();
  const { name, imageName } = location.state;
  const navigate = useNavigate();

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/saveJournal", {
        title: name,
        image_name: imageName,
        content: editorContent,
      });

      if (response.status === 200) {
        alert("Journal saved successfully.");
        navigate('/home')
      }
    } catch (error) {
      console.error("Error saving journal:", error);
      alert("Failed to save the journal.");
    }
  };

  return (
    <div className="Con">
      <h2>Journal Title: {name}</h2>
      <p className="title">Image Name: {imageName}</p>
      <div className="editor-container">
        <ReactQuill
          value={editorContent}
          onChange={handleEditorChange}
          modules={WordLikePage.modules}
          formats={WordLikePage.formats}
          placeholder="Write something amazing..."
        />
      </div>
      <div className="top-menu">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

WordLikePage.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video","code"],
    ["clean"],
  ],
};

WordLikePage.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
];

export default WordLikePage;
