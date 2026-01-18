const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// Save quiz result
router.post("/submit", auth, (req, res) => {
  const userId = req.user.id;
  const { quiz_id, score } = req.body;

  db.query(
    "INSERT INTO quiz_results (user_id, quiz_id, score) VALUES (?, ?, ?)",
    [userId, quiz_id, score],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ msg: "Quiz result saved" });
    },
  );
});

// Get all quiz results for logged in user
router.get("/my-results", auth, (req, res) => {
  const userId = req.user.id;

  db.query(
    `
        SELECT qr.id, qr.score, qr.taken_on, q.module, q.quiz_number, q.title 
        FROM quiz_results qr
        JOIN quizzes q ON qr.quiz_id = q.id
        WHERE qr.user_id = ?
        ORDER BY qr.taken_on DESC
    `,
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    },
  );
});

// Get quiz history
router.get('/get-history/:userId', auth, (req, res) => {
  const userId = req.params.userId;

  db.query(`
    SELECT 
      qr.id,
      qr.score,
      qr.taken_on,
      q.title,
      q.quiz_number
    FROM quiz_results qr
    JOIN quizzes q ON qr.quiz_id = q.id
    WHERE qr.user_id = ?
    ORDER BY qr.taken_on DESC
  `, [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


// Get stats
router.get("/stats/:userId", auth, (req, res) => {
  const userId = req.params.userId;
  db.query(
    `SELECT 
    COUNT(*) AS totalQuizzes,
    COUNT(DISTINCT quiz_id) AS completedModules,
    ROUND(AVG(score), 2) AS averageScore
    FROM quiz_results
    WHERE user_id = ?
    `,
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({
        totalQuizzes: results[0].totalQuizzes,
        averageScore: results[0].averageScore || 0,
        completedQuizzes: results[0].completedModules,
      });
    },
  );
});

module.exports = router;
