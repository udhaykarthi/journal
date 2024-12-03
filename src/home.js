import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import spk from "./imagesjr/spk.jpg";
import { useNavigate } from "react-router-dom";
function Home() {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/journals");
        const data = await response.json();
        if (data.success) {
          const formattedJournals = data.data.map((journal) => ({
            ...journal,
            image_url: "imagesjr/" + journal.image_name,
          }));
          setJournals(formattedJournals);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error("Error fetching journals:", err);
        setError(err.message);
      }
    };
    fetchJournals();
  }, []);

  return (
    <>
      <div className="Container">
        {error && <div>Error: {error}</div>}
        {journals.map((journal) => (
          <div key={journal.id} className="card">
            <div className="preview">
              <img src={journal.image_url} alt={journal.title} />
            </div>
            <h2>
              <Link to={`/journals/${encodeURIComponent(journal.title)}`}>
                {journal.title}
              </Link>
            </h2>
          </div>
        ))}
      </div>
      <button
        className="button"
        onClick={() => {
          navigate("/create");
        }}
      >
        Create
      </button>
    </>
  );
}

export default Home;
