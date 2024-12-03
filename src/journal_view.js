import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./journal_view.css";

function JournalView() {
  const { title } = useParams();
  const [journalContent, setJournalContent] = useState("");
  const [imageName, setImageName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/journal_get/${encodeURIComponent(title)}`
        );
        if (response.data.success) {
          setJournalContent(response.data.content);
          setImageName(response.data.image_name);
        } else {
          setError("Journal not found");
        }
      } catch (err) {
        console.error("Error fetching journal:", err);
        setError("Failed to load journal");
      } finally {
        setLoading(false);
      }
    };
    fetchJournal();
  }, [title]);

  const handleEditorChange = (value) => {
    setJournalContent(value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/journals_edit/update/${encodeURIComponent(
          title
        )}`,
        {
          content: journalContent,
        }
      );
      if (response.data.success) {
        alert("Journal updated successfully.");
        setIsEditing(false);
      } else {
        setError("Failed to update journal");
      }
    } catch (error) {
      console.error("Error updating journal:", error);
      setError("Failed to update the journal.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="journal-view-container">
      <h1>{title}</h1>
      <div className="quill-editor">
        <ReactQuill
          value={journalContent}
          onChange={handleEditorChange}
          readOnly={!isEditing}
        />
      </div>
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
}

export default JournalView;
