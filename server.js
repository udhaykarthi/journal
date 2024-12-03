// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

// Serve images from 'imagesjr' directory
app.use('imagesjr', express.static(path.join(__dirname, 'public/imagesjr')));


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "KarthiK7775",
  database: "journal",
  connectionLimit: 10,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public/imagesjr");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${req.body.name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send({ message: "Image uploaded successfully", fileName: req.file.filename });
});



app.post("/api/saveJournal", (req, res) => {
  const { title, image_name, content } = req.body;
  const QUERY = "INSERT INTO journals (title, image_name, content) VALUES (?, ?, ?)";
  db.query(QUERY, [title, image_name, content], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error saving journal");
    }
    res.status(200).send("Journal saved successfully");
  });
});

app.get('/api/journal_get/:title', (req, res) => {
  const journalTitle = decodeURIComponent(req.params.title);
  const query = 'SELECT title, image_name, content FROM journals WHERE title = ?';
  db.query(query, [journalTitle], (err, results) => {
      if (err) {
          console.error('Error fetching journal:', err);
          return res.status(500).json({ success: false, message: 'Error fetching journal' });
      }
      if (results.length > 0) {
          res.json({ success: true, content: results[0].content, image_name: results[0].image_name });
      } else {
          res.json({ success: false, message: 'Journal not found' });
      }
  });
});

app.get("/api/journals", (req, res) => {
  const query = "SELECT title, image_name FROM journals";
  db.query(query, (error, results) => {
      if (error) {
          console.error("Error fetching journals:", error.message);
          console.log(results)
          return res.status(500).json({ success: false, message: "Database error", error: error.message });
      }
      res.json({ success: true, data: results });
  });
});

app.post('/api/journals_edit/update/:title', (req, res) => {
  const journalTitle = decodeURIComponent(req.params.title);
  const { content } = req.body;
  const query = 'UPDATE journals SET content = ? WHERE title = ?';
  db.query(query, [content, journalTitle], (err, result) => {
      if (err) {
          console.error('Error updating journal content:', err);
          return res.status(500).json({ success: false, message: 'Error updating journal content' });
      }
      res.json({ success: true, message: 'Journal content updated successfully' });
  });
});

// --- Signup Route ---
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const query = "INSERT INTO logindetail (email, password) VALUES (?, ?)";
  
  db.query(query, [email, password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ success: false, message: "Email already registered" });
      }
      console.error("Error inserting user:", err);
      return res.status(500).json({ success: false, message: "Error inserting user" });
    }
    res.status(201).json({ success: true, message: "User registered successfully" });
  });
});

// --- Signin Route ---
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM logindetail WHERE email = ? AND password = ?";
  
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({ success: false, message: "Error logging in" });
    }
    if (results.length > 0) {
      res.status(200).json({ success: true, message: "Successfully logged in" });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});


app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});