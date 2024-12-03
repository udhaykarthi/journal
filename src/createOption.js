// Save.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./createOption.css";

function Save() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file) {
      alert("Please enter a name and select an image.");
      return;
    }

    // Upload the file to the server
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    try {
      const uploadResponse = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageName = uploadResponse.data.fileName;

      // Navigate to the WordLikePage with the title and image name
      navigate("/journal", { state: { name, imageName } });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload the image.");
    }
  };

  return (
    <div className="container">
      <form className="CreateNew" onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          placeholder="Enter the Journal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          className={`dropzone ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <p>File selected: {file.name}</p>
          ) : (
            <p>Drag and drop a file here, or click to select a file</p>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="file-input-label">
            Select File
          </label>
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default Save;
