/********************************
 🔐 AUTH CHECK
********************************/
function requireAuth() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token || !user.id) {
    alert("Please login to view your profile");
    window.location.href = "../../pages/auth/login.html";
    return false;
  }
  return true;
}

/********************************
 🚀 PAGE LOAD
********************************/
document.addEventListener("DOMContentLoaded", () => {
  if (!requireAuth()) return;

  loadUserProfile();
  loadQuizResults();
  loadCourseProgress();
});

/********************************
 👤 USER INFO
********************************/
function loadUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  document.getElementById("profileAvatar").textContent = user.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : "U";

  document.getElementById("profileName").textContent =
    user.fullName || "Unknown User";

  document.getElementById("profileEmail").textContent =
    user.email || "No email";
}

/********************************
 📊 QUIZ RESULTS + STATS
********************************/
async function loadQuizResults() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const resultsContainer = document.getElementById("resultsContent");
  resultsContainer.innerHTML = `<div class="loading">Loading quiz results...</div>`;

  try {
    // 🔹 LOAD STATS
    const statsRes = await fetch(
      `http://localhost:3000/api/quiz/stats/${user.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (statsRes.ok) {
      const stats = await statsRes.json();
      document.getElementById("totalQuizzes").textContent = stats.totalQuizzes;
      document.getElementById("averageScore").textContent = stats.averageScore;
      document.getElementById("completedModules").textContent =
        stats.completedQuizzes;
    }

    // 🔹 LOAD QUIZ HISTORY
    const historyRes = await fetch(
      `http://localhost:3000/api/quiz/get-history/${user.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!historyRes.ok) {
      resultsContainer.innerHTML = `<div class="no-results">Unable to load quiz history.</div>`;
      return;
    }

    const history = await historyRes.json();

    if (history.length === 0) {
      resultsContainer.innerHTML = `<div class="no-results">No quiz attempts yet.</div>`;
      return;
    }

    // 🔹 GROUP BY MODULE
    const grouped = {};
    history.forEach((item) => {
      if (!grouped[item.title]) {
        grouped[item.title] = [];
      }
      grouped[item.title].push(item);
    });

    let html = "";
    Object.keys(grouped).forEach((title) => {
      html += buildModuleSection(title, title, grouped[title]);
    });
    resultsContainer.innerHTML = html;
  } catch (err) {
    console.error(err);
    resultsContainer.innerHTML = `<div class="no-results">Error loading results.</div>`;
  }
}

/********************************
 📊 COURSE PROGRESS BARS
********************************/
async function loadCourseProgress() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await fetch(
      `http://localhost:3000/api/progress/course-progress/${user.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!res.ok) return;

    const data = await res.json();

    const courses = ["cooking", "farming", "self_defence", "finance"];
    let html = "";

    courses.forEach((course) => {
      const progress = data[course] || { learned: 0, total: 0, percent: 0 };
      html += `
        <div class="course-progress">
          <div class="course-title">${course.replace("_", " ").toUpperCase()}</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress.percent}%"></div>
          </div>
          <div class="progress-info">
            ${progress.learned} / ${progress.total} modules completed (${progress.percent}%)
          </div>
        </div>
      `;
    });

    document.getElementById("courseProgressContainer").innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

/********************************
 🧩 MODULE UI BUILDER
********************************/
function buildModuleSection(moduleName, displayName, attempts) {
  attempts.sort((a, b) => new Date(b.taken_on) - new Date(a.taken_on));

  const bestScore = Math.max(...attempts.map((a) => a.score));

  let statusClass = "incomplete";
  let statusText = "In Progress";

  if (bestScore >= 4) {
    statusClass = "completed";
    statusText = "Completed";
  }

  let attemptHTML = "";
  attempts.forEach((a) => {
    attemptHTML += `
      <div class="quiz-item">
        <div class="quiz-info">
          <div class="quiz-name">${a.title}</div>
          <div class="quiz-date">
            ${new Date(a.taken_on).toLocaleDateString()}
          </div>
        </div>
        <div class="quiz-score score-good">
          ${a.score}/5
        </div>
      </div>
    `;
  });

  return `
    <div class="module-section">
      <div class="module-header" onclick="toggleModule(this)">
        <div class="module-title">
          <span>${displayName}</span>
          <span class="status-badge ${statusClass}">
            ${statusText}
          </span>
        </div>
        <div class="module-meta">
          <span class="best-score">Best: ${bestScore}/5</span>
          <span class="attempts-count">${attempts.length} attempt(s)</span>
          <span class="module-toggle">▼</span>
        </div>
      </div>
      <div class="quiz-list">
        ${attemptHTML}
      </div>
    </div>
  `;
}

/********************************
 🔽 TOGGLE MODULE
********************************/
function toggleModule(header) {
  header.parentElement.classList.toggle("active");
}
