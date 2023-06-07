import express from "express";
import mysql from "mysql";
import cors from "cors";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "s8231435",
  database: "FinalProject",
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.post("/users", (req, res) => {
  const { username, password } = req.body;

  // Validate required fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const q = "INSERT INTO Users (username, password) VALUES (?, ?)";
  const values = [username, password];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });

    // Get the inserted user_id
    const userId = result.insertId;

    // Create the response object with the inserted user
    const response = {
      user_id: userId,
      username: username,
    };

    return res.status(200).json(response);
  });
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM Users";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });

    return res.status(200).json(data);
  });
});

app.get("/usersid", (req, res) => {
  const username = req.query.username; // Get the username from the query parameter

  const q = `SELECT * FROM Users WHERE username = '${username}'`; // Add the username filter to the SQL query

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });

    return res.status(200).json(data);
  });
});

app.listen(8800, () => {
  console.log("connected to backend");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate required fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const q = "SELECT * FROM Users WHERE username = ? AND password = ?";
  const values = [username, password];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "ERROR", details: err });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Login successful
    return res.status(200).json({ message: "Login successful" });
  });
});

app.post("/scores", (req, res) => {
  const { score, user_id } = req.body;

  // Validate required fields
  if (!score || !user_id) {
    return res.status(400).json({ error: "Score and user ID are required" });
  }

  const q = "INSERT INTO Scores (score, user_id) VALUES (?, ?)";
  const values = [score, user_id];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });

    // Get the inserted score_id
    const scoreId = result.insertId;

    // Create the response object with the inserted score
    const response = {
      score_id: scoreId,
      score: score,
      user_id: user_id,
    };

    return res.status(200).json(response);
  });
});

app.get("/scores", (req, res) => {
  const q = "SELECT * FROM Scores";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });

    return res.status(200).json(data);
  });
});

app.get("/pokemonimg", (req, res) => {
  const q = "SELECT * FROM pokemon_url";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });
    return res.status(200).json(data);
  });
});

app.post("/pokemonimg", (req, res) => {
  const q = "INSERT INTO pokemon_url (`url`) VALUES (?)";
  const values = [req.body.url];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });
    return res.status(200).json(data);
  });
});
