import React, { useState } from "react";

const CreatePost = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };
  const signup = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, description, image }),
    });
    const res = await response.json();
    if (res.success) {
      alert("Inserted");
    } else {
      console.log(res);
      alert("error");
    }
  };

  console.log("Subject:", subject);
  console.log("Description:", description);
  console.log("Image:", image);

  return (
    <div>
      <form onSubmit={signup}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
