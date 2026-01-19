const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

/********************************
 ✅ SUBMIT QUIZ (LEARN-FIRST CHECK)
********************************/
router.post("/submit", auth, (req, res) => {
  const userId = req.user.id;
  const { quiz_id, score } = req.body;

  if (!quiz_id || score === undefined) {
    return res.status(400).json({ msg: "Missing quiz data" });
  }

  // 1️⃣ Get quiz details
  db.query(
    "SELECT course, quiz_number FROM quizzes WHERE id = ?",
    [quiz_id],
    (err, quizRows) => {
      if (err) return res.status(500).send(err);

      if (quizRows.length === 0) {
        return res.status(400).json({ msg: "Invalid quiz" });
      }

      const { course, quiz_number } = quizRows[0];

      // 2️⃣ Check if module is learned
      db.query(
        `SELECT 1 FROM module_progress
         WHERE user_id = ? AND course = ? AND module_number = ?`,
        [userId, course, quiz_number],
        (err, progressRows) => {
          if (err) return res.status(500).send(err);

          if (progressRows.length === 0) {
            return res.status(403).json({
              msg: "⚠️ Please complete the Learn section first",
            });
          }

          // 3️⃣ Save quiz result
          db.query(
            "INSERT INTO quiz_results (user_id, quiz_id, score) VALUES (?, ?, ?)",
            [userId, quiz_id, score],
            (err) => {
              if (err) return res.status(500).send(err);

              res.json({ msg: "✅ Quiz result saved successfully" });
            },
          );
        },
      );
    },
  );
});

/********************************
 📊 GET USER QUIZ RESULTS
********************************/
router.get("/my-results", auth, (req, res) => {
  const userId = req.user.id;

  db.query(
    `
      SELECT 
      q.course,
      q.quiz_number,
      q.title,
      qr.score,
      qr.taken_on
      FROM quiz_results qr
      JOIN quizzes q ON qr.quiz_id = q.id
      WHERE qr.user_id = ?
      ORDER BY q.course, q.quiz_number
    `,
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    },
  );
});

/********************************
 📜 QUIZ HISTORY (PROFILE)
********************************/
router.get("/get-history/:userId", auth, (req, res) => {
  const userId = req.params.userId;

  db.query(
    `
    SELECT 
      q.course,
      q.quiz_number,
      q.title,
      qr.score,
      qr.taken_on
    FROM quiz_results qr
    JOIN quizzes q ON qr.quiz_id = q.id
    WHERE qr.user_id = ?
    ORDER BY q.course, q.quiz_number
    `,
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    },
  );
});

/********************************
 📈 QUIZ STATS (PROFILE CARDS)
********************************/
router.get("/stats/:userId", auth, (req, res) => {
  const userId = req.params.userId;

  db.query(
    `
    SELECT 
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
        completedQuizzes: results[0].completedModules,
        averageScore: results[0].averageScore || 0,
      });
    },
  );
});

module.exports = router;
