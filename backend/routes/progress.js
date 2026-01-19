const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// Mark module as learned
router.post("/learn", auth, (req, res) => {
  const userId = req.user.id;
  const { course, module_number } = req.body;

  db.query(
    `INSERT IGNORE INTO module_progress (user_id, course, module_number)
     VALUES (?, ?, ?)`,
    [userId, course, module_number],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ msg: "Module marked as learned" });
    }
  );
});

// Course-wise progress (for profile)
router.get("/course-progress/:userId", auth, (req, res) => {
  const userId = req.params.userId;

  const totalModules = {
    cooking: 8,
    farming: 10,
    self_defence: 5,
    finance: 4
  };

  const sql = `
      SELECT 
      mp.course,
      COUNT(DISTINCT mp.module_number) AS completed
      FROM module_progress mp
      JOIN quizzes q
      ON q.course = mp.course
      AND q.quiz_number = mp.module_number
      JOIN quiz_results qr
      ON qr.quiz_id = q.id
      AND qr.user_id = mp.user_id
      WHERE mp.user_id = ?
      GROUP BY mp.course
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) return res.status(500).send(err);

    const result = {};

    Object.keys(totalModules).forEach(course => {
      result[course] = {
        learned: 0,
        total: totalModules[course],
        percent: 0
      };
    });

    rows.forEach(r => {
      result[r.course].learned = r.completed;
      result[r.course].percent = Math.round(
        (r.completed / result[r.course].total) * 100
      );
    });

    res.json(result);
  });
});

// Check if a module is learned
router.get("/is-learned/:course/:module", auth, (req, res) => {
  const userId = req.user.id;
  const { course, module } = req.params;

  db.query(
    `SELECT 1 FROM module_progress
     WHERE user_id = ? AND course = ? AND module_number = ?`,
    [userId, course, module],
    (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json({ learned: rows.length > 0 });
    }
  );
});


module.exports = router;
