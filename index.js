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

app.get("/topscore", (req, res) => {
  const q = "SELECT * FROM scores";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });
    return res.status(200).json(data);
  });
});

app.get("/topscore/:id", (req, res) => {
  const id = req.params.id;
  const q = `SELECT * FROM Scores WHERE score_id = ${id}`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });
    return res.status(200).json(data);
  });
});


app.post("/topscore", (req, res) => {
  const q = "INSERT INTO Scores (`score`) VALUES (?)";
  const values = [req.body.score];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });
    
    // Get the inserted score_id
    const scoreId = result.insertId;
    
    // Create the response object with the inserted score
    const response = {
      score_id: scoreId,
      score: req.body.score
    };

    return res.status(200).json(response);
  });
});

app.get("/userscore", (req, res) => {
  const q = "SELECT * FROM UserScores";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });
    return res.status(200).json(data);
  });
});

app.post("/userscore", (req, res) => {
  const { user_id, score_id } = req.body;

  const q = "INSERT INTO UserScores (user_id, score_id) VALUES (?, ?)";
  const values = [user_id, score_id];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });

    // Get the inserted userScore_id
    const userScoreId = result.insertId;

    // Create the response object with the inserted user score
    const response = {
      user_id: user_id,
      score_id: score_id
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

app.post("/users", (req, res) => {
  const q = "INSERT INTO Users (`username`) VALUES (?)";
  const values = [req.body.username];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });
    
    // Get the inserted user_id
    const userId = result.insertId;
    
    // Create the response object with the inserted user
    const response = {
      user_id: userId,
      username: req.body.username
    };

    return res.status(200).json(response);
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

app.delete("/topscore/:id", (req, res) => {
  const scoreId = req.params.id;
  const q = "DELETE FROM Scores WHERE score_id = ?";

  db.query(q, [scoreId], (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });
    return res.status(200).json(data);
  });
});


app.delete("/users/:id", (req, res) => {
  const scoreId = req.params.id;
  const q = "DELETE FROM Users WHERE user_id = ?";

  db.query(q, [scoreId], (err, data) => {
    if (err) return res.status(500).json({ error: "ERROR", details: err });
    return res.status(200).json(data);
  });
});



app.listen(8800, () => {
  console.log("connected to backend");
});
